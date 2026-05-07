import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import AxeBuilder from '@axe-core/playwright'
import { chromium } from '@playwright/test'
import * as chromeLauncher from 'chrome-launcher'
import lighthouse from 'lighthouse'

const baseUrl = process.env.PHASE9_BASE_URL ?? 'http://localhost:5173'

const browserRoutes = [
  '/',
  '/services',
  '/work',
  '/work/cloud-resume-infra-aws-resume-platform',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/blog',
  '/portal',
]

const lighthouseRoutes = ['/', '/services', '/work', '/contact']

const viewports = [
  { label: 'desktop', size: { width: 1440, height: 1000 } },
  { label: 'mobile', size: { width: 390, height: 844 } },
]

const lighthouseMinimums = {
  accessibility: 0.9,
  'best-practices': 0.9,
  seo: 0.9,
}

function urlFor(path) {
  return new URL(path, baseUrl).toString()
}

function scorePercent(score) {
  return Math.round((score ?? 0) * 100)
}

function formatFailure(route, viewport, message) {
  return `[${viewport}] ${route}: ${message}`
}

async function runBrowserAndAxeChecks() {
  const browser = await chromium.launch({ headless: true })
  const failures = []
  const results = []

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({ viewport: viewport.size })

      for (const route of browserRoutes) {
        const page = await context.newPage()
        const consoleErrors = []

        page.on('console', (message) => {
          if (message.type() === 'error') {
            consoleErrors.push(message.text())
          }
        })

        page.on('pageerror', (error) => {
          consoleErrors.push(error.message)
        })

        try {
          await page.goto(urlFor(route), {
            waitUntil: 'networkidle',
            timeout: 30000,
          })

          const bodyText = (await page.locator('body').innerText()).trim()
          const hasMain = await page.locator('#main-content').isVisible()
          const hasHeading = await page.locator('h1').first().isVisible()
          const overlayCount = await page
            .locator('.vite-error-overlay, #webpack-dev-server-client-overlay, [data-nextjs-dialog]')
            .count()

          if (bodyText.length < 80) {
            failures.push(formatFailure(route, viewport.label, 'page rendered too little text'))
          }

          if (!hasMain) {
            failures.push(formatFailure(route, viewport.label, '#main-content is not visible'))
          }

          if (!hasHeading) {
            failures.push(formatFailure(route, viewport.label, 'no visible h1 found'))
          }

          if (overlayCount > 0) {
            failures.push(formatFailure(route, viewport.label, 'framework error overlay detected'))
          }

          if (consoleErrors.length > 0) {
            failures.push(
              formatFailure(
                route,
                viewport.label,
                `console/page errors detected: ${consoleErrors.join(' | ')}`,
              ),
            )
          }

          await page.keyboard.press('Tab')
          const activeElementLabel = await page.evaluate(() => {
            const active = document.activeElement
            return active?.textContent?.trim() || active?.getAttribute('aria-label') || ''
          })

          if (!activeElementLabel) {
            failures.push(formatFailure(route, viewport.label, 'first tab stop has no readable label'))
          }

          const accessibility = await new AxeBuilder({ page }).analyze()

          if (accessibility.violations.length > 0) {
            failures.push(
              formatFailure(
                route,
                viewport.label,
                `axe violations: ${accessibility.violations
                  .map((violation) => {
                    const targets = violation.nodes
                      .slice(0, 2)
                      .map((node) => node.target.join(' '))
                      .join('; ')

                    return `${violation.id} (${violation.nodes.length}: ${targets})`
                  })
                  .join(', ')}`,
              ),
            )
          }

          results.push({
            viewport: viewport.label,
            route,
            axeViolations: accessibility.violations.length,
            consoleErrors: consoleErrors.length,
          })
        } finally {
          await page.close()
        }
      }

      await context.close()
    }
  } finally {
    await browser.close()
  }

  return { failures, results }
}

async function runLighthouseChecks() {
  const chromePath = chromium.executablePath()
  const userDataDir = path.resolve('node_modules/.tmp/lighthouse-profile')

  await mkdir(userDataDir, { recursive: true })

  const chrome = await chromeLauncher.launch({
    chromePath,
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
    userDataDir,
  })

  const failures = []
  const results = []

  try {
    for (const route of lighthouseRoutes) {
      const report = await lighthouse(urlFor(route), {
        port: chrome.port,
        logLevel: 'error',
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      })

      if (!report?.lhr) {
        failures.push(`[lighthouse] ${route}: no report generated`)
        continue
      }

      const categories = report.lhr.categories
      const scores = Object.fromEntries(
        Object.entries(categories).map(([name, category]) => [
          name,
          scorePercent(category.score),
        ]),
      )

      for (const [category, minimum] of Object.entries(lighthouseMinimums)) {
        const score = categories[category]?.score ?? 0

        if (score < minimum) {
          failures.push(
            `[lighthouse] ${route}: ${category} score ${scorePercent(score)} is below ${scorePercent(
              minimum,
            )}`,
          )
        }
      }

      results.push({ route, ...scores })
    }
  } finally {
    try {
      await chrome.kill()
    } catch (error) {
      console.warn(
        `[lighthouse] Chrome cleanup warning: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
    }
  }

  return { failures, results }
}

console.log(`Phase 9 audit target: ${baseUrl}`)

const browserChecks = await runBrowserAndAxeChecks()
const lighthouseChecks = await runLighthouseChecks()
const failures = [...browserChecks.failures, ...lighthouseChecks.failures]

console.table(browserChecks.results)
console.table(lighthouseChecks.results)

if (failures.length > 0) {
  console.error('Phase 9 audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exitCode = 1
} else {
  console.log('Phase 9 audit passed.')
}
