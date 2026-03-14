import { Router } from 'express'
import { projects } from './projects.data.js'

export const projectsRouter = Router()

projectsRouter.get('/', (_request, response) => {
  response.json(projects)
})
