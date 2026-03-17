import { Router } from 'express'
import { getProfileContent } from './profile.store.js'

export const profileRouter = Router()

profileRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await getProfileContent())
  } catch (error) {
    next(error)
  }
})
