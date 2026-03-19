/**
 * api.ts — Public API service layer
 *
 * This module is the single place where the React app talks to the Express
 * server for public (unauthenticated) data.  All fetch calls go through the
 * helpers defined here so that:
 *
 *   - Every request has a consistent timeout (no hanging forever).
 *   - Non-JSON responses are detected and reported clearly.
 *   - Error messages from the server are surfaced to the UI verbatim.
 *   - All request/response lifecycle events are logged to the console.
 *
 * The admin-facing API calls live in adminApi.ts and add auth headers on top.
 */

import type {
  ApiHealth,
  ContactSubmissionInput,
  ContactSubmissionResult,
  ProfileContent,
  ProjectSummary,
  SkillGroup,
  Testimonial,
  TestimonialSubmissionInput,
  TestimonialSubmissionResult,
} from '../types/site'
import { withApiBase } from './apiBase'

// How long to wait for the server before giving up.
// 8 seconds covers slow cold starts on the free Render tier.
const REQUEST_TIMEOUT_MS = 8000

// ─── Core fetch wrapper ──────────────────────────────────────────────────────

/**
 * Wraps the native fetch() with an AbortController timeout.
 *
 * fetch() by default waits forever.  AbortController lets us cancel the
 * request after REQUEST_TIMEOUT_MS milliseconds and throw a readable error.
 */
async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  // AbortController is the browser mechanism for cancelling in-flight requests.
  const controller = new AbortController()

  // Schedule the cancellation.  clearTimeout() below prevents it from firing
  // if the response arrives in time.
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal, // connect the timeout to this request
    })
  } catch (error) {
    // AbortError means we cancelled the request ourselves — rewrite it as a
    // friendlier message so the UI doesn't show "AbortError: signal aborted".
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms`)
    }

    throw error
  } finally {
    // Always clear the timer, even if fetch threw, to avoid a no-op timeout
    // firing later and cluttering the console.
    window.clearTimeout(timeoutId)
  }
}

// ─── JSON parsing helper ─────────────────────────────────────────────────────

/**
 * Reads the response body as JSON, with two extra safety checks:
 *   1. Verifies the Content-Type is application/json (not an HTML error page).
 *   2. Catches JSON.parse failures and throws a useful error instead.
 *
 * The generic <T> lets TypeScript know what shape to expect from the caller.
 */
async function parseJson<T>(response: Response, context: string): Promise<T> {
  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) {
    // The server returned HTML (e.g. a 502 gateway error page) or plain text.
    // Log a preview so it is easy to diagnose.
    const bodyPreview = (await response.text().catch(() => '')).slice(0, 200)
    console.error(
      `[api] ${context} returned non-JSON content-type "${contentType}"`,
      bodyPreview,
    )
    throw new Error('Expected JSON response from API')
  }

  try {
    return (await response.json()) as T
  } catch (error) {
    console.error(`[api] ${context} returned invalid JSON`, error)
    throw new Error('Invalid JSON response from API')
  }
}

// ─── Shared GET helper ───────────────────────────────────────────────────────

/**
 * Makes an authenticated-less GET request and returns the parsed JSON body.
 * Used by all the public read endpoints (profile, projects, skills, etc.).
 */
async function readJson<T>(path: string): Promise<T> {
  const requestPath = withApiBase(path)
  console.info(`[api] GET ${requestPath}`)
  const response = await fetchWithTimeout(requestPath)

  if (!response.ok) {
    console.error(`[api] GET ${requestPath} failed with status ${response.status}`)
    throw new Error(`Request failed: ${response.status}`)
  }

  console.info(`[api] GET ${requestPath} ok`)
  return parseJson<T>(response, `GET ${requestPath}`)
}

// ─── Shared POST helper ──────────────────────────────────────────────────────

/**
 * Extracts a human-readable message from a JSON error body.
 * If the body is missing or doesn't have a `message` field, returns the fallback.
 */
function extractErrorMessage(errorBody: unknown, fallback: string) {
  if (errorBody && typeof errorBody === 'object' && 'message' in errorBody) {
    const message = errorBody.message

    if (typeof message === 'string' && message.trim()) {
      return message
    }
  }

  return fallback
}

/**
 * Sends a JSON POST request and returns the parsed response body.
 *
 * Both submitContact and submitTestimonial use this to avoid duplicating fetch
 * logic.  The generic <T> describes what the server sends back.
 */
async function postJson<T>(path: string, payload: unknown): Promise<T> {
  const requestPath = withApiBase(path)
  console.info(`[api] POST ${requestPath}`)

  const response = await fetchWithTimeout(requestPath, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // JSON.stringify converts the JS object into a string the server can parse.
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    // Try to read the error message the server sent back, otherwise use a generic fallback.
    const errorBody = (await response.json().catch(() => null)) as
      | { message?: string }
      | null

    console.error(`[api] POST ${requestPath} failed with status ${response.status}`)
    throw new Error(extractErrorMessage(errorBody, `Request failed: ${response.status}`))
  }

  console.info(`[api] POST ${requestPath} ok`)
  return parseJson<T>(response, `POST ${requestPath}`)
}

// ─── Public fetch helpers ────────────────────────────────────────────────────
// These are what the rest of the app imports and calls.
// They are thin wrappers so that callers don't need to know the URL structure.

/** Checks whether the API server is reachable and returns version/status info. */
export function fetchHealth() {
  return readJson<ApiHealth>('/api/health')
}

/** Returns the profile content (name, bio, links, timeline, etc.). */
export function fetchProfile() {
  return readJson<ProfileContent>('/api/profile')
}

/** Returns the list of project case studies. */
export function fetchProjects() {
  return readJson<ProjectSummary[]>('/api/projects')
}

/** Returns the skill groups shown on the Skills page. */
export function fetchSkills() {
  return readJson<SkillGroup[]>('/api/skills')
}

/** Returns approved testimonials shown on the Home page. */
export function fetchTestimonials() {
  return readJson<Testimonial[]>('/api/testimonials')
}

/**
 * Submits the contact form.
 * The server validates the data, stores it, and fires an email notification.
 * Returns a confirmation message shown to the visitor.
 */
export function submitContact(payload: ContactSubmissionInput) {
  return postJson<ContactSubmissionResult>('/api/contact', payload)
}

/**
 * Submits a testimonial for review.
 * It goes into a moderation queue — the admin must approve it before it appears
 * publicly on the site.
 */
export function submitTestimonial(payload: TestimonialSubmissionInput) {
  return postJson<TestimonialSubmissionResult>('/api/testimonials', payload)
}
