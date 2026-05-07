export const siteContainerClass = 'mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-10 xl:px-16'

export const sectionToneClasses = {
  default: 'py-8 sm:py-10 lg:py-12',
  compact: 'py-6 sm:py-8 lg:py-10',
} as const

export const surfaceToneClasses = {
  default:
    'rounded-lg border border-line/70 bg-white shadow-card dark:border-white/[0.08] dark:bg-[#161920]',
  subdued:
    'rounded-lg border border-line/70 bg-surface-tinted shadow-card dark:border-white/[0.08] dark:bg-[#1c2028]',
  accent:
    'rounded-lg border border-accent/20 bg-white shadow-card dark:border-accent/20 dark:bg-[#161920]',
  contrast:
    'rounded-lg border border-ink/10 bg-ink text-white shadow-panel',
  warm:
    'rounded-lg border border-warm/20 bg-warm-soft shadow-card dark:border-warm/20 dark:bg-[#161920]',
} as const

export const surfacePaddingClasses = {
  compact: 'p-4 sm:p-5',
  default: 'p-6 sm:p-8',
  roomy: 'p-6 sm:p-8',
  flush: 'p-0',
} as const

export const headingClasses = {
  display:
    'max-w-[20rem] font-display text-[2.15rem] font-semibold leading-[1.08] tracking-normal text-ink sm:max-w-4xl sm:text-5xl sm:leading-tight dark:text-gray-100',
  page:
    'max-w-3xl font-display text-3xl font-semibold leading-tight tracking-normal text-ink sm:text-4xl dark:text-gray-100',
  section:
    'max-w-3xl font-display text-2xl font-semibold leading-tight tracking-normal text-ink sm:text-3xl dark:text-gray-100',
  card: 'font-display text-xl font-semibold leading-snug tracking-normal text-ink sm:text-2xl dark:text-gray-100',
} as const

export const eyebrowClass =
  'inline-flex min-w-0 items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-normal text-accent-deep dark:text-amber-400'

export const eyebrowLineClass = 'h-px w-8 bg-accent/25 dark:bg-amber-400/30'

export const leadClass =
  'max-w-3xl text-[1.05rem] leading-8 text-muted sm:text-lg dark:text-gray-400'

export const bodyClass =
  'text-[0.95rem] leading-7 text-muted sm:text-base dark:text-gray-400'

export const metaClass = 'text-sm font-medium text-muted dark:text-gray-400'

export const finePrintClass =
  'text-[0.68rem] font-semibold uppercase tracking-normal text-stone-500 dark:text-gray-500'

export const tagClass =
  'inline-flex items-center rounded-md border border-line/80 bg-surface-tinted px-2.5 py-1 text-[0.72rem] font-semibold tracking-normal text-muted transition-colors duration-200 hover:border-accent/20 hover:text-accent-deep dark:border-white/[0.08] dark:bg-[#1c2028] dark:text-gray-400 dark:hover:border-amber-400/30 dark:hover:text-amber-400'

export const metricBadgeClass =
  'rounded-lg border border-line/70 bg-white px-4 py-3.5 dark:border-white/[0.08] dark:bg-[#161920]'

export const navShellClass =
  'flex items-center gap-1 rounded-lg border border-line/80 bg-white/90 px-1 py-1 shadow-soft backdrop-blur-lg dark:border-white/[0.08] dark:bg-[#161920]/90'

export const navLinkClass =
  'inline-flex items-center rounded-md px-3 py-2 text-[0.82rem] font-medium text-muted transition duration-200 hover:bg-surface-tinted hover:text-ink dark:text-gray-400 dark:hover:bg-[#1c2028] dark:hover:text-gray-100'

export const navLinkActiveClass =
  'bg-ink text-white shadow-soft hover:bg-ink hover:text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900'

export const buttonToneClasses = {
  primary:
    'inline-flex items-center justify-center rounded-lg border border-transparent bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft transition duration-200 hover:bg-accent-deep hover:shadow-card-hover focus:outline-none focus:ring-4 focus:ring-accent/10 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100',
  secondary:
    'inline-flex items-center justify-center rounded-lg border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition duration-200 hover:border-accent/25 hover:text-accent-deep hover:shadow-soft focus:outline-none focus:ring-4 focus:ring-accent/10 dark:border-white/[0.08] dark:bg-white/5 dark:text-gray-100 dark:hover:border-amber-400/30 dark:hover:text-amber-400',
  ghost:
    'inline-flex items-center justify-center rounded-lg border border-transparent px-4 py-3 text-sm font-semibold text-muted transition duration-200 hover:text-ink focus:outline-none focus:ring-4 focus:ring-accent/10 dark:text-gray-400 dark:hover:text-gray-100',
} as const

export const textLinkClass =
  'inline-flex items-center gap-2 text-sm font-semibold text-accent-deep transition duration-200 hover:text-ink dark:text-amber-400 dark:hover:text-gray-100'

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
