import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { z } from 'zod'
import { logWarn } from '../utils/logger.js'

const envPath = path.resolve(process.cwd(), '.env')
const envFileExists = fs.existsSync(envPath)

dotenv.config({ path: envPath })

// Surface common local env mistakes before the app reaches runtime code.
if (!process.env.MONGODB_URI && envFileExists) {
  const envFileContents = fs.readFileSync(envPath, 'utf8')

  if (/^\s*MONGODB_URI\s*:/m.test(envFileContents)) {
    logWarn('Malformed MONGODB_URI entry in .env. Use MONGODB_URI=... instead of MONGODB_URI :...')
  } else if (/^\s*MONGODB_URI\s*=/m.test(envFileContents)) {
    logWarn('MONGODB_URI is present in .env but did not load into process.env.')
  } else {
    logWarn('MONGODB_URI entry was not found in .env.')
  }
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),
  ADMIN_EMAIL: z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim().length === 0 ? undefined : value,
    z.string().email().optional(),
  ),
  ADMIN_PASSWORD: z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim().length === 0 ? undefined : value,
    z.string().min(8).optional(),
  ),
  JWT_SECRET: z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim().length === 0 ? undefined : value,
    z.string().min(16).optional(),
  ),
  JWT_EXPIRES_IN: z.string().default('12h'),
  ADMIN_MFA_SECRET: z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim().length === 0 ? undefined : value,
    z.string().min(16).optional(),
  ),
  ADMIN_MFA_ISSUER: z.string().default('Resume Platform Admin'),
  MONGODB_URI: z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim().length === 0 ? undefined : value,
    z.string().min(1).optional(),
  ),
})

export const env = envSchema.parse(process.env)
