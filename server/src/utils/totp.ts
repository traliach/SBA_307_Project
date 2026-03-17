import crypto from 'node:crypto'

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
const TOTP_STEP_SECONDS = 30
const TOTP_DIGITS = 6

function normalizeBase32(value: string) {
  return value.toUpperCase().replace(/[^A-Z2-7]/g, '')
}

function decodeBase32(value: string) {
  const normalized = normalizeBase32(value)
  let bits = ''

  for (const character of normalized) {
    const alphabetIndex = BASE32_ALPHABET.indexOf(character)

    if (alphabetIndex === -1) {
      throw new Error('Invalid TOTP secret encoding.')
    }

    bits += alphabetIndex.toString(2).padStart(5, '0')
  }

  const bytes: number[] = []

  for (let offset = 0; offset + 8 <= bits.length; offset += 8) {
    bytes.push(Number.parseInt(bits.slice(offset, offset + 8), 2))
  }

  return Buffer.from(bytes)
}

function encodeBase32(buffer: Buffer) {
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

function generateTotp(secret: string, timestampMs: number) {
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

export function generateTotpSecret() {
  return encodeBase32(crypto.randomBytes(20))
}

export function createOtpAuthUrl({
  accountName,
  issuer,
  secret,
}: {
  accountName: string
  issuer: string
  secret: string
}) {
  const label = `${issuer}:${accountName}`

  return `otpauth://totp/${encodeURIComponent(label)}?secret=${secret}&issuer=${encodeURIComponent(
    issuer,
  )}&algorithm=SHA1&digits=${TOTP_DIGITS}&period=${TOTP_STEP_SECONDS}`
}

export function verifyTotpCode(secret: string, code: string, window = 1) {
  const normalizedCode = code.trim()

  if (!/^\d{6}$/.test(normalizedCode)) {
    return false
  }

  const now = Date.now()

  for (let offset = -window; offset <= window; offset += 1) {
    const expectedCode = generateTotp(
      secret,
      now + offset * TOTP_STEP_SECONDS * 1000,
    )

    if (expectedCode === normalizedCode) {
      return true
    }
  }

  return false
}
