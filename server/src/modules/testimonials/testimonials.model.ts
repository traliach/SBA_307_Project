import mongoose, { Schema, model } from 'mongoose'
import type { Model } from 'mongoose'
import type { AdminTestimonial } from '../../types/content.js'

type TestimonialDocument = AdminTestimonial & {
  order: number
}

// Preserve moderation status in Mongo so the public site can show approved quotes only.
const testimonialSchema = new Schema<TestimonialDocument>(
  {
    order: { type: Number, required: true, unique: true },
    quote: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    collection: 'testimonials',
    versionKey: false,
  },
)

export const TestimonialModel =
  (mongoose.models.Testimonial as Model<TestimonialDocument> | undefined) ??
  model<TestimonialDocument>('Testimonial', testimonialSchema)
