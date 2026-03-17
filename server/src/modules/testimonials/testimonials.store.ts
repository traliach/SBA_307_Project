import { isDatabaseReady } from '../../config/database.js'
import type { Testimonial } from '../../types/content.js'
import { logInfo, logWarn } from '../../utils/logger.js'
import { testimonials as seedTestimonials } from './testimonials.data.js'
import { TestimonialModel } from './testimonials.model.js'

type TestimonialRecord = Testimonial & {
  order: number
  _id?: unknown
}

function stripTestimonialMetadata(document: TestimonialRecord) {
  const { _id, order, ...testimonial } = document
  return testimonial
}

async function readMongoTestimonials() {
  const documents = (await TestimonialModel.find()
    .sort({ order: 1 })
    .lean()
    .exec()) as TestimonialRecord[]

  if (documents.length > 0) {
    return documents.map(stripTestimonialMetadata)
  }

  await TestimonialModel.insertMany(
    seedTestimonials.map((testimonial, order) => ({
      order,
      ...testimonial,
    })),
  )
  logInfo('Seeded testimonials collection from static data.')

  return seedTestimonials
}

export async function getTestimonials() {
  if (!isDatabaseReady()) {
    logWarn('MongoDB not ready. Serving testimonials from static seed data.')
    return seedTestimonials
  }

  return readMongoTestimonials()
}
