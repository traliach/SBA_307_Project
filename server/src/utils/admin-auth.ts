import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { verifyTotpCode } from './totp.js'

export interface AdminTokenPayload {
  sub: string
  role: 'admin'
}

export function isAdminAuthConfigured() {
  return Boolean(env.ADMIN_EMAIL && env.ADMIN_PASSWORD && env.JWT_SECRET)
}

export function isAdminMfaEnabled() {
  return Boolean(env.ADMIN_MFA_SECRET)
}

function compareSecret(input: string, expected: string) {
  const inputBuffer = Buffer.from(input)
  const expectedBuffer = Buffer.from(expected)

  if (inputBuffer.length !== expectedBuffer.length) {
    return false
  }

  return crypto.timingSafeEqual(inputBuffer, expectedBuffer)
}

// Keep admin auth simple for this single-admin app: env credentials plus a signed JWT.
export function validateAdminCredentials(email: string, password: string) {
  if (!isAdminAuthConfigured()) {
    return false
  }

  return (
    compareSecret(email, env.ADMIN_EMAIL!) &&
    compareSecret(password, env.ADMIN_PASSWORD!)
  )
}

export function createAdminToken() {
  if (!isAdminAuthConfigured()) {
    throw new Error('Admin authentication is not configured.')
  }

  return jwt.sign(
    { role: 'admin' },
    env.JWT_SECRET!,
    {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
      subject: env.ADMIN_EMAIL,
    },
  )
}

export function verifyAdminToken(token: string): AdminTokenPayload {
  if (!env.JWT_SECRET) {
    throw new Error('JWT secret is not configured.')
  }

  const payload = jwt.verify(token, env.JWT_SECRET)

  if (
    typeof payload !== 'object' ||
    payload === null ||
    payload.role !== 'admin' ||
    typeof payload.sub !== 'string'
  ) {
    throw new Error('Invalid admin token payload.')
  }

  return {
    sub: payload.sub,
    role: 'admin',
  }
}

export function validateAdminMfaCode(code: string) {
  if (!env.ADMIN_MFA_SECRET) {
    return true
  }

  return verifyTotpCode(env.ADMIN_MFA_SECRET, code)
}
