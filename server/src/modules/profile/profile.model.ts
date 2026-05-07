import mongoose, { Schema, model } from 'mongoose'
import type { Model } from 'mongoose'
import type { ProfileContent } from '../../types/content.js'

type ProfileDocument = ProfileContent & {
  key: 'main'
}

const timelineItemSchema = new Schema<ProfileContent['timeline'][number]>(
  {
    title: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    detail: { type: String, required: true, trim: true },
  },
  { _id: false },
)

const linksSchema = new Schema<ProfileContent['links']>(
  {
    email: { type: String, required: true, trim: true },
    linkedin: { type: String, required: true, trim: true },
    github: { type: String, required: true, trim: true },
    resume: { type: String, required: true, trim: true },
  },
  { _id: false },
)

// Store one canonical profile document and keep the API payload unchanged.
const profileSchema = new Schema<ProfileDocument>(
  {
    key: { type: String, required: true, unique: true, default: 'main' },
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    currentEmployer: { type: String, trim: true },
    previousEmployer: { type: String, trim: true },
    education: { type: String, trim: true },
    availability: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    intro: { type: String, required: true, trim: true },
    about: { type: String, required: true, trim: true },
    certifications: [{ type: String, required: true, trim: true }],
    strengths: [{ type: String, required: true, trim: true }],
    timeline: { type: [timelineItemSchema], required: true },
    links: { type: linksSchema, required: true },
  },
  {
    collection: 'profile',
    versionKey: false,
  },
)
export const ProfileModel =
  (mongoose.models.Profile as Model<ProfileDocument> | undefined) ??
  model<ProfileDocument>('Profile', profileSchema)
