import { Router } from 'express'
import { getTestimonials } from './testimonials.store.js'

export const testimonialsRouter = Router()

testimonialsRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await getTestimonials())
  } catch (error) {
    next(error)
  }
})
