/**
 * mailer.ts — Email notification utility
 *
 * When someone submits the contact form on the portfolio, this module sends
 * an email to the site owner so they can follow up quickly.
 *
 * It uses `nodemailer`, a Node.js library that speaks the SMTP protocol —
 * the same protocol your email app uses to talk to Gmail, Outlook, etc.
 * On hosts that block SMTP ports, it can instead use the Gmail API over HTTPS.
 *
 * If the SMTP credentials are absent (e.g. during local development without
 * a .env file), the caller gets a skipped result instead of pretending email
 * delivery happened.
 */

import nodemailer from 'nodemailer'
import { env } from '../config/env.js'
import { logError, logInfo, logWarn } from './logger.js'
import type { ContactSubmission } from '../types/content.js'

export type ContactNotificationStatus = 'sent' | 'skipped' | 'failed'

export interface ContactNotificationResult {
  message: string
  status: ContactNotificationStatus
}

/**
 * Tries to build a Nodemailer "transport" — the object that knows how to
 * connect to an SMTP server and hand it an email.
 *
 * Returns null when credentials are missing so the rest of the code can
 * check for null instead of trying to send and crashing.
 */
function createTransport() {
  // Both the username and password must be present — either alone is useless.
  if (!env.SMTP_USER || !env.SMTP_PASS) {
    return null
  }

  return nodemailer.createTransport({
    host: env.SMTP_HOST,          // e.g. 'smtp.gmail.com'
    port: env.SMTP_PORT,          // 587 for STARTTLS, 465 for implicit TLS
    // `secure: true` tells Nodemailer to use full TLS from the start (port 465).
    // With port 587 we set it to false and let STARTTLS upgrade the connection.
    secure: env.SMTP_PORT === 465,
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 7000,
    auth: {
      user: env.SMTP_USER,        // Gmail address used to send
      pass: env.SMTP_PASS,        // Google App Password (not your login password)
    },
  })
}

// Create the transport once when this module is first loaded.
// Nodemailer reuses the same SMTP connection for subsequent sends.
const transport = createTransport()

function isGmailApiConfigured() {
  return Boolean(
    env.SMTP_USER &&
      env.GMAIL_CLIENT_ID &&
      env.GMAIL_CLIENT_SECRET &&
      env.GMAIL_REFRESH_TOKEN,
  )
}

function stripHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function createRawGmailMessage({
  html,
  replyTo,
  subject,
  text,
}: {
  html: string
  replyTo: string
  subject: string
  text: string
}) {
  const boundary = `portfolio-contact-${Date.now()}`
  const headers = [
    `From: "Portfolio Contact" <${env.SMTP_USER}>`,
    `To: ${env.SMTP_USER}`,
    `Reply-To: ${stripHeaderValue(replyTo)}`,
    `Subject: ${stripHeaderValue(subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ]

  return encodeBase64Url(
    [
      ...headers,
      '',
      `--${boundary}`,
      'Content-Type: text/plain; charset="UTF-8"',
      'Content-Transfer-Encoding: 8bit',
      '',
      text,
      `--${boundary}`,
      'Content-Type: text/html; charset="UTF-8"',
      'Content-Transfer-Encoding: 8bit',
      '',
      html,
      `--${boundary}--`,
      '',
    ].join('\r\n'),
  )
}

async function getGmailAccessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: env.GMAIL_CLIENT_ID!,
      client_secret: env.GMAIL_CLIENT_SECRET!,
      grant_type: 'refresh_token',
      refresh_token: env.GMAIL_REFRESH_TOKEN!,
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(`Gmail token request failed: ${response.status} ${detail.slice(0, 200)}`)
  }

  const data = (await response.json()) as { access_token?: unknown }

  if (typeof data.access_token !== 'string' || !data.access_token) {
    throw new Error('Gmail token response did not include an access token.')
  }

  return data.access_token
}

async function sendViaGmailApi({
  html,
  replyTo,
  subject,
  text,
}: {
  html: string
  replyTo: string
  subject: string
  text: string
}) {
  const accessToken = await getGmailAccessToken()
  const raw = createRawGmailMessage({ html, replyTo, subject, text })

  const response = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    },
  )

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(`Gmail send failed: ${response.status} ${detail.slice(0, 200)}`)
  }
}

/**
 * Sends an email to the site owner whenever a new contact submission arrives.
 *
 * The submission is already saved before this runs, so a failed notification
 * does not lose the message. Returning the delivery status lets the API show a
 * truthful response instead of silently swallowing email configuration issues.
 */
export async function sendContactNotification(
  submission: ContactSubmission,
): Promise<ContactNotificationResult> {
  if (!isGmailApiConfigured() && !transport) {
    logWarn('SMTP not configured — skipping contact email notification.')
    return {
      status: 'skipped',
      message: 'Email notification was skipped because SMTP is not configured.',
    }
  }

  // The subject line includes the inquiry type and sender name so the owner
  // can see at a glance what the message is about from their inbox.
  const subject = `New contact: ${submission.inquiryType} from ${submission.name}`

  // Plain-text version — shown in email clients that don't support HTML,
  // or used by spam filters that prefer plain text.
  const text = [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Inquiry: ${submission.inquiryType}`,
    `Received: ${submission.receivedAt}`,
    '',
    'Message:',
    submission.message,
  ].join('\n')

  // HTML version — rendered in modern email clients as a nicely formatted card.
  // Inline styles are used because many email clients strip <style> blocks.
  const html = `
<div style="font-family:system-ui,sans-serif;max-width:560px">
  <h2 style="margin:0 0 16px">New Portfolio Contact</h2>
  <table style="border-collapse:collapse;width:100%">
    <tr><td style="padding:6px 12px 6px 0;color:#666">Name</td><td style="padding:6px 0">${submission.name}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${submission.email}">${submission.email}</a></td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#666">Inquiry</td><td style="padding:6px 0">${submission.inquiryType}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#666">Received</td><td style="padding:6px 0">${submission.receivedAt}</td></tr>
  </table>
  <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0" />
  <p style="white-space:pre-wrap;line-height:1.6">${submission.message}</p>
</div>`.trim()

  try {
    if (isGmailApiConfigured()) {
      await sendViaGmailApi({
        html,
        replyTo: submission.email,
        subject,
        text,
      })
    } else {
      await transport!.sendMail({
        from: `"Portfolio Contact" <${env.SMTP_USER}>`, // shown in the "From" field
        to: env.SMTP_USER,                               // send to yourself
        replyTo: submission.email,                       // hitting Reply goes to the visitor
        subject,
        text,   // fallback plain text
        html,   // preferred rich HTML
      })
    }

    logInfo(`Contact notification sent for submission ${submission.id}`)
    return {
      status: 'sent',
      message: 'Email notification sent.',
    }
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : String(error)
    logError(`Failed to send contact notification for ${submission.id}: ${detail}`)

    return {
      status: 'failed',
      message: 'Email notification failed to send.',
    }
  }
}
