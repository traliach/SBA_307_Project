/**
 * contact.store.ts — Persistence layer for contact submissions
 *
 * This module handles reading and writing contact submissions to storage.
 * It supports two backends and picks the right one at runtime:
 *
 *   1. MongoDB Atlas (preferred in production)
 *      Used when the MONGODB_URI env variable is set and the connection is ready.
 *
 *   2. Local JSON file (fallback for local development)
 *      Used when MongoDB is not available.  Data is stored in
 *      server/data/contact-submissions.json.
 *
 * All exported functions have the same signature regardless of which backend
 * is active, so the rest of the code never has to care about the difference.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { isDatabaseReady } from '../../config/database.js'
import type {
  ContactSubmission,
  ContactSubmissionInput,
  ContactSubmissionStatus,
} from '../../types/content.js'
import { logInfo, logWarn } from '../../utils/logger.js'
import { ContactSubmissionModel } from './contact.model.js'

// ─── File store setup ────────────────────────────────────────────────────────
// Build a URL pointing to the JSON file used as a local fallback.
// import.meta.url is the URL of *this* file, so we go up two levels to reach
// the server/ root, then into data/.
const storageFileUrl = new URL(
  '../../../data/contact-submissions.json',
  import.meta.url,
)

// Zod schema that validates each entry read from the JSON file.
// This prevents corrupt data from silently poisoning the application.
const storedSubmissionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  inquiryType: z.string(),
  message: z.string(),
  receivedAt: z.string(),
  status: z.enum(['new', 'reviewed', 'replied', 'archived']),
})

const storedSubmissionListSchema = z.array(storedSubmissionSchema)

// ─── Write-queue ─────────────────────────────────────────────────────────────
// Multiple requests could arrive at the same time, each trying to write the
// JSON file.  Without coordination they would overwrite each other's changes.
//
// The queue chains each write operation so they run one after another:
//   write A → (A done) → write B → (B done) → write C …
//
// Each operation receives the result of the previous one (or its rejection)
// via .then(op, op) so the chain never breaks even if one write fails.
let writeQueue = Promise.resolve()

// ─── Low-level file helpers ──────────────────────────────────────────────────

/** Creates the data/ directory and an empty JSON array file if they don't exist. */
async function ensureStore() {
  const storagePath = fileURLToPath(storageFileUrl)

  // { recursive: true } means "create parent directories too, don't error if already exists".
  await mkdir(dirname(storagePath), { recursive: true })

  try {
    await readFile(storagePath, 'utf8')
  } catch {
    // readFile threw because the file doesn't exist yet — create it.
    await writeFile(storagePath, '[]\n', 'utf8')
  }
}

/** Reads the JSON file and parses it into a typed array of submissions. */
async function readSubmissions() {
  await ensureStore()

  const content = await readFile(storageFileUrl, 'utf8')
  const parsed = JSON.parse(content) as unknown

  // Validate every entry so a hand-edited or corrupted file doesn't crash later.
  return storedSubmissionListSchema.parse(parsed) as ContactSubmission[]
}

/** Writes the full list of submissions back to the JSON file (pretty-printed). */
async function writeSubmissions(submissions: ContactSubmission[]) {
  await writeFile(
    storageFileUrl,
    `${JSON.stringify(submissions, null, 2)}\n`,
    'utf8',
  )
}

/**
 * Wraps an async operation in the write queue so concurrent writes to the
 * JSON file don't race each other.
 *
 * Usage:  return queueWrite(async () => { /* read-modify-write *\/ })
 */
function queueWrite<T>(operation: () => Promise<T>) {
  const next = writeQueue.then(operation, operation)

  // Advance the queue pointer, swallowing the result so the chain doesn't break.
  writeQueue = next.then(
    () => undefined,
    () => undefined,
  )

  return next
}

// ─── MongoDB helpers ─────────────────────────────────────────────────────────

/** Returns all submissions sorted newest-first from MongoDB. */
async function listMongoSubmissions() {
  const documents = await ContactSubmissionModel.find()
    .sort({ receivedAt: -1 })
    .lean()   // lean() returns plain JS objects instead of Mongoose Documents (faster)
    .exec()

  // Strip the MongoDB internal _id field before returning to callers.
  return documents.map((document) => {
    const { _id, ...submission } = document as ContactSubmission & {
      _id: unknown
    }

    return submission
  })
}

/** Saves a new submission to MongoDB and returns the stored object. */
async function createMongoSubmission(input: ContactSubmissionInput) {
  const submission: ContactSubmission = {
    id: randomUUID(),                     // generate a UUID so we have a stable public ID
    receivedAt: new Date().toISOString(), // ISO 8601 timestamp
    status: 'new',                        // every submission starts in the 'new' state
    ...input,                             // name, email, inquiryType, message from the form
  }

  await ContactSubmissionModel.create(submission)

  return submission
}

// ─── Public API ──────────────────────────────────────────────────────────────

/** Returns all contact submissions, newest first. */
export async function listContactSubmissions() {
  if (isDatabaseReady()) {
    logInfo('Listing contact submissions from MongoDB.')
    return listMongoSubmissions()
  }

  logWarn('MongoDB not ready. Listing contact submissions from file fallback.')
  return readSubmissions()
}

/**
 * Updates the workflow status of a single submission.
 * Returns the updated submission, or null if no submission with that id exists.
 */
export async function updateContactSubmissionStatus(
  id: string,
  status: ContactSubmissionStatus,
) {
  if (isDatabaseReady()) {
    logInfo(`Updating contact submission ${id} status to ${status} in MongoDB.`)

    // findOneAndUpdate: find the document, apply the change, return the new version.
    const document = await ContactSubmissionModel.findOneAndUpdate(
      { id },           // filter: find by our custom UUID (not Mongo's _id)
      { status },       // update: set the new status
      { new: true },    // option: return the document AFTER the update
    )
      .lean()
      .exec()

    if (!document) {
      return null // not found
    }

    const { _id, ...submission } = document as ContactSubmission & {
      _id: unknown
    }

    return submission
  }

  logWarn(`MongoDB not ready. Updating contact submission ${id} status in file fallback.`)

  // In the file fallback we have to read-modify-write the whole array atomically.
  return queueWrite(async () => {
    const submissions = await readSubmissions()
    const index = submissions.findIndex((submission) => submission.id === id)

    if (index === -1) {
      return null // not found
    }

    const currentSubmission = submissions[index]

    if (!currentSubmission) {
      return null
    }

    const updatedSubmission: ContactSubmission = {
      ...currentSubmission,
      status,
    }

    submissions[index] = updatedSubmission

    await writeSubmissions(submissions)

    return updatedSubmission
  })
}

/**
 * Permanently deletes a submission by id.
 * Returns true if something was deleted, false if the id was not found.
 */
export async function deleteContactSubmission(id: string) {
  if (isDatabaseReady()) {
    logInfo(`Deleting contact submission ${id} from MongoDB.`)

    // findOneAndDelete returns the deleted document, or null if nothing matched.
    const result = await ContactSubmissionModel.findOneAndDelete({ id }).lean().exec()
    return result !== null
  }

  logWarn(`MongoDB not ready. Deleting contact submission ${id} from file fallback.`)

  return queueWrite(async () => {
    const submissions = await readSubmissions()
    const filtered = submissions.filter((s) => s.id !== id)

    // If the lengths are the same, no entry matched the id.
    if (filtered.length === submissions.length) return false

    await writeSubmissions(filtered)
    return true
  })
}

/**
 * Creates and persists a new contact submission from validated form data.
 * Returns the stored submission (with generated id, timestamp, and status).
 */
export async function createContactSubmission(input: ContactSubmissionInput) {
  if (isDatabaseReady()) {
    logInfo(`Saving contact submission for ${input.email} to MongoDB.`)
    return createMongoSubmission(input)
  }

  logWarn(`MongoDB not ready. Saving contact submission for ${input.email} to file fallback.`)

  const submission: ContactSubmission = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    status: 'new',
    ...input,
  }

  // unshift() adds to the beginning of the array so the newest item is first.
  await queueWrite(async () => {
    const submissions = await readSubmissions()
    submissions.unshift(submission)
    await writeSubmissions(submissions)
  })

  return submission
}
