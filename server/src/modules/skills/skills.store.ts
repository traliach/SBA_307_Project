import { isDatabaseReady } from '../../config/database.js'
import type { SkillGroup } from '../../types/content.js'
import { logInfo, logWarn } from '../../utils/logger.js'
import { skillGroups as seedSkillGroups } from './skills.data.js'
import { SkillGroupModel } from './skills.model.js'

type SkillGroupRecord = SkillGroup & {
  order: number
  _id?: unknown
}

function stripSkillGroupMetadata(document: SkillGroupRecord) {
  const { _id, order, ...skillGroup } = document
  return skillGroup
}

async function readMongoSkillGroups() {
  const documents = (await SkillGroupModel.find()
    .sort({ order: 1 })
    .lean()
    .exec()) as SkillGroupRecord[]

  if (documents.length > 0) {
    return documents.map(stripSkillGroupMetadata)
  }

  await SkillGroupModel.insertMany(
    seedSkillGroups.map((skillGroup, order) => ({
      order,
      ...skillGroup,
    })),
  )
  logInfo('Seeded skills collection from static data.')

  return seedSkillGroups
}

export async function getSkillGroups() {
  if (!isDatabaseReady()) {
    logWarn('MongoDB not ready. Serving skills from static seed data.')
    return seedSkillGroups
  }

  return readMongoSkillGroups()
}
