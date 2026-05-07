import { useState } from 'react'
import { useDarkMode } from '../../hooks/useDarkMode'
import {
  cx,
  navLinkActiveClass,
  navLinkClass,
  navShellClass,
  siteContainerClass,
} from '../site/styles'

interface PortfolioHeaderProps {
  currentPath: string
  name: string
  title: string
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Stack' },
  { href: '/contact', label: 'Contact' },
]

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

export function PortfolioHeader({
  currentPath,
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

        {/* Desktop nav + dark toggle */}
        <div className="hidden items-center gap-2 lg:flex">
          <nav aria-label="Portfolio sections" className={navShellClass}>
            {navItems.map((item) => (
              <a
                aria-current={currentPath === item.href ? 'page' : undefined}
                className={cx(
                  navLinkClass,
                  currentPath === item.href && navLinkActiveClass,
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
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
            {navItems.map((item) => (
              <a
                aria-current={currentPath === item.href ? 'page' : undefined}
                className={cx(
                  'rounded-lg px-4 py-3 text-sm font-medium text-text-muted transition duration-200',
                  currentPath === item.href
                    ? 'bg-elevated text-text'
                    : 'hover:bg-elevated hover:text-text',
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
