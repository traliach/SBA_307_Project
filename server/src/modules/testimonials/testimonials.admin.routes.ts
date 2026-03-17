import { Router } from 'express'
import { z } from 'zod'
import type { AdminTestimonial } from '../../types/content.js'
import { TestimonialModel } from './testimonials.model.js'

const testimonialSchema = z.object({
  quote: z.string().trim().min(10).max(1000),
  author: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(120),
})

const testimonialStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']),
})

type AdminTestimonialDocument = AdminTestimonial & {
  order: number
  _id: {
    toString(): string
  }
}

function toAdminTestimonial(document: AdminTestimonialDocument) {
  return {
    id: String(document._id),
    order: document.order,
    quote: document.quote,
    author: document.author,
    role: document.role,
    company: document.company,
    status: document.status ?? 'approved',
  }
}

export const adminTestimonialsRouter = Router()

adminTestimonialsRouter.get('/', async (_request, response, next) => {
  try {
    const documents = await TestimonialModel.find().sort({ order: 1 }).lean().exec()
    response.json(
      documents.map((document) =>
        toAdminTestimonial(document as unknown as AdminTestimonialDocument),
      ),
    )
  } catch (error) {
    next(error)
  }
})

adminTestimonialsRouter.post('/', async (request, response, next) => {
  try {
    const result = testimonialSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide a valid testimonial payload.',
        issues: result.error.flatten(),
      })
      return
    }

    const lastDocument = await TestimonialModel.findOne().sort({ order: -1 }).lean().exec()
    const nextOrder =
      typeof lastDocument?.order === 'number' ? lastDocument.order + 1 : 0

    const document = await TestimonialModel.create({
      order: nextOrder,
      status: 'pending',
      ...result.data,
    })

    response
      .status(201)
      .json(
        toAdminTestimonial(document.toObject() as unknown as AdminTestimonialDocument),
      )
  } catch (error) {
    next(error)
  }
})

adminTestimonialsRouter.put('/:id', async (request, response, next) => {
  try {
    const result = testimonialSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide a valid testimonial payload.',
        issues: result.error.flatten(),
      })
      return
    }

    const existing = await TestimonialModel.findById(request.params.id).lean().exec()

    if (!existing) {
      response.status(404).json({
        message: 'Testimonial not found.',
      })
      return
    }

    const document = await TestimonialModel.findByIdAndUpdate(
      request.params.id,
      {
        order: existing.order,
        status: existing.status ?? 'approved',
        ...result.data,
      },
      { new: true },
    )
      .lean()
      .exec()

    response.json(toAdminTestimonial(document as unknown as AdminTestimonialDocument))
  } catch (error) {
    next(error)
  }
})

adminTestimonialsRouter.patch('/:id/status', async (request, response, next) => {
  try {
    const result = testimonialStatusSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide a valid testimonial status.',
        issues: result.error.flatten(),
      })
      return
    }

    const document = await TestimonialModel.findByIdAndUpdate(
      request.params.id,
      { status: result.data.status },
      { new: true },
    )
      .lean()
      .exec()

    if (!document) {
      response.status(404).json({
        message: 'Testimonial not found.',
      })
      return
    }

    response.json(toAdminTestimonial(document as unknown as AdminTestimonialDocument))
  } catch (error) {
    next(error)
  }
})

adminTestimonialsRouter.delete('/:id', async (request, response, next) => {
  try {
    const document = await TestimonialModel.findByIdAndDelete(request.params.id)
      .lean()
      .exec()

    if (!document) {
      response.status(404).json({
        message: 'Testimonial not found.',
      })
      return
    }

    response.json({
      id: String(document._id),
      message: 'Testimonial deleted.',
    })
  } catch (error) {
    next(error)
  }
})
