import { useState } from 'react'
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
  { href: '/', label: 'Overview' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
]

export function PortfolioHeader({
  currentPath,
  name,
  title,
}: PortfolioHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-canvas/90 backdrop-blur-xl">
      <div
        className={cx(
          siteContainerClass,
          'flex items-center justify-between gap-6 py-4 sm:py-5',
        )}
      >
        <a className="min-w-0 flex-1 lg:flex-none" href="/">
          <span className="block truncate text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
            {name}
          </span>
          <span className="mt-1 block truncate text-sm font-medium text-ink sm:text-base">
            {title}
          </span>
        </a>

        <nav
          aria-label="Portfolio sections"
          className={cx(navShellClass, 'hidden lg:flex')}
        >
          {navItems.map((item) => (
            <a
              aria-current={currentPath === item.href ? 'page' : undefined}
              className={[
                navLinkClass,
                currentPath === item.href ? navLinkActiveClass : '',
              ]
                .filter(Boolean)
                .join(' ')}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition duration-200 hover:border-accent/30 hover:text-ink lg:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          type="button"
        >
          Menu
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200/80 bg-white/95 backdrop-blur lg:hidden">
          <div className={cx(siteContainerClass, 'py-4')}>
            <nav aria-label="Mobile portfolio sections" className="grid gap-2">
              {navItems.map((item) => (
                <a
                  aria-current={currentPath === item.href ? 'page' : undefined}
                  className={[
                    navLinkClass,
                    'justify-start rounded-2xl border border-transparent px-4 py-3',
                    currentPath === item.href
                      ? 'border-slate-200 bg-slate-50 text-ink'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  )
}
