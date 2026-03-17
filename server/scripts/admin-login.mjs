import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(scriptDir, '..', '.env')

dotenv.config({ path: envPath })

const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD
const mfaCode = process.env.ADMIN_MFA_CODE
const port = process.env.PORT ?? '4000'

if (!email || !password) {
  console.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in server/.env')
  process.exit(1)
}

// Reuse the configured local admin credentials to fetch a fresh JWT on demand.
const response = await fetch(`http://localhost:${port}/api/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email,
    password,
    ...(mfaCode ? { mfaCode } : {}),
  }),
})

const data = await response.json().catch(() => null)

if (!response.ok || !data || typeof data.token !== 'string') {
  console.error('Admin login failed.')

  if (data) {
    console.error(JSON.stringify(data, null, 2))
  }

  process.exit(1)
}

console.log(`Token expires in: ${data.expiresIn}`)
console.log('')
console.log(data.token)
console.log('')
console.log('Example:')
console.log(`curl http://localhost:${port}/api/admin/projects -H "Authorization: Bearer ${data.token}"`)
