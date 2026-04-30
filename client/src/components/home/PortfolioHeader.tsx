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
    'inline-flex items-center justify-center rounded-full border p-2.5 transition duration-200',
    'border-line/80 bg-white text-muted hover:border-accent/25 hover:text-ink',
    'dark:border-white/[0.08] dark:bg-[#161920] dark:text-gray-400 dark:hover:border-amber-400/30 dark:hover:text-gray-100',
  )

  return (
    <header className="sticky top-0 z-40 border-b border-line/40 bg-canvas/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#0f1117]/80">
      <div
        className={cx(
          siteContainerClass,
          'flex items-center justify-between gap-6 py-4 sm:py-5',
        )}
      >
        <a className="group min-w-0 flex-1 lg:flex-none" href="/">
          <span className="block truncate text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted transition-colors group-hover:text-accent-deep dark:text-gray-500 dark:group-hover:text-amber-400">
            {name}
          </span>
          <span className="mt-1 block truncate text-sm font-medium text-ink sm:text-base dark:text-gray-100">
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
        <div className="flex items-center gap-2 lg:hidden">
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
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-muted transition duration-200 hover:border-accent/25 hover:text-ink dark:border-white/[0.08] dark:bg-[#161920] dark:text-gray-400 dark:hover:text-gray-100"
            onClick={() => setMenuOpen((current) => !current)}
            type="button"
          >
            <span className="relative flex h-4 w-4 flex-col items-center justify-center gap-1">
              <span className={cx('h-0.5 w-3.5 rounded-full bg-current transition-all duration-300', menuOpen && 'translate-y-[3px] rotate-45')} />
              <span className={cx('h-0.5 w-3.5 rounded-full bg-current transition-all duration-300', menuOpen && '-translate-y-[3px] -rotate-45')} />
            </span>
            Menu
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cx(
          'overflow-hidden border-t border-line/40 bg-white/95 backdrop-blur-xl transition-all duration-300 lg:hidden dark:border-white/[0.06] dark:bg-[#161920]/95',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 border-t-0 opacity-0',
        )}
      >
        <div className={cx(siteContainerClass, 'py-4')}>
          <nav aria-label="Mobile portfolio sections" className="grid gap-1">
            {navItems.map((item) => (
              <a
                aria-current={currentPath === item.href ? 'page' : undefined}
                className={cx(
                  'rounded-2xl px-4 py-3 text-sm font-medium text-muted transition duration-200 dark:text-gray-400',
                  currentPath === item.href
                    ? 'bg-surface-tinted text-ink dark:bg-[#1c2028] dark:text-gray-100'
                    : 'hover:bg-surface-tinted hover:text-ink dark:hover:bg-[#1c2028] dark:hover:text-gray-100',
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
