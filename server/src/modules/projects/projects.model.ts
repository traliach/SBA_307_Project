import mongoose, { Schema, model } from 'mongoose'
import type { ProjectSummary } from '../../types/content.js'

type ProjectDocument = ProjectSummary & {
  order: number
}

const metricSchema = new Schema<ProjectSummary['metrics'][number]>(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false },
)

// Preserve project ordering in Mongo so the client sees a stable sequence.
const projectSchema = new Schema<ProjectDocument>(
  {
    order: { type: Number, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    timeframe: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    featured: { type: Boolean, required: true },
    summary: { type: String, required: true, trim: true },
    challenge: { type: String, required: true, trim: true },
    solution: { type: String, required: true, trim: true },
    stack: [{ type: String, required: true, trim: true }],
    metrics: { type: [metricSchema], required: true },
    outcomes: [{ type: String, required: true, trim: true }],
  },
  {
    collection: 'projects',
    versionKey: false,
  },
)

export const ProjectModel =
  mongoose.models.Project ??
  model<ProjectDocument>('Project', projectSchema)
