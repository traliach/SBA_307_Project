import type { RequestHandler } from 'express'
import { verifyAdminToken } from '../utils/admin-auth.js'
import { extractAdminSessionToken } from '../utils/admin-session.js'

export interface AuthenticatedAdminRequest extends Express.Request {
  admin?: {
    email: string
    role: 'admin'
  }
}

// Require a Bearer token for admin-only routes.
export const requireAdminAuth: RequestHandler = (request, response, next) => {
  const token = extractAdminSessionToken(request)

  if (!token) {
    response.status(401).json({
      message: 'Missing admin authorization token.',
    })
    return
  }

  try {
    const payload = verifyAdminToken(token)

    ;(request as AuthenticatedAdminRequest).admin = {
      email: payload.sub,
      role: payload.role,
    }

    next()
  } catch {
    response.status(401).json({
      message: 'Invalid or expired admin token.',
    })
  }
}
