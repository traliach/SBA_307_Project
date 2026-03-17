import { Router } from 'express'
import { z } from 'zod'
import { env } from '../../config/env.js'
import { requireAdminAuth } from '../../middleware/require-admin-auth.js'
import { logInfo, logWarn } from '../../utils/logger.js'
import {
  createAdminToken,
  isAdminAuthConfigured,
  isAdminMfaEnabled,
  validateAdminMfaCode,
  validateAdminCredentials,
} from '../../utils/admin-auth.js'

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
  mfaCode: z.string().trim().regex(/^\d{6}$/).optional(),
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

  if (!validateAdminCredentials(result.data.email, result.data.password)) {
    logWarn(`Rejected admin login attempt for ${result.data.email}.`)
    response.status(401).json({
      message: 'Invalid admin credentials.',
    })
    return
  }

  if (isAdminMfaEnabled()) {
    if (!result.data.mfaCode) {
      response.status(400).json({
        message: 'MFA code is required for admin login.',
      })
      return
    }

    if (!validateAdminMfaCode(result.data.mfaCode)) {
      logWarn(`Rejected admin MFA attempt for ${result.data.email}.`)
      response.status(401).json({
        message: 'Invalid MFA code.',
      })
      return
    }
  }

  logInfo(`Admin login succeeded for ${result.data.email}.`)

  response.json({
    token: createAdminToken(),
    expiresIn: env.JWT_EXPIRES_IN,
    mfaEnabled: isAdminMfaEnabled(),
  })
})

authRouter.get('/session', requireAdminAuth, (request, response) => {
  const admin = request as import('../../middleware/require-admin-auth.js').AuthenticatedAdminRequest

  response.json({
    authenticated: true,
    admin: admin.admin ?? null,
    mfaEnabled: isAdminMfaEnabled(),
  })
})
