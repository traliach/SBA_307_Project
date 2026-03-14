import { app } from './app.js'
import { connectDatabase } from './config/database.js'
import { env } from './config/env.js'
import { logError, logStartup, logSuccess } from './utils/logger.js'

void connectDatabase().catch((error) => {
  logError(
    error instanceof Error ? error.message : 'Unknown database startup error',
  )
})

const server = app.listen(env.PORT, () => {
  logStartup(env.PORT, env.CLIENT_ORIGIN)
  logSuccess(`Server listening on port ${env.PORT}`)
})

server.on('error', (error) => {
  logError(
    error instanceof Error ? error.message : 'Unknown server startup error',
  )
})
