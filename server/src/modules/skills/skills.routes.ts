import { Router } from 'express'
import { skillGroups } from './skills.data.js'

export const skillsRouter = Router()

skillsRouter.get('/', (_request, response) => {
  response.json(skillGroups)
})
