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

  if (documents.length > 0) {
    return documents.map(stripProjectMetadata)
  }

  await ProjectModel.insertMany(
    seedProjects.map((project, order) => ({
      order,
      ...project,
    })),
  )
  logInfo('Seeded projects collection from static data.')

  return seedProjects
}

export async function getProjects() {
  if (!isDatabaseReady()) {
    logWarn('MongoDB not ready. Serving projects from static seed data.')
    return seedProjects
  }

  return readMongoProjects()
}
