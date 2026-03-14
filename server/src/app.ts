import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env.js'
import { errorHandlerMiddleware } from './middleware/error-handler.js'
import { notFoundMiddleware } from './middleware/not-found.js'
import { requestLoggerMiddleware } from './middleware/request-logger.js'
import { contactRouter } from './modules/contact/contact.routes.js'
import { healthRouter } from './modules/health/health.routes.js'
import { profileRouter } from './modules/profile/profile.routes.js'
import { projectsRouter } from './modules/projects/projects.routes.js'
import { skillsRouter } from './modules/skills/skills.routes.js'

export const app = express()

app.use(helmet())
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  }),
)
app.use(express.json())
app.use(requestLoggerMiddleware)

app.get('/api', (_request, response) => {
  response.json({
    message: 'Resume platform API',
  })
})

app.use('/api/health', healthRouter)
app.use('/api/profile', profileRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/skills', skillsRouter)
app.use('/api/contact', contactRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
