import type { Request, Response } from 'express'

const IP_WINDOW_MS = 15 * 60 * 1000
const EMAIL_WINDOW_MS = 60 * 60 * 1000
const MAX_IP_SUBMISSIONS = 5
const MAX_EMAIL_SUBMISSIONS = 3

type RateLimitBucket = {
  count: number
  resetAt: number
}

const submissionBuckets = new Map<string, RateLimitBucket>()

function cleanupExpiredBuckets(now: number) {
  for (const [key, bucket] of submissionBuckets.entries()) {
    if (bucket.resetAt <= now) {
      submissionBuckets.delete(key)
    }
  }
}

function normalizeKeyPart(value: string) {
  return value.trim().toLowerCase()
}

function getClientIp(request: Request) {
  return request.ip ?? request.socket.remoteAddress ?? 'unknown'
}

function getRetryAfterSeconds(bucket: RateLimitBucket, now: number) {
  return Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))
}

function checkBucket(
  key: string,
  maxSubmissions: number,
  windowMs: number,
  now: number,
) {
  const bucket = submissionBuckets.get(key)

  if (bucket && bucket.resetAt > now && bucket.count >= maxSubmissions) {
    return {
      allowed: false as const,
      retryAfterSeconds: getRetryAfterSeconds(bucket, now),
    }
  }

  if (!bucket || bucket.resetAt <= now) {
    submissionBuckets.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })
  } else {
    submissionBuckets.set(key, {
      ...bucket,
      count: bucket.count + 1,
    })
  }

  return {
    allowed: true as const,
    retryAfterSeconds: 0,
  }
}

export function isSpamTrapFilled(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0
}

export function acceptSpamTrapSubmission(response: Response, message: string) {
  response.status(202).json({
    message,
  })
}

export function enforcePublicSubmissionRateLimit(
  request: Request,
  response: Response,
  options: {
    scope: string
    email: string
  },
) {
  const now = Date.now()
  cleanupExpiredBuckets(now)

  const checks = [
    {
      key: `${options.scope}:ip:${normalizeKeyPart(getClientIp(request))}`,
      maxSubmissions: MAX_IP_SUBMISSIONS,
      windowMs: IP_WINDOW_MS,
    },
    {
      key: `${options.scope}:email:${normalizeKeyPart(options.email)}`,
      maxSubmissions: MAX_EMAIL_SUBMISSIONS,
      windowMs: EMAIL_WINDOW_MS,
    },
  ]

  for (const check of checks) {
    const result = checkBucket(
      check.key,
      check.maxSubmissions,
      check.windowMs,
      now,
    )

    if (!result.allowed) {
      response.setHeader('Retry-After', String(result.retryAfterSeconds))
      response.status(429).json({
        message: 'Too many submissions. Please try again later.',
      })
      return false
    }
  }

  return true
}
