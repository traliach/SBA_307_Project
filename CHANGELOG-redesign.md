# Achille Tech Prompt v3/v3.1 Completion Changelog

Date: May 7, 2026

## Scope Completed

- Applied the client-side portfolio redesign while preserving the existing React/Vite architecture, API contracts, and admin behavior.
- Reworked the public positioning around safer releases, stronger cloud foundations, platform reliability, CI/CD, Kubernetes, Terraform, observability, and full-stack delivery.
- Added production-oriented public routes for Services, Work, case studies, About, Contact, Privacy, Terms, and not-found handling.
- Kept consulting open-ended and scope-first instead of publishing fixed pricing or package rates.
- Added hidden Blog and Portal scaffolds behind route flags. They are reachable by URL, excluded from navigation while disabled, and marked `noindex,follow`.
- Added SEO metadata, canonical handling, Open Graph/Twitter metadata, JSON-LD support, `robots.txt`, and `sitemap.xml`.
- Restyled the admin surface with the shared visual language without changing admin APIs or auth flows.

## Installed Verification Tooling

Installed client dev dependencies for the final audit pass:

- `@playwright/test`
- `@axe-core/playwright`
- `lighthouse`
- `chrome-launcher`

Added `npm --workspace client run audit:phase9`, which runs:

- Desktop and mobile browser route checks.
- Console and page error checks.
- Axe accessibility checks.
- Lighthouse checks for Performance, Accessibility, Best Practices, and SEO.

## Phase 9 Audit Result

Latest `audit:phase9` run passed against `http://localhost:5173` with the API available on `http://localhost:4000`.

- Browser routes checked: `/`, `/services`, `/work`, `/work/cloud-resume-infra-aws-resume-platform`, `/about`, `/contact`, `/privacy`, `/terms`, `/blog`, `/portal`.
- Desktop axe violations: `0`.
- Mobile axe violations: `0`.
- Console/page errors: `0`.
- Lighthouse Accessibility, Best Practices, and SEO: `100` on `/`, `/services`, `/work`, and `/contact`.
- Lighthouse Performance was recorded on the Vite dev server and should be treated as directional, not a production score.

## Final Notes

- Hidden routes remain disabled in `client/src/content/routeFlags.ts`.
- Blog content remains intentionally empty; no fake articles were added.
- Portal preview uses static mock data only; no auth, persistence, or backend changes were added.
- Consulting copy stays scope-first: pricing depends on the work and should be handled during consultation.

## Follow-Up: Resume, Skills, and Call CTA

- Kept the main resume CTAs on the website-rendered `/resume` route so the resume comes from site/API content instead of the old plain-text `.txt` asset.
- Added `client/public/ali-achille-traore-resume.pdf`, copied from `ALI ACHILLE TRAORE (1).pdf`, as a PDF source/reference while the public CTAs point to the live resume page.
- Parsed the PDF resume and expanded the website/API skill groups to include the broader resume skills across AWS, Azure, GCP, CI/CD, Kubernetes, IaC, observability, DevSecOps, cloud-native architecture, languages, backend, frontend, and databases.
- Changed "Book a call" CTAs to "Request a call" and anchored them to the contact form because no calendar scheduling integration exists yet.
