# Resume Platform

Full-stack personal portfolio platform built with:

- `client/`: React + TypeScript + Vite
- `server/`: Express + TypeScript + MongoDB Atlas
- `infra/`: Terraform-first Atlas foundation

## Current Scope

The app currently includes:

- public portfolio pages at `/`, `/about`, `/projects`, `/skills`, and `/contact`
- public testimonial submission into a moderation queue
- admin panel at `/admin`
- JWT-based admin auth with optional MFA
- Mongo-backed content storage for profile, projects, skills, testimonials, and contact submissions

## Local Development

Install workspace dependencies once from the repo root:

```bash
npm install
```

Start the API:

```bash
cd server
npm run dev
```

Start the client:

```bash
cd client
npm run dev
```

## Environment Files

Server variables live in [`server/.env.example`](server/.env.example):

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-me-now-123
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=12h
ADMIN_MFA_SECRET=
ADMIN_MFA_RECOVERY_CODE_HASHES=
ADMIN_MFA_ISSUER=Resume Platform Admin
MONGODB_URI=mongodb+srv://...
```

Client variables live in [`client/.env.example`](client/.env.example):

```env
VITE_API_BASE_URL=http://localhost:4000
```

Leave `VITE_API_BASE_URL` unset locally if you want to use the Vite `/api` proxy. Set it in production when the client and server are deployed on different domains.

### MFA Setup

Generate the admin MFA secret and recovery codes from the server directory:

```bash
npm run admin:mfa:setup
```

That script prints:

- `ADMIN_MFA_SECRET`
- `ADMIN_MFA_RECOVERY_CODE_HASHES`
- the authenticator app `otpauth://` URL
- the plain-text recovery codes you should store offline

To print the current local 6-digit MFA code during testing:

```bash
npm run admin:mfa:code
```

## Commands

From the repo root:

```bash
npm run dev:client
npm run dev:server
npm run lint:client
npm run build:client
npm run build:server
npm run test:server
npm run ci
```

## Tests

The first server integration test suite covers key public/admin flows:

- `GET /api/health`
- admin login success/failure
- authenticated admin session check
- admin route auth/database guard behavior
- public testimonial submission behavior when Mongo is unavailable

Run it with:

```bash
cd server
npm run test
```

## CI Pipeline

GitHub Actions CI is defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

On every push to `main` and every pull request it runs:

1. `npm ci`
2. `npm run ci`

That workspace command performs:

- server build
- server tests
- client lint
- client build

## Deployment Setup

Detailed deployment and CI instructions are in [DEPLOYMENT_AND_CI_RUNBOOK.md](/C:/Users/trach/Documents/New%20project/SBA_307_Project/DEPLOYMENT_AND_CI_RUNBOOK.md).

### Server

The API deploy scaffold is in [`render.yaml`](render.yaml).

Recommended setup:

- deploy the server to Render
- point `CLIENT_ORIGIN` to the real client URL
- set `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`, `ADMIN_MFA_SECRET`, and `ADMIN_MFA_RECOVERY_CODE_HASHES`
- keep `CLIENT_ORIGIN` set to the exact deployed client origin so credentialed admin cookie requests are allowed
- because production admin auth now uses secure httpOnly cookies, production must run over HTTPS

### Client

The Vercel client config is in [`client/vercel.json`](client/vercel.json).

Recommended setup:

- deploy the `client` directory to Vercel
- set `VITE_API_BASE_URL` to your deployed API URL
- the rewrite rule sends clean public paths like `/about` and `/admin` back to `index.html`

## Terraform / Atlas

The `infra/` directory is intentionally limited to stable Atlas foundation pieces. Temporary roaming laptop IP access is handled outside Terraform.

Current infra scope:

- Atlas provider/version pinning
- Atlas project
- M0 cluster
- local helper docs for temporary Atlas access

## Admin Access

Use the admin helper from the server directory:

```bash
npm run admin:login
```

That prints a JWT you can use against `/api/admin/*` routes in Postman, Thunder Client, or `curl`.

The browser admin panel now uses an httpOnly cookie session instead of storing the admin JWT in `localStorage` or `sessionStorage`.

The browser admin panel is available at:

```text
http://localhost:5173/admin
```

## Production Notes

The current admin auth model is designed for a single-admin portfolio:

- email and password are server env credentials
- MFA is TOTP-based
- recovery codes are env-backed emergency access codes
- the browser uses a secure cookie session

Recommended pre-launch checklist:

1. Set strong values for `ADMIN_PASSWORD` and `JWT_SECRET`.
2. Run `npm run admin:mfa:setup` and store the recovery codes outside the repo.
3. Set the exact deployed client URL in `CLIENT_ORIGIN`.
4. Set `VITE_API_BASE_URL` in the deployed client to the real API URL.
5. Test `/admin` over the real production domains before going live.
