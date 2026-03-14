import { Router } from 'express'

export const healthRouter = Router()

healthRouter.get('/', (_request, response) => {
  response.json({
    service: 'resume-platform-api',
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})
