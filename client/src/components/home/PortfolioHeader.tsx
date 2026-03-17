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
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand__name">{name}</span>
        <span className="brand__role">{title}</span>
      </div>

      <nav className="nav-links" aria-label="Portfolio sections">
        {navItems.map((item) => (
          <a
            aria-current={currentPath === item.href ? 'page' : undefined}
            className={currentPath === item.href ? 'active' : undefined}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
