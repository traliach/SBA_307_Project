/**
 * mailer.ts — Email notification utility
 *
 * When someone submits the contact form on the portfolio, this module sends
 * an email to the site owner so they can follow up quickly.
 *
 * It uses `nodemailer`, a Node.js library that speaks the SMTP protocol —
 * the same protocol your email app uses to talk to Gmail, Outlook, etc.
 *
 * If the SMTP credentials are absent (e.g. during local development without
 * a .env file) the transport is null and notifications are silently skipped.
 * This keeps the rest of the app working even without email configured.
 */

import nodemailer from 'nodemailer'
import { env } from '../config/env.js'
import { logError, logInfo, logWarn } from './logger.js'
import type { ContactSubmission } from '../types/content.js'

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
    auth: {
      user: env.SMTP_USER,        // Gmail address used to send
      pass: env.SMTP_PASS,        // Google App Password (not your login password)
    },
  })
}

// Create the transport once when this module is first loaded.
// Nodemailer reuses the same SMTP connection for subsequent sends.
const transport = createTransport()

/**
 * Sends an email to the site owner whenever a new contact submission arrives.
 *
 * This function is "fire-and-forget" — it does NOT return a promise that the
 * caller awaits.  That means:
 *   - The API responds to the visitor immediately (fast UX).
 *   - If the email fails, the submission is already saved to the database so
 *     no data is lost — only the notification is missed (logged as an error).
 */
export function sendContactNotification(submission: ContactSubmission) {
  if (!transport) {
    logWarn('SMTP not configured — skipping contact email notification.')
    return
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

  // sendMail returns a Promise.  We attach .then/.catch instead of awaiting
  // so that this function returns immediately (fire-and-forget pattern).
  transport
    .sendMail({
      from: `"Portfolio Contact" <${env.SMTP_USER}>`, // shown in the "From" field
      to: env.SMTP_USER,                               // send to yourself
      replyTo: submission.email,                       // hitting Reply goes to the visitor
      subject,
      text,   // fallback plain text
      html,   // preferred rich HTML
    })
    .then(() => {
      logInfo(`Contact notification sent for submission ${submission.id}`)
    })
    .catch((error: unknown) => {
      // Log but don't crash — the submission is already persisted, so we only
      // lost the notification, not the data.
      const detail = error instanceof Error ? error.message : String(error)
      logError(`Failed to send contact notification for ${submission.id}: ${detail}`)
    })
}
