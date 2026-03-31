import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env.js'
import { errorHandlerMiddleware } from './middleware/error-handler.js'
import { notFoundMiddleware } from './middleware/not-found.js'
import { requireAdminAuth } from './middleware/require-admin-auth.js'
import { requireDatabaseReady } from './middleware/require-database-ready.js'
import { adminRouter } from './modules/admin/admin.routes.js'
import { authRouter } from './modules/auth/auth.routes.js'
import { requestLoggerMiddleware } from './middleware/request-logger.js'
import { contactRouter } from './modules/contact/contact.routes.js'
import { healthRouter } from './modules/health/health.routes.js'
import { profileRouter } from './modules/profile/profile.routes.js'
import { projectsRouter } from './modules/projects/projects.routes.js'
import { skillsRouter } from './modules/skills/skills.routes.js'
import { testimonialsRouter } from './modules/testimonials/testimonials.routes.js'

export const app = express()

app.set('trust proxy', 1)
app.use(helmet())
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [env.CLIENT_ORIGIN, env.CLIENT_ORIGIN_SECONDARY].filter(Boolean)
      if (!origin || allowed.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
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

app.use('/api/auth', authRouter)
app.use('/api/health', healthRouter)
app.use('/api/profile', profileRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/skills', skillsRouter)
app.use('/api/testimonials', testimonialsRouter)
app.use('/api/contact', contactRouter)
app.use('/api/admin', requireAdminAuth, requireDatabaseReady, adminRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
