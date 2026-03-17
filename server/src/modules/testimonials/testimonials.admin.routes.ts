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

const reorderSchema = z.object({
  ids: z.array(z.string().trim().min(1)).min(1),
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
    email: document.email ?? '',
    role: document.role,
    company: document.company,
    submittedAt: document.submittedAt ?? '',
    status: document.status ?? 'approved',
    source: document.source ?? 'seed',
  }
}

function hasExactIdSet(currentIds: string[], nextIds: string[]) {
  return (
    currentIds.length === nextIds.length &&
    new Set(nextIds).size === nextIds.length &&
    currentIds.every((id) => nextIds.includes(id))
  )
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
      email: '',
      submittedAt: new Date().toISOString(),
      status: 'pending',
      source: 'admin',
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
        email: existing.email ?? '',
        submittedAt: existing.submittedAt ?? '',
        status: existing.status ?? 'approved',
        source: existing.source ?? 'seed',
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

adminTestimonialsRouter.patch('/reorder', async (request, response, next) => {
  try {
    const result = reorderSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide the full ordered testimonial id list.',
        issues: result.error.flatten(),
      })
      return
    }

    const currentDocuments = await TestimonialModel.find()
      .sort({ order: 1 })
      .select('_id')
      .lean()
      .exec()
    const currentIds = currentDocuments.map((document) => String(document._id))

    if (!hasExactIdSet(currentIds, result.data.ids)) {
      response.status(400).json({
        message: 'Testimonial reorder payload must include every existing testimonial id once.',
      })
      return
    }

    const temporaryOrderOffset = currentIds.length + 1000

    // Move the whole range out of the way first so the unique order index
    // does not collide while two items swap positions.
    await TestimonialModel.bulkWrite(
      result.data.ids.map((id, index) => ({
        updateOne: {
          filter: { _id: id },
          update: { $set: { order: temporaryOrderOffset + index } },
        },
      })),
    )

    await TestimonialModel.bulkWrite(
      result.data.ids.map((id, index) => ({
        updateOne: {
          filter: { _id: id },
          update: { $set: { order: index } },
        },
      })),
    )

    const reorderedDocuments = await TestimonialModel.find()
      .sort({ order: 1 })
      .lean()
      .exec()

    response.json(
      reorderedDocuments.map((document) =>
        toAdminTestimonial(document as unknown as AdminTestimonialDocument),
      ),
    )
  } catch (error) {
    next(error)
  }
})
