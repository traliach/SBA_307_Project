import assert from 'node:assert/strict'
import process from 'node:process'

process.env.NODE_ENV = 'test'
process.env.CLIENT_ORIGIN = 'http://localhost:5173'
process.env.ADMIN_EMAIL = 'admin@example.com'
process.env.ADMIN_PASSWORD = 'change-me-now-123'
process.env.JWT_SECRET = 'test-secret-value-should-be-long-enough'
process.env.JWT_EXPIRES_IN = '12h'
process.env.ADMIN_MFA_SECRET = ''

const { app } = await import('../dist/app.js')

const server = await new Promise((resolve, reject) => {
  const nextServer = app.listen(0, '127.0.0.1', () => resolve(nextServer))
  nextServer.on('error', reject)
})

const address = server.address()

if (!address || typeof address === 'string') {
  throw new Error('Unable to determine smoke-test server address.')
}

const baseUrl = `http://127.0.0.1:${address.port}`

async function request(path, init) {
  const response = await fetch(`${baseUrl}${path}`, init)
  const contentType = response.headers.get('content-type') ?? ''
  const body = contentType.includes('application/json')
    ? await response.json()
    : null
  return { response, body }
}

try {
  const health = await request('/api/health')
  assert.equal(health.response.status, 200)
  assert.equal(health.body.service, 'resume-platform-api')
  assert.equal(health.body.status, 'ok')

  const invalidLogin = await request('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'admin@example.com',
      password: 'wrong-password',
    }),
  })
  assert.equal(invalidLogin.response.status, 401)
  assert.equal(invalidLogin.body.message, 'Invalid admin credentials.')

  const login = await request('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'admin@example.com',
      password: 'change-me-now-123',
    }),
  })
  assert.equal(login.response.status, 200)
  assert.ok(login.body.token)
  assert.equal(login.body.expiresIn, '12h')
  assert.equal(login.body.mfaEnabled, false)
  const adminSessionCookie = login.response.headers.get('set-cookie')
  assert.ok(adminSessionCookie?.includes('resume_admin_session='))

  const session = await request('/api/auth/session', {
    headers: {
      Cookie: adminSessionCookie,
    },
  })
  assert.equal(session.response.status, 200)
  assert.equal(session.body.authenticated, true)
  assert.equal(session.body.admin.email, 'admin@example.com')
  assert.equal(session.body.admin.role, 'admin')

  const noTokenAdmin = await request('/api/admin/projects')
  assert.equal(noTokenAdmin.response.status, 401)
  assert.equal(noTokenAdmin.body.message, 'Missing admin authorization token.')

  const authedAdmin = await request('/api/admin/projects', {
    headers: {
      Authorization: `Bearer ${login.body.token}`,
    },
  })
  assert.equal(authedAdmin.response.status, 503)
  assert.equal(authedAdmin.body.message, 'Database is not ready yet.')

  const logout = await request('/api/auth/logout', {
    method: 'POST',
    headers: {
      Cookie: adminSessionCookie,
    },
  })
  assert.equal(logout.response.status, 204)

  const testimonialSubmission = await request('/api/testimonials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quote: 'Ali brought a measurable improvement to our release process and cloud delivery.',
      author: 'Test Person',
      email: 'test@example.com',
      role: 'Engineering Manager',
      company: 'Example Co',
    }),
  })
  assert.equal(testimonialSubmission.response.status, 503)
  assert.equal(
    testimonialSubmission.body.message,
    'Testimonials are temporarily unavailable for submission.',
  )

  console.log('Server smoke tests passed.')
} finally {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error)
        return
      }

      resolve()
    })
  })
}
