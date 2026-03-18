import type { CookieOptions, Request, Response } from 'express'
import { env } from '../config/env.js'

export const ADMIN_SESSION_COOKIE_NAME = 'resume_admin_session'

function parseDurationToMs(value: string) {
  const match = /^(\d+)(ms|s|m|h|d)$/i.exec(value.trim())

  if (!match) {
    return 12 * 60 * 60 * 1000
  }

  const amount = Number.parseInt(match[1] ?? '12', 10)
  const unit = (match[2] ?? 'h').toLowerCase()

  switch (unit) {
    case 'ms':
      return amount
    case 's':
      return amount * 1000
    case 'm':
      return amount * 60 * 1000
    case 'h':
      return amount * 60 * 60 * 1000
    case 'd':
      return amount * 24 * 60 * 60 * 1000
    default:
      return 12 * 60 * 60 * 1000
  }
}

function parseCookies(request: Request) {
  const cookieHeader = request.get('cookie')

  if (!cookieHeader) {
    return new Map<string, string>()
  }

  return cookieHeader.split(';').reduce<Map<string, string>>((cookies, entry) => {
    const [rawKey = '', ...rawValueParts] = entry.split('=')
    const key = rawKey.trim()
    const value = rawValueParts.join('=').trim()

    if (key) {
      cookies.set(key, decodeURIComponent(value))
    }

    return cookies
  }, new Map<string, string>())
}

export function extractAdminSessionToken(request: Request) {
  const authorization = request.get('authorization')

  if (authorization?.startsWith('Bearer ')) {
    return authorization.slice('Bearer '.length).trim()
  }

  return parseCookies(request).get(ADMIN_SESSION_COOKIE_NAME) ?? null
}

function buildAdminCookieOptions(rememberSession: boolean): CookieOptions {
  const baseOptions: CookieOptions = {
    httpOnly: true,
    path: '/',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: env.NODE_ENV === 'production',
  }

  if (rememberSession) {
    baseOptions.maxAge = parseDurationToMs(env.JWT_EXPIRES_IN)
  }

  return baseOptions
}

export function setAdminSessionCookie(
  response: Response,
  token: string,
  rememberSession: boolean,
) {
  response.cookie(
    ADMIN_SESSION_COOKIE_NAME,
    token,
    buildAdminCookieOptions(rememberSession),
  )
}

export function clearAdminSessionCookie(response: Response) {
  response.clearCookie(
    ADMIN_SESSION_COOKIE_NAME,
    buildAdminCookieOptions(false),
  )
}
