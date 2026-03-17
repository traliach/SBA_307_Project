import { Router } from 'express'
import { z } from 'zod'
import type { ProjectSummary } from '../../types/content.js'
import { ProjectModel } from './projects.model.js'

const projectSchema = z.object({
  title: z.string().trim().min(2).max(120),
  timeframe: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(120),
  featured: z.boolean(),
  summary: z.string().trim().min(10).max(500),
  challenge: z.string().trim().min(10).max(1000),
  solution: z.string().trim().min(10).max(1000),
  stack: z.array(z.string().trim().min(1).max(80)).min(1),
  metrics: z.array(
    z.object({
      label: z.string().trim().min(1).max(120),
      value: z.string().trim().min(1).max(120),
    }),
  ).min(1),
  outcomes: z.array(z.string().trim().min(1).max(300)).min(1),
})

const reorderSchema = z.object({
  ids: z.array(z.string().trim().min(1)).min(1),
})

type AdminProjectDocument = ProjectSummary & {
  order: number
  _id: {
    toString(): string
  }
}

function toAdminProject(document: AdminProjectDocument) {
  return {
    id: String(document._id),
    order: document.order,
    title: document.title,
    timeframe: document.timeframe,
    role: document.role,
    featured: document.featured,
    summary: document.summary,
    challenge: document.challenge,
    solution: document.solution,
    stack: document.stack,
    metrics: document.metrics,
    outcomes: document.outcomes,
  }
}

function hasExactIdSet(currentIds: string[], nextIds: string[]) {
  return (
    currentIds.length === nextIds.length &&
    new Set(nextIds).size === nextIds.length &&
    currentIds.every((id) => nextIds.includes(id))
  )
}

export const adminProjectsRouter = Router()

adminProjectsRouter.get('/', async (_request, response, next) => {
  try {
    const documents = await ProjectModel.find().sort({ order: 1 }).lean().exec()
    response.json(
      documents.map((document) => toAdminProject(document as unknown as AdminProjectDocument)),
    )
  } catch (error) {
    next(error)
  }
})

adminProjectsRouter.post('/', async (request, response, next) => {
  try {
    const result = projectSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide a valid project payload.',
        issues: result.error.flatten(),
      })
      return
    }

    const lastProject = await ProjectModel.findOne().sort({ order: -1 }).lean().exec()
    const nextOrder =
      typeof lastProject?.order === 'number' ? lastProject.order + 1 : 0

    const document = await ProjectModel.create({
      order: nextOrder,
      ...result.data,
    })

    response
      .status(201)
      .json(toAdminProject(document.toObject() as unknown as AdminProjectDocument))
  } catch (error) {
    next(error)
  }
})

adminProjectsRouter.put('/:id', async (request, response, next) => {
  try {
    const result = projectSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide a valid project payload.',
        issues: result.error.flatten(),
      })
      return
    }

    const existing = await ProjectModel.findById(request.params.id).lean().exec()

    if (!existing) {
      response.status(404).json({
        message: 'Project not found.',
      })
      return
    }

    const document = await ProjectModel.findByIdAndUpdate(
      request.params.id,
      { order: existing.order, ...result.data },
      { new: true },
    )
      .lean()
      .exec()

    response.json(toAdminProject(document as unknown as AdminProjectDocument))
  } catch (error) {
    next(error)
  }
})

adminProjectsRouter.delete('/:id', async (request, response, next) => {
  try {
    const document = await ProjectModel.findByIdAndDelete(request.params.id)
      .lean()
      .exec()

    if (!document) {
      response.status(404).json({
        message: 'Project not found.',
      })
      return
    }

    response.json({
      id: String(document._id),
      message: 'Project deleted.',
    })
  } catch (error) {
    next(error)
  }
})

adminProjectsRouter.patch('/reorder', async (request, response, next) => {
  try {
    const result = reorderSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide the full ordered project id list.',
        issues: result.error.flatten(),
      })
      return
    }

    const currentDocuments = await ProjectModel.find()
      .sort({ order: 1 })
      .select('_id')
      .lean()
      .exec()
    const currentIds = currentDocuments.map((document) => String(document._id))

    if (!hasExactIdSet(currentIds, result.data.ids)) {
      response.status(400).json({
        message: 'Project reorder payload must include every existing project id once.',
      })
      return
    }

    const temporaryOrderOffset = currentIds.length + 1000

    // Move the whole range out of the way first so the unique order index
    // does not collide while two items swap positions.
    await ProjectModel.bulkWrite(
      result.data.ids.map((id, index) => ({
        updateOne: {
          filter: { _id: id },
          update: { $set: { order: temporaryOrderOffset + index } },
        },
      })),
    )

    await ProjectModel.bulkWrite(
      result.data.ids.map((id, index) => ({
        updateOne: {
          filter: { _id: id },
          update: { $set: { order: index } },
        },
      })),
    )

    const reorderedDocuments = await ProjectModel.find().sort({ order: 1 }).lean().exec()

    response.json(
      reorderedDocuments.map((document) =>
        toAdminProject(document as unknown as AdminProjectDocument),
      ),
    )
  } catch (error) {
    next(error)
  }
})
