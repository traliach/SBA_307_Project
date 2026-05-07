import { Router } from 'express'
import { z } from 'zod'
import { ProfileModel } from './profile.model.js'
import { getProfileContent } from './profile.store.js'

const profileSchema = z.object({
  name: z.string().trim().min(2).max(100),
  title: z.string().trim().min(2).max(100),
  location: z.string().trim().min(2).max(100),
  currentEmployer: z.string().trim().max(120).optional(),
  previousEmployer: z.string().trim().max(120).optional(),
  education: z.string().trim().max(160).optional(),
  availability: z.string().trim().min(2).max(200),
  summary: z.string().trim().min(10).max(500),
  intro: z.string().trim().min(10).max(500),
  about: z.string().trim().min(10).max(3000),
  certifications: z.array(z.string().trim().min(2).max(120)).min(1),
  strengths: z.array(z.string().trim().min(2).max(300)).min(1),
  timeline: z.array(
    z.object({
      title: z.string().trim().min(2).max(120),
      period: z.string().trim().min(2).max(120),
      detail: z.string().trim().min(10).max(500),
    }),
  ).min(1),
  links: z.object({
    email: z.string().trim().min(3).max(200),
    linkedin: z.string().trim().url(),
    github: z.string().trim().url(),
    resume: z.string().trim().min(1).max(200),
  }),
})

export const adminProfileRouter = Router()

adminProfileRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await getProfileContent())
  } catch (error) {
    next(error)
  }
})

adminProfileRouter.post('/', async (request, response, next) => {
  try {
    const result = profileSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide a valid profile payload.',
        issues: result.error.flatten(),
      })
      return
    }

    const existing = await ProfileModel.findOne().lean().exec()

    if (existing) {
      response.status(409).json({
        message: 'Profile already exists. Use PUT to update it.',
      })
      return
    }

    const document = await ProfileModel.create({
      key: 'main',
      ...result.data,
    })

    const profile = document.toObject()
    const { _id, key, ...payload } = profile

    response.status(201).json(payload)
  } catch (error) {
    next(error)
  }
})

adminProfileRouter.put('/', async (request, response, next) => {
  try {
    const result = profileSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide a valid profile payload.',
        issues: result.error.flatten(),
      })
      return
    }

    const document = await ProfileModel.findOneAndUpdate(
      {},
      { key: 'main', ...result.data },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    )
      .lean()
      .exec()

    const { _id, key, ...profile } = document as z.infer<typeof profileSchema> & {
      key: string
      _id: unknown
    }

    response.json(profile)
  } catch (error) {
    next(error)
  }
})
