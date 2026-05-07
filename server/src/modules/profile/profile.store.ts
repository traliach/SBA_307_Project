import { isDatabaseReady } from '../../config/database.js'
import type { ProfileContent } from '../../types/content.js'
import { logInfo, logWarn } from '../../utils/logger.js'
import { profile as seedProfile } from './profile.data.js'
import { ProfileModel } from './profile.model.js'

type ProfileRecord = ProfileContent & {
  key: 'main'
  _id?: unknown
}

function stripProfileMetadata(document: ProfileRecord) {
  const { _id, key, ...profile } = document
  return profile
}

async function readMongoProfile() {
  const document = (await ProfileModel.findOne().lean().exec()) as
    | ProfileRecord
    | null

  if (!document) {
    await ProfileModel.create({ key: 'main', ...seedProfile })
    logInfo('Seeded profile collection from static data.')
    return seedProfile
  }

  let anyUpdate = false

  // Sync scalar text fields.
  const textFields = [
    'name',
    'summary',
    'intro',
    'about',
    'availability',
    'title',
    'location',
    'currentEmployer',
    'previousEmployer',
    'education',
  ] as const
  const stale = textFields.filter((field) => document[field] !== seedProfile[field])
  if (stale.length > 0) {
    await ProfileModel.updateOne(
      { key: 'main' },
      { $set: Object.fromEntries(stale.map((f) => [f, seedProfile[f]])) },
    )
    logInfo(`Synced profile field(s) from static data: ${stale.join(', ')}.`)
    anyUpdate = true
  }

  // Sync certifications array.
  if (JSON.stringify(document.certifications) !== JSON.stringify(seedProfile.certifications)) {
    await ProfileModel.updateOne(
      { key: 'main' },
      { $set: { certifications: seedProfile.certifications } },
    )
    logInfo('Synced profile certifications from static data.')
    anyUpdate = true
  }

  // Sync strengths array.
  if (JSON.stringify(document.strengths) !== JSON.stringify(seedProfile.strengths)) {
    await ProfileModel.updateOne(
      { key: 'main' },
      { $set: { strengths: seedProfile.strengths } },
    )
    logInfo('Synced profile strengths from static data.')
    anyUpdate = true
  }

  if (JSON.stringify(document.links) !== JSON.stringify(seedProfile.links)) {
    await ProfileModel.updateOne(
      { key: 'main' },
      { $set: { links: seedProfile.links } },
    )
    logInfo('Synced profile links from static data.')
    anyUpdate = true
  }

  if (JSON.stringify(document.timeline) !== JSON.stringify(seedProfile.timeline)) {
    await ProfileModel.updateOne(
      { key: 'main' },
      { $set: { timeline: seedProfile.timeline } },
    )
    logInfo('Synced profile timeline from static data.')
    anyUpdate = true
  }

  if (anyUpdate) {
    const updated = (await ProfileModel.findOne().lean().exec()) as ProfileRecord
    return stripProfileMetadata(updated)
  }

  return stripProfileMetadata(document)
}

export async function getProfileContent() {
  if (!isDatabaseReady()) {
    logWarn('MongoDB not ready. Serving profile from static seed data.')
    return seedProfile
  }

  return readMongoProfile()
}
