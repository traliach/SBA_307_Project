/**
 * contact.admin.routes.ts — Protected admin endpoints for contact submissions
 *
 * These routes are mounted under /api/admin/contact and are protected by the
 * auth middleware in app.ts — only a logged-in admin can reach them.
 *
 * Available operations:
 *   GET    /            → list all submissions (newest first)
 *   PATCH  /:id/status  → update a submission's workflow status
 *   DELETE /:id         → permanently delete a submission
 */

import { Router } from 'express'
import { z } from 'zod'
import {
  deleteContactSubmission,
  listContactSubmissions,
  updateContactSubmissionStatus,
} from './contact.store.js'

// Zod schema used to validate the body of PATCH /:id/status requests.
// The status must be exactly one of these four strings — nothing else is valid.
const contactStatusSchema = z.object({
  status: z.enum(['new', 'reviewed', 'replied', 'archived']),
})

export const adminContactRouter = Router()

// ─── GET / — List all contact submissions ───────────────────────────────────
adminContactRouter.get('/', async (_request, response, next) => {
  try {
    const submissions = await listContactSubmissions()

    response.json({
      count: submissions.length,          // total number of submissions
      latest: submissions[0] ?? null,     // most recent one (handy for dashboard widgets)
      items: submissions,                 // full list
    })
  } catch (error) {
    next(error)
  }
})

// ─── PATCH /:id/status — Update a submission's status ───────────────────────
// The admin panel uses this to move a submission through the workflow:
//   new → reviewed → replied → archived
adminContactRouter.patch('/:id/status', async (request, response, next) => {
  try {
    const result = contactStatusSchema.safeParse(request.body)

    if (!result.success) {
      // 400 — the body didn't contain a valid status string.
      response.status(400).json({
        message: 'Please provide a valid contact status.',
        issues: result.error.flatten(),
      })
      return
    }

    // request.params.id comes from the :id segment in the URL path.
    const submission = await updateContactSubmissionStatus(
      request.params.id,
      result.data.status,
    )

    if (!submission) {
      // 404 — no submission with that ID exists in the database.
      response.status(404).json({
        message: 'Contact submission not found.',
      })
      return
    }

    // 200 OK — return the updated submission so the client can refresh its UI.
    response.json(submission)
  } catch (error) {
    next(error)
  }
})

// ─── DELETE /:id — Permanently delete a submission ──────────────────────────
// The admin clicks "Delete" in the panel, which calls this endpoint.
// The deletion is permanent — there is no soft-delete or recycle bin.
adminContactRouter.delete('/:id', async (request, response, next) => {
  try {
    const deleted = await deleteContactSubmission(request.params.id)

    if (!deleted) {
      // 404 — nothing was removed because the ID didn't match anything.
      response.status(404).json({ message: 'Contact submission not found.' })
      return
    }

    // 204 No Content — success, but nothing to return in the body.
    // This is the standard HTTP response for a successful DELETE.
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})
