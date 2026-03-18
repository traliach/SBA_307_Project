# Deployment And CI Runbook

This is the production launch checklist for this repository.

It covers:

- Render deployment for the API
- Vercel deployment for the client
- production MFA with Google Authenticator
- GitHub Actions CI and branch protection
- smoke testing
- rollback

This runbook assumes the repo structure is:

- `client/`
- `server/`
- `infra/`

---

## 1. Production Model

Production is split across:

- `server/` on Render
- `client/` on Vercel
- MongoDB Atlas for persistence

Admin auth in the browser now uses a secure httpOnly cookie session. That means:

- the deployed client and API must both be on HTTPS
- `CLIENT_ORIGIN` must exactly match the deployed client origin
- admin login requires:
  - email
  - password
  - 6-digit TOTP code from Google Authenticator or another TOTP app

---

## 2. Pre-Launch Checklist

Run these locally before creating any production services:

```bash
git status
npm install
npm run ci
```

Do not deploy until `npm run ci` passes.

Before you open Render or Vercel, prepare these values in a secure note:

- MongoDB Atlas URI
- production admin email
- production admin password
- long random JWT secret
- generated MFA secret
- generated MFA recovery hashes
- plain-text MFA recovery codes

Do not commit any of these values to Git.

---

## 3. MFA Setup For Production

Yes, Google Authenticator will work.

This project uses standard TOTP, so Google Authenticator, Authy, 1Password, Microsoft Authenticator, and similar apps are compatible.

### Generate the MFA materials

From the repo root:

```bash
npm --workspace server run admin:mfa:setup
```

That command prints:

- `ADMIN_MFA_SECRET`
- `ADMIN_MFA_RECOVERY_CODE_HASHES`
- an `otpauth://` URL
- plain-text recovery codes

### What to do next

1. Add the secret to Google Authenticator.
2. Save the recovery codes offline.
3. Save `ADMIN_MFA_SECRET` for Render.
4. Save `ADMIN_MFA_RECOVERY_CODE_HASHES` for Render.

### Local-only helper

For local testing only, you can print the current TOTP code with:

```bash
npm --workspace server run admin:mfa:code
```

Do not rely on that helper for production admin login. In production, use Google Authenticator.

---

## 4. Required Environment Variables

### Render / API

Set these in Render:

```env
NODE_ENV=production
CLIENT_ORIGIN=https://your-client-domain.vercel.app
MONGODB_URI=your-mongodb-atlas-uri
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-strong-admin-password
JWT_SECRET=your-long-random-secret
JWT_EXPIRES_IN=12h
ADMIN_MFA_SECRET=generated-from-admin-mfa-setup
ADMIN_MFA_RECOVERY_CODE_HASHES=generated-from-admin-mfa-setup
ADMIN_MFA_ISSUER=Resume Platform Admin
```

Notes:

- `CLIENT_ORIGIN` must exactly match the final client origin
- `JWT_SECRET` should be long and random
- `ADMIN_PASSWORD` should be strong and unique

### Vercel / Client

Set this in Vercel:

```env
VITE_API_BASE_URL=https://your-render-api.onrender.com
```

---

## 5. GitHub And CI Preparation

This repo already has CI in [`.github/workflows/ci.yml`](/C:/Users/trach/Documents/New%20project/SBA_307_Project/.github/workflows/ci.yml).

Current behavior:

- runs on every pull request
- runs on every push to `main`
- executes `npm ci`
- executes `npm run ci`

Before launch:

1. Push the final code to GitHub.
2. Confirm the latest Actions run passed.
3. Add branch protection for `main`.
4. Require the CI check before merging.

Recommended release flow after launch:

1. create a feature branch
2. open a pull request
3. let GitHub Actions pass
4. merge to `main`
5. let Render and Vercel auto-deploy from `main`

---

## 6. Deploy The API To Render

This repo already includes [render.yaml](/C:/Users/trach/Documents/New%20project/SBA_307_Project/render.yaml), but you can also configure Render manually.

### Create the service

1. Log in to Render.
2. Click `New +`.
3. Choose `Web Service`.
4. Connect your GitHub repository.
5. Select this repository.

### Configure the service

Use:

- Name: `resume-platform-api`
- Runtime: `Node`
- Root Directory: `server`
- Build Command: `npm ci && npm run build`
- Start Command: `npm run start`

### Add environment variables

Add all server variables from section 4.

If you do not have the final Vercel URL yet, use a temporary placeholder value for `CLIENT_ORIGIN`, then update it later.

### Recommended settings

- enable auto deploy from `main`
- set health check path to `/api/health` if Render exposes the field

### Verify the API deploy

After deployment, open:

```text
https://your-render-api.onrender.com/api/health
```

Expected result:

- JSON response
- `status: "ok"`

Do not continue until that endpoint works.

---

## 7. Deploy The Client To Vercel

### Create the project

1. Log in to Vercel.
2. Click `Add New`.
3. Choose `Project`.
4. Import this GitHub repository.

### Configure the client app

Use:

- Root Directory: `client`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

### Add the client environment variable

Set:

```env
VITE_API_BASE_URL=https://your-render-api.onrender.com
```

### Deploy and capture the URL

Deploy the project and copy the final production URL, for example:

```text
https://resume-platform.vercel.app
```

---

## 8. Align Cookie Origin

Because admin auth uses a secure cookie, this step is mandatory.

After Vercel gives you the final client URL:

1. Go back to Render.
2. Update `CLIENT_ORIGIN` to the exact Vercel production URL.
3. Redeploy the Render service.

Examples:

- valid: `https://resume-platform.vercel.app`
- invalid: a preview domain if you intend to log into admin on the production domain

If you later switch to a custom domain, update `CLIENT_ORIGIN` again and redeploy Render.

---

## 9. Production Smoke Test

Run this test pass after both deployments are live.

### Public site

Check:

- `/`
- `/about`
- `/projects`
- `/skills`
- `/contact`

Confirm:

- layout looks correct
- no console errors
- API-backed data loads
- resume download works
- mobile layout is acceptable

### API

Check:

- `/api/health`
- `/api/profile`
- `/api/projects`
- `/api/skills`

### Admin login

Open:

```text
https://your-client-url/admin
```

Test:

- login with email, password, and Google Authenticator code
- page refresh after login
- “keep signed in” behavior
- logout
- wrong password rejection
- wrong MFA code rejection
- one recovery-code login

### Content flows

Test:

- contact form submission
- testimonial submission
- profile edit in admin
- project edit in admin
- skill edit in admin
- testimonial moderation
- contact status update

If something saves but disappears after refresh, stop and fix it before launch.

---

## 10. Rollback Plan

### Vercel rollback

1. Open the Vercel project.
2. Go to `Deployments`.
3. Redeploy the last known good deployment.

### Render rollback

1. Open the Render service.
2. Roll back to the last known good deploy if available.
3. If needed, manually redeploy a previous commit.

### MFA recovery

If you lose authenticator access:

1. use a recovery code
2. if recovery codes are unavailable, run:

```bash
npm --workspace server run admin:mfa:setup
```

3. update these Render env vars:
   - `ADMIN_MFA_SECRET`
   - `ADMIN_MFA_RECOVERY_CODE_HASHES`
4. redeploy Render
5. re-enroll the new secret in Google Authenticator

---

## 11. Exact Launch Order

Use this order:

1. `npm install`
2. `npm run ci`
3. `npm --workspace server run admin:mfa:setup`
4. save the MFA secret and recovery codes
5. push final code to GitHub
6. confirm GitHub Actions passed
7. create the Render web service
8. set Render env vars
9. deploy Render
10. verify `/api/health`
11. create the Vercel project
12. set `VITE_API_BASE_URL`
13. deploy Vercel
14. copy the Vercel production URL
15. update Render `CLIENT_ORIGIN`
16. redeploy Render
17. test public routes
18. test `/admin` with Google Authenticator
19. test content flows
20. enable branch protection on `main`
21. declare launch complete

---

## 12. Immediate Next Step

If you are launching now:

1. run `npm run ci`
2. run `npm --workspace server run admin:mfa:setup`
3. create Render
4. create Vercel
5. set env vars
6. test `/admin` with Google Authenticator on the deployed site
