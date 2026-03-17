import mongoose from 'mongoose'
import { env } from './env.js'
import { logError, logInfo, logSuccess, logWarn } from '../utils/logger.js'

let hasConnectionListeners = false

function getDatabaseTargetLabel(uri: string) {
  try {
    const { host } = new URL(uri)
    return host || 'configured target'
  } catch {
    return 'configured target'
  }
}

function attachConnectionListeners() {
  if (hasConnectionListeners) {
    return
  }

  mongoose.connection.on('error', (error) => {
    logError(`MongoDB connection error: ${error.message}`)
  })

  mongoose.connection.on('disconnected', () => {
    logWarn('MongoDB disconnected.')
  })

  hasConnectionListeners = true
}

// Centralize readiness checks so content stores can decide whether to use Mongo.
export function isDatabaseReady() {
  return mongoose.connection.readyState === 1
}

export async function connectDatabase() {
  if (!env.MONGODB_URI) {
    logWarn('MongoDB URI not set. Skipping database connection.')
    return false
  }

  attachConnectionListeners()

  const target = getDatabaseTargetLabel(env.MONGODB_URI)
  logInfo(`Connecting to MongoDB at ${target}...`)
  await mongoose.connect(env.MONGODB_URI)
  logSuccess(`Connected to MongoDB at ${target}`)
  return true
}
