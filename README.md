![Build](https://img.shields.io/github/actions/workflow/status/traliach/achille.dev/ci.yml?branch=main&style=flat-square)
![License](https://img.shields.io/github/license/traliach/achille.dev?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/traliach/achille.dev?style=flat-square)
![Deployments](https://img.shields.io/github/deployments/traliach/achille.dev/production?style=flat-square&label=production)

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-844FBA?style=flat-square&logo=terraform&logoColor=white)
[![Live](https://img.shields.io/badge/live-achille.tech-000?style=flat-square&logo=vercel)](https://achille.tech)


# achille.tech

Personal portfolio platform — public-facing site with an admin dashboard for managing all content live, without touching the codebase.

**Live at [achille.tech](https://achille.tech)**
API on Render · Database on MongoDB Atlas · Infrastructure provisioned with Terraform

---

## Architecture

```
Browser
  │
  ├── achille.tech (Vercel CDN)
  │     React 19 + TypeScript + Vite + Tailwind CSS
  │     └── /api/* proxied to Render
  │
  └── resume-platform-api.onrender.com (Render Web Service)
        Node.js + Express + TypeScript
        └── MongoDB Atlas M0 (AWS us-east-1)
              provisioned via Terraform (mongodbatlas provider)
```

CI/CD flow on every push to `main`:

```
push → GitHub Actions
         ├── server   (TypeScript build + smoke tests)   ─┐
         ├── client   (ESLint + Vite build)               ├─ parallel
         └── audit    (npm audit --audit-level=high)      ─┘
                 │
                 └── deploy (only if all three pass)
                       ├── POST Render deploy hook
                       └── poll GET /api/health until 200
                             (Vercel deploys automatically on same push)
```

---

## Tech Stack

### Client (`client/`)
- React 19 with TypeScript and strict mode
- Vite for dev server and production builds
- Tailwind CSS v4 for styling
- React Router for client-side routing
- Vite proxy forwards `/api` to the local Express server during development — no env var needed locally

### Server (`server/`)
- Node.js with Express and TypeScript
- MongoDB via Mongoose for data persistence
- JWT authentication with httpOnly cookie sessions
- TOTP MFA using `otplib` — admin login requires a 6-digit code from Google Authenticator
- Zod for request validation
- Nodemailer for contact form email delivery (Gmail SMTP)

### Infrastructure (`infra/`)
- Terraform with the official `mongodbatlas` provider (v2.8.0)
- Provisions the Atlas project and an M0 free-tier replica set cluster on AWS us-east-1
- Service account authentication (client ID + secret) — no personal API keys
- State files and `.tfvars` are gitignored; keep them local or use remote state (S3, Terraform Cloud)
- IP allowlist managed separately through the Atlas CLI — not tracked in Terraform

### CI/CD (`.github/workflows/ci.yml`)
- GitHub Actions on every push and pull request
- Four jobs: `server`, `client`, `audit` run in parallel — `deploy` gates on all three
- Deploy triggers a Render webhook then health-checks the API before marking success
- Vercel picks up the same push automatically via its GitHub integration
- Node.js 24 throughout (`FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true`)

### Security
- Admin session uses an httpOnly, SameSite=Strict cookie — no tokens in localStorage
- TOTP MFA with recovery codes (hashed with bcrypt, stored as env vars)
- CORS locked to `CLIENT_ORIGIN` — only the production Vercel URL is accepted
- `npm audit` runs on every push and blocks deploy on high or critical findings

---

## Local Development

Install from the repo root:

```bash
npm install
```

Start the API (port 4000):

```bash
cd server
npm run dev
```

Start the client (port 5173) in a separate terminal:

```bash
cd client
npm run dev
```

The Vite proxy forwards `/api` requests to `http://localhost:4000`, so `VITE_API_BASE_URL` does not need to be set locally.

---

## Environment Variables

```bash
cp server/.env.example server/.env
```

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://...
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=strong-password
JWT_SECRET=long-random-string
JWT_EXPIRES_IN=12h
ADMIN_MFA_SECRET=
ADMIN_MFA_RECOVERY_CODE_HASHES=
ADMIN_MFA_ISSUER=achille.tech Admin
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-app-password
```

For production, set `VITE_API_BASE_URL` in Vercel environment variables:

```env
VITE_API_BASE_URL=https://resume-platform-api.onrender.com
```

---

## MFA Setup

Run once before the first production deploy:

```bash
npm --workspace server run admin:mfa:setup
```

This prints the `ADMIN_MFA_SECRET`, `ADMIN_MFA_RECOVERY_CODE_HASHES`, and an `otpauth://` URI. Scan the URI in Google Authenticator (or Authy, 1Password, etc.). Store recovery codes offline — never in the repo.

To print the current 6-digit code during local testing:

```bash
npm --workspace server run admin:mfa:code
```

---

## Commands

From the repo root:

```bash
npm run dev:client        # client dev server
npm run dev:server        # API dev server
npm run build:client      # Vite production build
npm run build:server      # TypeScript compile
npm run lint:client       # ESLint
npm run test:server       # build + smoke tests
npm run ci                # full check (server + client + audit)
```

From `server/`:

```bash
npm run admin:login       # print a JWT for API testing (curl, Postman)
npm run admin:mfa:setup   # generate MFA secret + recovery codes
npm run admin:mfa:code    # print current TOTP code
npm run content:reset     # reset DB to seed data
```

---

## Tests

Smoke tests cover the critical server paths without requiring a live database:

- `GET /api/health`
- Admin login — success, wrong password, missing MFA
- Session check after login
- Admin route guard (401 without valid session)
- Public testimonial submission with MongoDB unavailable

```bash
cd server
npm run test
```

---

## Infrastructure (Terraform)

The `infra/` directory manages the MongoDB Atlas project and cluster. Requires Terraform CLI and a MongoDB Atlas service account.

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars
# fill in atlas_org_id, MONGODB_ATLAS_CLIENT_ID, MONGODB_ATLAS_CLIENT_SECRET
terraform init
terraform plan
terraform apply
```

To add your local IP to the Atlas allowlist temporarily:

```bash
atlas accessLists create --currentIp --projectId YOUR_PROJECT_ID
```

The cluster has `prevent_destroy = true` on the Terraform lifecycle to guard against accidental teardown.

---

## Deployment

### GitHub Secrets (required for CI/CD)

| Secret | Where to get it |
|--------|----------------|
| `RENDER_DEPLOY_HOOK` | Render → service → Settings → Deploy Hook |
| `RENDER_SERVICE_URL` | Your Render service URL, e.g. `https://resume-platform-api.onrender.com` |

### Render (API)

- Root Directory: `server`
- Build Command: `npm ci && npm run build`
- Start Command: `npm run start`
- Health Check Path: `/api/health`

Set all server env vars. Set `CLIENT_ORIGIN` to the exact production URL — the admin cookie will be rejected otherwise.

### Vercel (Client)

- Root Directory: `client`
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment variable: `VITE_API_BASE_URL` → Render API URL

### First deploy order

1. Deploy Render, confirm `GET /api/health` returns `{"status":"ok"}`
2. Deploy Vercel, copy the production URL
3. Set `CLIENT_ORIGIN` in Render env vars to the Vercel URL
4. Redeploy Render
5. Run `admin:mfa:setup`, set `ADMIN_MFA_SECRET` and `ADMIN_MFA_RECOVERY_CODE_HASHES` in Render
6. Redeploy Render, test admin login at `/admin`

### Rollback

- **Vercel** — Deployments tab → redeploy any previous build instantly
- **Render** — roll back to a previous deploy or push a revert commit
- **MFA loss** — use a recovery code; if all are gone, rerun `admin:mfa:setup`, update the two MFA env vars in Render, redeploy

---

## Admin Panel

The dashboard is at `/admin`. Session is managed with a secure httpOnly cookie — nothing is stored in localStorage.

For API testing outside the browser:

```bash
cd server
npm run admin:login
# use the printed JWT as: Authorization: Bearer <token>
```
MIT License

Copyright (c) 2025 Achille Traore

Permission is hereby granted, free of charge, to any person obtaining a copy...