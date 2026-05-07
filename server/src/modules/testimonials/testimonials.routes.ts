import { Router } from 'express'
import { z } from 'zod'
import { isDatabaseReady } from '../../config/database.js'
import { logInfo } from '../../utils/logger.js'
import {
  acceptSpamTrapSubmission,
  enforcePublicSubmissionRateLimit,
  isSpamTrapFilled,
} from '../../utils/public-submission-guard.js'
import { getTestimonials } from './testimonials.store.js'
import { TestimonialModel } from './testimonials.model.js'

const testimonialSubmissionSchema = z.object({
  quote: z.string().trim().min(20).max(1000),
  author: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  role: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(120),
})

export const testimonialsRouter = Router()

testimonialsRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await getTestimonials())
  } catch (error) {
    next(error)
  }
})

testimonialsRouter.post('/', async (request, response, next) => {
  try {
    if (isSpamTrapFilled(request.body?.website)) {
      acceptSpamTrapSubmission(response, 'Thank you. Your testimonial has been submitted for review.')
      return
    }

    if (!isDatabaseReady()) {
      response.status(503).json({
        message: 'Testimonials are temporarily unavailable for submission.',
      })
      return
    }

    const result = testimonialSubmissionSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide a valid testimonial submission.',
        issues: result.error.flatten(),
      })
      return
    }

    if (
      !enforcePublicSubmissionRateLimit(request, response, {
        scope: 'testimonial',
        email: result.data.email,
      })
    ) {
      return
    }

    const lastDocument = await TestimonialModel.findOne().sort({ order: -1 }).lean().exec()
    const nextOrder =
      typeof lastDocument?.order === 'number' ? lastDocument.order + 1 : 0
    const submittedAt = new Date().toISOString()

    const document = await TestimonialModel.create({
      order: nextOrder,
      status: 'pending',
      source: 'public',
      submittedAt,
      ...result.data,
    })

    logInfo(`Received testimonial submission from ${result.data.email}.`)

    response.status(201).json({
      id: String(document._id),
      message: 'Thank you. Your testimonial has been submitted for review.',
      receivedAt: submittedAt,
    })
  } catch (error) {
    next(error)
  }
})
