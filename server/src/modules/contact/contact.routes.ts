import { randomUUID } from 'node:crypto'
import { Router } from 'express'
import { z } from 'zod'
import type { ContactSubmission } from '../../types/content.js'

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  inquiryType: z.string().trim().min(2).max(80),
  message: z.string().trim().min(10).max(2000),
})

const submissions: ContactSubmission[] = []

export const contactRouter = Router()

contactRouter.post('/', (request, response) => {
  const result = contactSchema.safeParse(request.body)

  if (!result.success) {
    response.status(400).json({
      message: 'Please provide a valid name, email, inquiry type, and message.',
      issues: result.error.flatten(),
    })
    return
  }

  const submission: ContactSubmission = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    ...result.data,
  }

  submissions.unshift(submission)

  response.status(201).json({
    id: submission.id,
    receivedAt: submission.receivedAt,
    message: 'Message received. Thanks for reaching out.',
  })
})

contactRouter.get('/', (_request, response) => {
  response.json({
    count: submissions.length,
    latest: submissions[0] ?? null,
  })
})
