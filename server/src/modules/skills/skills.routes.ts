import { Router } from 'express'
import { getSkillGroups } from './skills.store.js'

export const skillsRouter = Router()

skillsRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await getSkillGroups())
  } catch (error) {
    next(error)
  }
})
