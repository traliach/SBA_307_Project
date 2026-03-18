const MAX_FAILED_ATTEMPTS = 8
const WINDOW_MS = 10 * 60 * 1000

type RateLimitEntry = {
  count: number
  resetAt: number
}

const failedAttempts = new Map<string, RateLimitEntry>()

function cleanupExpiredEntries(now: number) {
  for (const [key, entry] of failedAttempts.entries()) {
    if (entry.resetAt <= now) {
      failedAttempts.delete(key)
    }
  }
}

export function createAdminLoginRateLimitKey(ipAddress: string, email: string) {
  return `${ipAddress.toLowerCase()}::${email.trim().toLowerCase()}`
}

export function getAdminLoginRetryAfterSeconds(key: string, now = Date.now()) {
  cleanupExpiredEntries(now)
  const entry = failedAttempts.get(key)

  if (!entry || entry.count < MAX_FAILED_ATTEMPTS || entry.resetAt <= now) {
    return 0
  }

  return Math.ceil((entry.resetAt - now) / 1000)
}

export function registerAdminLoginFailure(key: string, now = Date.now()) {
  cleanupExpiredEntries(now)
  const entry = failedAttempts.get(key)

  if (!entry || entry.resetAt <= now) {
    failedAttempts.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    })
    return
  }

  failedAttempts.set(key, {
    count: entry.count + 1,
    resetAt: entry.resetAt,
  })
}

export function clearAdminLoginFailures(key: string) {
  failedAttempts.delete(key)
}
