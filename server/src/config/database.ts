import mongoose from 'mongoose'
import { env } from './env.js'
import { logInfo, logSuccess, logWarn } from '../utils/logger.js'

function getDatabaseTargetLabel(uri: string) {
  try {
    const { host } = new URL(uri)
    return host || 'configured target'
  } catch {
    return 'configured target'
  }
}

export async function connectDatabase() {
  if (!env.MONGODB_URI) {
    logWarn('MongoDB URI not set. Skipping database connection.')
    return false
  }

  const target = getDatabaseTargetLabel(env.MONGODB_URI)
  logInfo(`Connecting to MongoDB at ${target}...`)
  await mongoose.connect(env.MONGODB_URI)
  logSuccess(`Connected to MongoDB at ${target}`)
  return true
}
