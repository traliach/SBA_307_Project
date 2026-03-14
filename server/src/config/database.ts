import { env } from './env.js'
import { logInfo, logWarn } from '../utils/logger.js'

export async function connectDatabase() {
  if (!env.MONGODB_URI) {
    logWarn('MongoDB URI not set. Skipping database connection.')
    return false
  }

  logInfo('MongoDB URI detected. Connection wiring is ready for the next step.')
  return true
}
