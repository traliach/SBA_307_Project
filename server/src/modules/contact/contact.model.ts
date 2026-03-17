import mongoose, { Schema, model } from 'mongoose'
import type { ContactSubmission } from '../../types/content.js'

// Keep the Mongo document shape aligned with the API response shape.
const contactSubmissionSchema = new Schema<ContactSubmission>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    inquiryType: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    receivedAt: { type: String, required: true },
    status: { type: String, required: true, enum: ['new'], default: 'new' },
  },
  {
    collection: 'contactSubmissions',
    id: false,
    versionKey: false,
  },
)

export const ContactSubmissionModel =
  mongoose.models.ContactSubmission ??
  model<ContactSubmission>('ContactSubmission', contactSubmissionSchema)
