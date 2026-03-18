import crypto from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
const TOTP_STEP_SECONDS = 30
const TOTP_DIGITS = 6

function normalizeBase32(value) {
  return value.toUpperCase().replace(/[^A-Z2-7]/g, '')
}

function decodeBase32(value) {
  const normalized = normalizeBase32(value)
  let bits = ''

  for (const character of normalized) {
    const alphabetIndex = BASE32_ALPHABET.indexOf(character)

    if (alphabetIndex === -1) {
      throw new Error('Invalid TOTP secret encoding.')
    }

    bits += alphabetIndex.toString(2).padStart(5, '0')
  }

  const bytes = []

  for (let offset = 0; offset + 8 <= bits.length; offset += 8) {
    bytes.push(Number.parseInt(bits.slice(offset, offset + 8), 2))
  }

  return Buffer.from(bytes)
}

function generateTotp(secret, timestampMs) {
  const counter = Math.floor(timestampMs / 1000 / TOTP_STEP_SECONDS)
  const counterBuffer = Buffer.alloc(8)
  counterBuffer.writeBigUInt64BE(BigInt(counter))

  const hmac = crypto.createHmac('sha1', decodeBase32(secret))
  hmac.update(counterBuffer)

  const digest = hmac.digest()
  const offset = (digest[digest.length - 1] ?? 0) & 0x0f
  const code =
    (((digest[offset] ?? 0) & 0x7f) << 24) |
    (((digest[offset + 1] ?? 0) & 0xff) << 16) |
    (((digest[offset + 2] ?? 0) & 0xff) << 8) |
    ((digest[offset + 3] ?? 0) & 0xff)

  return String(code % 10 ** TOTP_DIGITS).padStart(TOTP_DIGITS, '0')
}

function getTotpSecondsRemaining(timestampMs = Date.now()) {
  const stepMs = TOTP_STEP_SECONDS * 1000
  return Math.ceil((stepMs - (timestampMs % stepMs)) / 1000)
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(scriptDir, '..', '.env')

dotenv.config({ path: envPath })

const secret = process.env.ADMIN_MFA_SECRET

if (!secret) {
  console.error('ADMIN_MFA_SECRET is not configured in server/.env')
  process.exit(1)
}

const code = generateTotp(secret, Date.now())
const secondsRemaining = getTotpSecondsRemaining()

console.log(`Current admin MFA code: ${code}`)
console.log(`Valid for about ${secondsRemaining} more second${secondsRemaining === 1 ? '' : 's'}.`)
