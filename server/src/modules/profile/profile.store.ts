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

  // Existing MongoDB profile content is managed from the admin page. Static
  // seed data only creates the first record and must not overwrite admin edits.
  return stripProfileMetadata(document)
}

export async function getProfileContent() {
  if (!isDatabaseReady()) {
    logWarn('MongoDB not ready. Serving profile from static seed data.')
    return seedProfile
  }

  return readMongoProfile()
}
