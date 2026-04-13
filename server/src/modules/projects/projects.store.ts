import { isDatabaseReady } from '../../config/database.js'
import type { ProjectSummary } from '../../types/content.js'
import { logInfo, logWarn } from '../../utils/logger.js'
import { projects as seedProjects } from './projects.data.js'
import { ProjectModel } from './projects.model.js'

type ProjectRecord = ProjectSummary & {
  order: number
  _id?: unknown
}

function stripProjectMetadata(document: ProjectRecord) {
  const { _id, order, ...project } = document
  return project
}

async function readMongoProjects() {
  const documents = (await ProjectModel.find()
    .sort({ order: 1 })
    .lean()
    .exec()) as ProjectRecord[]

  if (documents.length === 0) {
    await ProjectModel.insertMany(
      seedProjects.map((project, order) => ({
        order,
        ...project,
      })),
    )
    logInfo('Seeded projects collection from static data.')
    return seedProjects
  }

  const existingTitles = new Set(documents.map((d) => d.title))
  const newProjects = seedProjects.filter((p) => !existingTitles.has(p.title))

  if (newProjects.length > 0) {
    const lastOrder = Math.max(...documents.map((d) => d.order))
    await ProjectModel.insertMany(
      newProjects.map((project, i) => ({
        order: lastOrder + 1 + i,
        ...project,
      })),
    )
    logInfo(`Synced ${newProjects.length} new project(s) from static data.`)
    const updated = (await ProjectModel.find()
      .sort({ order: 1 })
      .lean()
      .exec()) as ProjectRecord[]
    return updated.map(stripProjectMetadata)
  }

  return documents.map(stripProjectMetadata)
}

export async function getProjects() {
  if (!isDatabaseReady()) {
    logWarn('MongoDB not ready. Serving projects from static seed data.')
    return seedProjects
  }

  return readMongoProjects()
}
