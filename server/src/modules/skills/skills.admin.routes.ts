import { Router } from 'express'
import { z } from 'zod'
import type { SkillGroup } from '../../types/content.js'
import { SkillGroupModel } from './skills.model.js'

const skillGroupSchema = z.object({
  eyebrow: z.string().trim().min(1).max(80),
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().min(10).max(500),
  items: z.array(z.string().trim().min(1).max(80)).min(1),
})

const reorderSchema = z.object({
  ids: z.array(z.string().trim().min(1)).min(1),
})

type AdminSkillGroupDocument = SkillGroup & {
  order: number
  _id: {
    toString(): string
  }
}

function toAdminSkillGroup(document: AdminSkillGroupDocument) {
  return {
    id: String(document._id),
    order: document.order,
    eyebrow: document.eyebrow,
    title: document.title,
    description: document.description,
    items: document.items,
  }
}

function hasExactIdSet(currentIds: string[], nextIds: string[]) {
  return (
    currentIds.length === nextIds.length &&
    new Set(nextIds).size === nextIds.length &&
    currentIds.every((id) => nextIds.includes(id))
  )
}

export const adminSkillsRouter = Router()

adminSkillsRouter.get('/', async (_request, response, next) => {
  try {
    const documents = await SkillGroupModel.find().sort({ order: 1 }).lean().exec()
    response.json(
      documents.map((document) =>
        toAdminSkillGroup(document as unknown as AdminSkillGroupDocument),
      ),
    )
  } catch (error) {
    next(error)
  }
})

adminSkillsRouter.post('/', async (request, response, next) => {
  try {
    const result = skillGroupSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide a valid skill group payload.',
        issues: result.error.flatten(),
      })
      return
    }

    const lastDocument = await SkillGroupModel.findOne().sort({ order: -1 }).lean().exec()
    const nextOrder =
      typeof lastDocument?.order === 'number' ? lastDocument.order + 1 : 0

    const document = await SkillGroupModel.create({
      order: nextOrder,
      ...result.data,
    })

    response
      .status(201)
      .json(toAdminSkillGroup(document.toObject() as unknown as AdminSkillGroupDocument))
  } catch (error) {
    next(error)
  }
})

adminSkillsRouter.put('/:id', async (request, response, next) => {
  try {
    const result = skillGroupSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide a valid skill group payload.',
        issues: result.error.flatten(),
      })
      return
    }

    const existing = await SkillGroupModel.findById(request.params.id).lean().exec()

    if (!existing) {
      response.status(404).json({
        message: 'Skill group not found.',
      })
      return
    }

    const document = await SkillGroupModel.findByIdAndUpdate(
      request.params.id,
      { order: existing.order, ...result.data },
      { new: true },
    )
      .lean()
      .exec()

    response.json(toAdminSkillGroup(document as unknown as AdminSkillGroupDocument))
  } catch (error) {
    next(error)
  }
})

adminSkillsRouter.delete('/:id', async (request, response, next) => {
  try {
    const document = await SkillGroupModel.findByIdAndDelete(request.params.id)
      .lean()
      .exec()

    if (!document) {
      response.status(404).json({
        message: 'Skill group not found.',
      })
      return
    }

    response.json({
      id: String(document._id),
      message: 'Skill group deleted.',
    })
  } catch (error) {
    next(error)
  }
})

adminSkillsRouter.patch('/reorder', async (request, response, next) => {
  try {
    const result = reorderSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json({
        message: 'Please provide the full ordered skill group id list.',
        issues: result.error.flatten(),
      })
      return
    }

    const currentDocuments = await SkillGroupModel.find()
      .sort({ order: 1 })
      .select('_id')
      .lean()
      .exec()
    const currentIds = currentDocuments.map((document) => String(document._id))

    if (!hasExactIdSet(currentIds, result.data.ids)) {
      response.status(400).json({
        message: 'Skill reorder payload must include every existing skill group id once.',
      })
      return
    }

    const temporaryOrderOffset = currentIds.length + 1000

    // Move the whole range out of the way first so the unique order index
    // does not collide while two items swap positions.
    await SkillGroupModel.bulkWrite(
      result.data.ids.map((id, index) => ({
        updateOne: {
          filter: { _id: id },
          update: { $set: { order: temporaryOrderOffset + index } },
        },
      })),
    )

    await SkillGroupModel.bulkWrite(
      result.data.ids.map((id, index) => ({
        updateOne: {
          filter: { _id: id },
          update: { $set: { order: index } },
        },
      })),
    )

    const reorderedDocuments = await SkillGroupModel.find()
      .sort({ order: 1 })
      .lean()
      .exec()

    response.json(
      reorderedDocuments.map((document) =>
        toAdminSkillGroup(document as unknown as AdminSkillGroupDocument),
      ),
    )
  } catch (error) {
    next(error)
  }
})
