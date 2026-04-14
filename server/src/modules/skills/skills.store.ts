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

  if (documents.length === 0) {
    await SkillGroupModel.insertMany(
      seedSkillGroups.map((skillGroup, order) => ({
        order,
        ...skillGroup,
      })),
    )
    logInfo('Seeded skills collection from static data.')
    return seedSkillGroups
  }

  // For each existing skill group, push any seed items not already in the document.
  let synced = 0
  for (const seedGroup of seedSkillGroups) {
    const doc = documents.find((d) => d.eyebrow === seedGroup.eyebrow)
    if (!doc) continue
    const newItems = seedGroup.items.filter((item) => !doc.items.includes(item))
    if (newItems.length > 0) {
      await SkillGroupModel.updateOne(
        { eyebrow: seedGroup.eyebrow },
        { $push: { items: { $each: newItems } } },
      )
      synced += newItems.length
    }
  }
  if (synced > 0) {
    logInfo(`Synced ${synced} new skill item(s) from static data.`)
  }

  // Sync order field to match seed ordering (controls display sequence on the skills page).
  let orderSynced = 0
  for (const [i, seedGroup] of seedSkillGroups.entries()) {
    const doc = documents.find((d) => d.eyebrow === seedGroup.eyebrow)
    if (doc && doc.order !== i) {
      await SkillGroupModel.updateOne(
        { eyebrow: seedGroup.eyebrow },
        { $set: { order: i } },
      )
      orderSynced++
    }
  }
  if (orderSynced > 0) {
    logInfo(`Synced order for ${orderSynced} skill group(s) from static data.`)
  }

  if (synced > 0 || orderSynced > 0) {
    const updated = (await SkillGroupModel.find()
      .sort({ order: 1 })
      .lean()
      .exec()) as SkillGroupRecord[]
    return updated.map(stripSkillGroupMetadata)
  }

  return documents.map(stripSkillGroupMetadata)
}

export async function getSkillGroups() {
  if (!isDatabaseReady()) {
    logWarn('MongoDB not ready. Serving skills from static seed data.')
    return seedSkillGroups
  }

  return readMongoSkillGroups()
}
