import crypto from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

function encodeBase32(buffer) {
  let bits = ''

  for (const byte of buffer) {
    bits += byte.toString(2).padStart(8, '0')
  }

  let output = ''

  for (let offset = 0; offset < bits.length; offset += 5) {
    const chunk = bits.slice(offset, offset + 5).padEnd(5, '0')
    output += BASE32_ALPHABET[Number.parseInt(chunk, 2)]
  }

  return output
}

function generateRecoveryCode() {
  return crypto
    .randomBytes(6)
    .toString('base64url')
    .replace(/[^A-Z0-9]/gi, '')
    .slice(0, 12)
    .toUpperCase()
    .match(/.{1,4}/g)
    ?.join('-') ?? ''
}

function normalizeRecoveryCode(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

function hashRecoveryCode(value) {
  return crypto
    .createHash('sha256')
    .update(normalizeRecoveryCode(value))
    .digest('hex')
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(scriptDir, '..', '.env')

dotenv.config({ path: envPath })

const issuer = process.env.ADMIN_MFA_ISSUER || 'Resume Platform Admin'
const accountName = process.env.ADMIN_EMAIL || 'admin@example.com'
const secret = encodeBase32(crypto.randomBytes(20))
const label = `${issuer}:${accountName}`
const otpAuthUrl = `otpauth://totp/${encodeURIComponent(
  label,
)}?secret=${secret}&issuer=${encodeURIComponent(
  issuer,
)}&algorithm=SHA1&digits=6&period=30`
const recoveryCodes = Array.from({ length: 6 }, () => generateRecoveryCode())
const recoveryCodeHashes = recoveryCodes.map(hashRecoveryCode)

console.log('Add this to server/.env:')
console.log(`ADMIN_MFA_SECRET=${secret}`)
console.log(`ADMIN_MFA_RECOVERY_CODE_HASHES=${recoveryCodeHashes.join(',')}`)
console.log('')
console.log('Manual authenticator app setup:')
console.log(`Account: ${accountName}`)
console.log(`Issuer: ${issuer}`)
console.log(`Secret: ${secret}`)
console.log('')
console.log('Store these recovery codes somewhere safe:')
for (const code of recoveryCodes) {
  console.log(`- ${code}`)
}
console.log('')
console.log('otpauth URL:')
console.log(otpAuthUrl)
