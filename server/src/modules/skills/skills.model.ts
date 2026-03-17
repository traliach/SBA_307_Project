import mongoose, { Schema, model } from 'mongoose'
import type { SkillGroup } from '../../types/content.js'

type SkillGroupDocument = SkillGroup & {
  order: number
}

// Preserve skill-group ordering in Mongo while keeping the API payload clean.
const skillGroupSchema = new Schema<SkillGroupDocument>(
  {
    order: { type: Number, required: true, unique: true },
    eyebrow: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    items: [{ type: String, required: true, trim: true }],
  },
  {
    collection: 'skills',
    versionKey: false,
  },
)

export const SkillGroupModel =
  mongoose.models.SkillGroup ??
  model<SkillGroupDocument>('SkillGroup', skillGroupSchema)
