import { app } from './app.js'
import { env } from './config/env.js'
import { logError, logStartup, logSuccess } from './utils/logger.js'

const server = app.listen(env.PORT, () => {
  logStartup(env.PORT, env.CLIENT_ORIGIN)
  logSuccess(`Server listening on port ${env.PORT}`)
})

server.on('error', (error) => {
  logError(
    error instanceof Error ? error.message : 'Unknown server startup error',
  )
})
