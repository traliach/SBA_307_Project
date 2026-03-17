import mongoose, { Schema, model } from 'mongoose'
import type { Testimonial } from '../../types/content.js'

type TestimonialDocument = Testimonial & {
  order: number
}

// Preserve testimonial ordering in Mongo while keeping the client payload unchanged.
const testimonialSchema = new Schema<TestimonialDocument>(
  {
    order: { type: Number, required: true, unique: true },
    quote: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
  },
  {
    collection: 'testimonials',
    versionKey: false,
  },
)

export const TestimonialModel =
  mongoose.models.Testimonial ??
  model<TestimonialDocument>('Testimonial', testimonialSchema)
