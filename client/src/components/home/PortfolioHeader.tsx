import { useState } from 'react'
import { optionalRoutes } from '../../content/routeFlags'
import type { ProfileContent } from '../../types/site'
import { useDarkMode } from '../../hooks/useDarkMode'
import {
  buttonToneClasses,
  cx,
  navLinkActiveClass,
  navLinkClass,
  navShellClass,
  siteContainerClass,
} from '../site/styles'

interface PortfolioHeaderProps {
  currentPath: string
  links: ProfileContent['links']
  name: string
  title: string
}

const navItems = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  ...optionalRoutes
    .filter((route) => route.enabled)
    .map((route) => ({ href: route.href, label: route.label })),
]

function isActiveNavItem(currentPath: string, href: string) {
  if (href === '/work') {
    return currentPath === '/work' || currentPath.startsWith('/work/') || currentPath === '/projects'
  }

  return currentPath === href || currentPath.startsWith(`${href}/`)
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg aria-hidden className="h-[16px] w-[16px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg aria-hidden className="h-[16px] w-[16px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function PortfolioHeader({
  currentPath,
  links,
  name,
  title,
}: PortfolioHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { dark, toggle } = useDarkMode()

  const toggleBtnClass = cx(
    'inline-flex h-9 w-9 items-center justify-center rounded-lg border p-0 transition duration-200 sm:h-auto sm:w-auto sm:p-2.5',
    'border-border bg-surface text-text-muted hover:border-accent/40 hover:text-text',
  )

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-xl">
      <div
        className={cx(
          siteContainerClass,
          'flex items-center justify-between gap-3 py-4 sm:gap-6 sm:py-5',
        )}
      >
        <a className="group min-w-0 flex-1 lg:flex-none" href="/">
          <span className="block truncate text-[0.68rem] font-semibold uppercase tracking-normal text-text-muted transition-colors group-hover:text-accent-deep">
            {name}
          </span>
          <span className="mt-1 block max-w-[170px] truncate text-sm font-medium text-text sm:max-w-none sm:text-base">
            {title}
          </span>
        </a>

        {/* Desktop nav + actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <nav aria-label="Portfolio sections" className={navShellClass}>
            {navItems.map((item) => {
              const isActive = isActiveNavItem(currentPath, item.href)

              return (
                <a
                  aria-current={isActive ? 'page' : undefined}
                  className={cx(navLinkClass, isActive && navLinkActiveClass)}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
          <a
            aria-label="GitHub"
            className={toggleBtnClass}
            href={links.github}
            rel="noreferrer"
            target="_blank"
          >
            <GitHubIcon />
          </a>
          <a
            aria-label="LinkedIn"
            className={toggleBtnClass}
            href={links.linkedin}
            rel="noreferrer"
            target="_blank"
          >
            <LinkedInIcon />
          </a>
          <a className={cx(buttonToneClasses.primary, 'px-4 py-2.5')} href="/contact">
            Book a call
          </a>
          <button
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={toggleBtnClass}
            onClick={toggle}
            type="button"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Mobile: dark toggle + hamburger */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <button
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={toggleBtnClass}
            onClick={toggle}
            type="button"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface p-0 text-sm font-semibold text-text-muted transition duration-200 hover:border-accent/40 hover:text-text"
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
          >
            <span className="relative flex h-4 w-4 flex-col items-center justify-center gap-1">
              <span className={cx('h-0.5 w-3.5 rounded-full bg-current transition-all duration-300', menuOpen && 'translate-y-[3px] rotate-45')} />
              <span className={cx('h-0.5 w-3.5 rounded-full bg-current transition-all duration-300', menuOpen && '-translate-y-[3px] -rotate-45')} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cx(
          'overflow-hidden border-t border-border bg-surface/95 backdrop-blur-xl transition-all duration-300 lg:hidden',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 border-t-0 opacity-0',
        )}
      >
        <div className={cx(siteContainerClass, 'py-4')}>
          <nav aria-label="Mobile portfolio sections" className="grid gap-1">
            {navItems.map((item) => {
              const isActive = isActiveNavItem(currentPath, item.href)

              return (
                <a
                  aria-current={isActive ? 'page' : undefined}
                  className={cx(
                    'rounded-lg px-4 py-3 text-sm font-medium text-text-muted transition duration-200',
                    isActive ? 'bg-elevated text-text' : 'hover:bg-elevated hover:text-text',
                  )}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="mt-4 grid gap-3 border-t border-border pt-4">
            <a className={cx(buttonToneClasses.primary, 'w-full')} href="/contact">
              Book a call
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                className={cx(toggleBtnClass, 'h-10 w-full sm:h-10 sm:w-full')}
                href={links.github}
                rel="noreferrer"
                target="_blank"
              >
                <GitHubIcon />
                <span className="ml-2 text-xs font-semibold">GitHub</span>
              </a>
              <a
                className={cx(toggleBtnClass, 'h-10 w-full sm:h-10 sm:w-full')}
                href={links.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                <LinkedInIcon />
                <span className="ml-2 text-xs font-semibold">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
