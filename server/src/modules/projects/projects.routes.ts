import { Router } from 'express'
import { getProjects } from './projects.store.js'

export const projectsRouter = Router()

projectsRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await getProjects())
  } catch (error) {
    next(error)
  }
})
