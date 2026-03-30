/**
 * env.ts — Environment variable loader and validator
 *
 * All configuration the server needs (ports, secrets, database URL, SMTP
 * credentials, etc.) lives in environment variables so that the same code
 * can run safely in development, staging, and production without any changes.
 *
 * On a local machine those variables come from the .env file in the server
 * folder.  On Render (our hosting provider) they are set in the dashboard.
 *
 * We use the `zod` library to describe exactly what each variable must look
 * like.  If something is missing or has the wrong format the app crashes on
 * startup with a clear message instead of failing silently later.
 */

import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { z } from 'zod'
import { logWarn } from '../utils/logger.js'

// Build the absolute path to the .env file sitting next to where the process
// was started (normally the server/ folder).
const envPath = path.resolve(process.cwd(), '.env')
const envFileExists = fs.existsSync(envPath)

// dotenv reads the .env file and copies each KEY=VALUE line into process.env
// so that the rest of the application can access them via process.env.KEY.
dotenv.config({ path: envPath })

// ─── Early warning for the most common local dev mistake ────────────────────
// If the .env file exists but MONGODB_URI never made it into process.env,
// check whether the developer used a colon instead of an equals sign.
// This saves a lot of head-scratching during first-time setup.
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

// ─── Zod schema ─────────────────────────────────────────────────────────────
// Each field below describes one environment variable.
//
// z.string()         → must be a string
// .default('...')    → use this value when the variable is absent
// .optional()        → the variable is allowed to be absent
// z.coerce.number()  → parse the string "4000" into the number 4000
// z.preprocess(...)  → run a transform before Zod validates the value
//
// The preprocess trick below converts an empty string ("") to `undefined`
// so that an accidentally blank variable is treated the same as a missing one.
const envSchema = z.object({
  // Controls which code branches run (logging verbosity, error detail, etc.)
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  // The TCP port the Express server listens on.
  PORT: z.coerce.number().int().positive().default(4000),

  // The URL the React client is served from.  Used in the CORS policy so the
  // browser knows it is allowed to call our API from that origin.
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),

  // Optional secondary origin allowed by CORS — used for resume.achille.tech
  // hosted on AWS CloudFront while the primary client stays on Vercel.
  CLIENT_ORIGIN_SECONDARY: z.string().optional(),

  // Admin login credentials.  These are optional so the server starts even
  // without them — the admin panel will simply be unavailable.
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

  // Secret used to sign JSON Web Tokens.  Whoever holds this string can forge
  // admin sessions, so it must be long and random and never committed to Git.
  JWT_SECRET: z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim().length === 0 ? undefined : value,
    z.string().min(16).optional(),
  ),

  // How long a JWT stays valid before the admin has to log in again.
  JWT_EXPIRES_IN: z.string().default('12h'),

  // Base-32 secret used by the TOTP authenticator app (e.g. Google Authenticator).
  ADMIN_MFA_SECRET: z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim().length === 0 ? undefined : value,
    z.string().min(16).optional(),
  ),

  // Comma-separated bcrypt hashes of single-use MFA recovery codes.
  ADMIN_MFA_RECOVERY_CODE_HASHES: z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim().length === 0 ? undefined : value,
    z.string().optional(),
  ),

  // The name shown inside the authenticator app next to the TOTP entry.
  ADMIN_MFA_ISSUER: z.string().default('Resume Platform Admin'),

  // MongoDB Atlas connection string.  Optional — the app falls back to a local
  // JSON file when this is absent (useful for development without a database).
  MONGODB_URI: z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim().length === 0 ? undefined : value,
    z.string().min(1).optional(),
  ),

  // ─── SMTP / email settings ─────────────────────────────────────────────
  // These are used by the mailer utility to send contact-form notifications.
  // If SMTP_USER or SMTP_PASS are absent the mailer is silently disabled.

  SMTP_HOST: z.string().default('smtp.gmail.com'),
  // Port 587 uses STARTTLS (starts plain, upgrades to encrypted).
  // Port 465 uses implicit TLS (encrypted from the first byte).
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim().length === 0 ? undefined : value,
    z.string().email().optional(),
  ),
  SMTP_PASS: z.preprocess(
    (value) =>
      typeof value === 'string' && value.trim().length === 0 ? undefined : value,
    z.string().min(1).optional(),
  ),
})

// Parse (and validate) process.env right now, at module load time.
// If anything is wrong, Zod throws a descriptive error that halts the server
// before it has a chance to do anything dangerous with bad configuration.
export const env = envSchema.parse(process.env)
