import type { RequestHandler } from 'express'
import { logRequest } from '../utils/logger.js'

export const requestLoggerMiddleware: RequestHandler = (
  request,
  response,
  next,
) => {
  const startedAt = performance.now()

  response.on('finish', () => {
    logRequest(
      request.method,
      request.originalUrl,
      response.statusCode,
      performance.now() - startedAt,
    )
  })

  next()
}
