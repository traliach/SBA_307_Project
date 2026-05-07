export const siteContainerClass = 'mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-8 xl:px-10'

export const sectionToneClasses = {
  default: 'py-16 sm:py-20 lg:py-24',
  compact: 'py-10 sm:py-12 lg:py-16',
} as const

export const surfaceToneClasses = {
  default:
    'rounded-lg border border-border bg-surface shadow-card',
  subdued:
    'rounded-lg border border-border bg-elevated shadow-card',
  accent:
    'rounded-lg border border-accent/30 bg-surface shadow-card shadow-glow',
  contrast:
    'rounded-lg border border-primary/30 bg-primary text-white shadow-panel',
  warm:
    'rounded-lg border border-warning/30 bg-warm-soft shadow-card',
} as const

export const surfacePaddingClasses = {
  compact: 'p-4 sm:p-5',
  default: 'p-6 sm:p-8',
  roomy: 'p-6 sm:p-8 lg:p-10',
  flush: 'p-0',
} as const

export const headingClasses = {
  display:
    'max-w-[20rem] font-display text-[2.15rem] font-semibold leading-[1.08] tracking-normal text-text sm:max-w-4xl sm:text-5xl sm:leading-tight',
  page:
    'max-w-3xl font-display text-3xl font-semibold leading-tight tracking-normal text-text sm:text-4xl',
  section:
    'max-w-3xl font-display text-2xl font-semibold leading-tight tracking-normal text-text sm:text-3xl',
  card: 'font-display text-xl font-semibold leading-snug tracking-normal text-text sm:text-2xl',
} as const

export const eyebrowClass =
  'inline-flex min-w-0 items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-normal text-accent-deep'

export const eyebrowLineClass = 'h-px w-8 bg-accent/40'

export const leadClass =
  'max-w-3xl text-[1.05rem] leading-8 text-text-muted sm:text-lg'

export const bodyClass =
  'text-[0.95rem] leading-7 text-text-muted sm:text-base'

export const metaClass = 'text-sm font-medium text-text-muted'

export const finePrintClass =
  'text-[0.68rem] font-semibold uppercase tracking-normal text-text-muted'

export const tagClass =
  'inline-flex items-center rounded-md border border-border bg-elevated px-2.5 py-1 text-[0.72rem] font-semibold tracking-normal text-text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent-deep'

export const metricBadgeClass =
  'rounded-lg border border-border bg-surface px-4 py-3.5'

export const navShellClass =
  'flex items-center gap-1 rounded-lg border border-border bg-surface/90 px-1 py-1 shadow-soft backdrop-blur-lg'

export const navLinkClass =
  'inline-flex items-center rounded-md px-3 py-2 text-[0.82rem] font-medium text-text-muted transition duration-200 hover:bg-elevated hover:text-text'

export const navLinkActiveClass =
  'bg-primary text-white shadow-soft hover:bg-primary hover:text-white'

export const buttonToneClasses = {
  primary:
    'inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft transition duration-200 hover:bg-primary/90 hover:shadow-card-hover focus:outline-none focus:ring-4 focus:ring-focus/20',
  secondary:
    'inline-flex items-center justify-center rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition duration-200 hover:border-accent/40 hover:text-accent-deep hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-focus/20',
  ghost:
    'inline-flex items-center justify-center rounded-lg border border-transparent px-4 py-3 text-sm font-semibold text-text-muted transition duration-200 hover:text-text focus:outline-none focus:ring-4 focus:ring-focus/20',
} as const

export const textLinkClass =
  'inline-flex items-center gap-2 text-sm font-semibold text-accent-deep transition duration-200 hover:text-text'

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
