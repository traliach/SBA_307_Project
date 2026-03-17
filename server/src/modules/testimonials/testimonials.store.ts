import { isDatabaseReady } from '../../config/database.js'
import type {
  AdminTestimonial,
  Testimonial,
} from '../../types/content.js'
import { logInfo, logWarn } from '../../utils/logger.js'
import { testimonials as seedTestimonials } from './testimonials.data.js'
import { TestimonialModel } from './testimonials.model.js'

type TestimonialRecord = AdminTestimonial & {
  order: number
  _id?: unknown
}

function stripTestimonialMetadata(document: TestimonialRecord) {
  const { _id, order, status, ...testimonial } = document
  return testimonial
}

async function readMongoTestimonials() {
  const documents = (await TestimonialModel.find()
    .sort({ order: 1 })
    .lean()
    .exec()) as TestimonialRecord[]

  if (documents.length > 0) {
    const hasLegacyDocuments = documents.some((document) => !document.status)

    if (hasLegacyDocuments) {
      await TestimonialModel.updateMany(
        { status: { $exists: false } },
        { $set: { status: 'approved' } },
      ).exec()
      logInfo('Backfilled legacy testimonials with approved moderation status.')

      const refreshedDocuments = (await TestimonialModel.find()
        .sort({ order: 1 })
        .lean()
        .exec()) as TestimonialRecord[]

      return refreshedDocuments
        .filter((document) => document.status === 'approved')
        .map(stripTestimonialMetadata)
    }

    return documents
      .filter((document) => document.status === 'approved')
      .map(stripTestimonialMetadata)
  }

  await TestimonialModel.insertMany(
    seedTestimonials.map((testimonial, order) => ({
      order,
      status: 'approved',
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
