/**
 * contact.routes.ts — Public contact form endpoint
 *
 * This file registers the POST /api/contact route that the portfolio's contact
 * form submits to.  It is "public" — no authentication is required — because
 * any visitor should be able to send a message.
 *
 * Flow:
 *   1. Validate the request body with Zod (field-level error messages).
 *   2. Store the submission in MongoDB (or a JSON file as fallback).
 *   3. Fire off an email notification to the site owner (non-blocking).
 *   4. Respond 201 Created with a confirmation message.
 */

import { Router } from 'express'
import { z } from 'zod'
import { logInfo } from '../../utils/logger.js'
import { sendContactNotification } from '../../utils/mailer.js'
import { createContactSubmission } from './contact.store.js'

// ─── Validation schema ───────────────────────────────────────────────────────
// Zod checks every field before we touch the database.
// Each .min() and .email() call has a custom error message that the client
// surfaces directly to the user — no more generic "invalid input" errors.
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters.').max(100),
  email: z.string().trim().email('Please enter a valid email address.'),
  inquiryType: z.string().trim().min(2, 'Please select an inquiry type.').max(80),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message must be under 2000 characters.'),
})

// Express Router lets us group related routes and mount them as a block in app.ts.
export const contactRouter = Router()

// POST /api/contact
contactRouter.post('/', async (request, response, next) => {
  try {
    // safeParse returns { success: true, data } or { success: false, error }
    // instead of throwing, which lets us send a proper HTTP response.
    const result = contactSchema.safeParse(request.body)

    if (!result.success) {
      // flatten() turns Zod's nested error tree into a simple object:
      // { fieldErrors: { name: ['...'], email: ['...'] }, formErrors: [] }
      const fieldErrors = result.error.flatten().fieldErrors

      // Pick the first error message across all fields to show the user.
      const firstError =
        Object.values(fieldErrors).find((msgs) => msgs && msgs.length > 0)?.[0] ??
        'Please check your submission and try again.'

      // 400 Bad Request — the client sent data we cannot accept.
      response.status(400).json({
        message: firstError,   // user-facing sentence
        issues: fieldErrors,   // machine-readable field map (useful for future inline errors)
      })
      return
    }

    // At this point result.data is clean and type-safe.
    const submission = await createContactSubmission(result.data)

    logInfo(`Stored contact submission ${submission.id} from ${submission.email}`)

    // Fire-and-forget: we don't await this because a slow SMTP server should
    // not delay the HTTP response the visitor is waiting for.
    sendContactNotification(submission)

    // 201 Created — the resource was successfully stored.
    response.status(201).json({
      id: submission.id,
      receivedAt: submission.receivedAt,
      message: 'Message received and saved. Thanks for reaching out.',
    })
  } catch (error) {
    // Pass unexpected errors to Express's global error handler (app.ts).
    next(error)
  }
})
