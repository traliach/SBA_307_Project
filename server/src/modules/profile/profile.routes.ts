import { Router } from 'express'
import { profile } from './profile.data.js'

export const profileRouter = Router()

profileRouter.get('/', (_request, response) => {
  response.json(profile)
})
