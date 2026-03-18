import { Router } from 'express'
import { z } from 'zod'
import { env } from '../../config/env.js'
import { requireAdminAuth } from '../../middleware/require-admin-auth.js'
import { logInfo, logWarn } from '../../utils/logger.js'
import {
  clearAdminLoginFailures,
  createAdminLoginRateLimitKey,
  getAdminLoginRetryAfterSeconds,
  registerAdminLoginFailure,
} from '../../utils/admin-login-rate-limit.js'
import {
  createAdminToken,
  hasAdminMfaRecoveryCodes,
  isAdminAuthConfigured,
  isAdminMfaEnabled,
  validateAdminRecoveryCode,
  validateAdminMfaCode,
  validateAdminCredentials,
} from '../../utils/admin-auth.js'
import {
  clearAdminSessionCookie,
  setAdminSessionCookie,
} from '../../utils/admin-session.js'

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
  mfaCode: z.string().trim().regex(/^\d{6}$/).optional(),
  mfaRecoveryCode: z.string().trim().min(8).optional(),
  rememberSession: z.boolean().optional(),
})

export const authRouter = Router()

authRouter.post('/login', (request, response) => {
  if (!isAdminAuthConfigured()) {
    response.status(503).json({
      message: 'Admin authentication is not configured on this server.',
    })
    return
  }

  const result = loginSchema.safeParse(request.body)

  if (!result.success) {
    response.status(400).json({
      message: 'Please provide a valid admin email and password.',
      issues: result.error.flatten(),
    })
    return
  }

  const rateLimitKey = createAdminLoginRateLimitKey(
    request.ip ?? 'unknown',
    result.data.email,
  )
  const retryAfterSeconds = getAdminLoginRetryAfterSeconds(rateLimitKey)

  if (retryAfterSeconds > 0) {
    response.setHeader('Retry-After', String(retryAfterSeconds))
    response.status(429).json({
      message: 'Too many failed admin login attempts. Please try again shortly.',
    })
    return
  }

  if (!validateAdminCredentials(result.data.email, result.data.password)) {
    registerAdminLoginFailure(rateLimitKey)
    logWarn(`Rejected admin login attempt for ${result.data.email}.`)
    response.status(401).json({
      message: 'Invalid admin credentials.',
    })
    return
  }

  if (isAdminMfaEnabled()) {
    if (result.data.mfaRecoveryCode) {
      if (!validateAdminRecoveryCode(result.data.mfaRecoveryCode)) {
        registerAdminLoginFailure(rateLimitKey)
        logWarn(`Rejected admin MFA recovery attempt for ${result.data.email}.`)
        response.status(401).json({
          message: 'Invalid MFA recovery code.',
        })
        return
      }
    } else {
      if (!result.data.mfaCode) {
        response.status(400).json({
          message: 'MFA code is required for admin login.',
        })
        return
      }

      if (!validateAdminMfaCode(result.data.mfaCode)) {
        registerAdminLoginFailure(rateLimitKey)
        logWarn(`Rejected admin MFA attempt for ${result.data.email}.`)
        response.status(401).json({
          message: 'Invalid MFA code.',
        })
        return
      }
    }
  }

  clearAdminLoginFailures(rateLimitKey)
  logInfo(`Admin login succeeded for ${result.data.email}.`)

  const token = createAdminToken()
  setAdminSessionCookie(response, token, result.data.rememberSession ?? false)

  response.json({
    token,
    expiresIn: env.JWT_EXPIRES_IN,
    mfaEnabled: isAdminMfaEnabled(),
    mfaRecoveryEnabled: hasAdminMfaRecoveryCodes(),
  })
})

authRouter.post('/logout', (_request, response) => {
  clearAdminSessionCookie(response)
  response.status(204).end()
})

authRouter.get('/session', requireAdminAuth, (request, response) => {
  const admin = request as import('../../middleware/require-admin-auth.js').AuthenticatedAdminRequest

  response.json({
    authenticated: true,
    admin: admin.admin ?? null,
    mfaEnabled: isAdminMfaEnabled(),
    mfaRecoveryEnabled: hasAdminMfaRecoveryCodes(),
  })
})
