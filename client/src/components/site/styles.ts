export const siteContainerClass = 'mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10'

export const sectionToneClasses = {
  default: 'py-14 sm:py-[4.5rem] lg:py-20',
  compact: 'py-10 sm:py-12 lg:py-14',
} as const

export const surfaceToneClasses = {
  default:
    'rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_64px_-42px_rgba(15,23,42,0.18)]',
  subdued:
    'rounded-[28px] border border-slate-200/80 bg-slate-50/90 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.14)]',
  accent:
    'rounded-[30px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(247,250,252,1),rgba(255,255,255,1))] shadow-[0_24px_64px_-42px_rgba(15,23,42,0.18)]',
  contrast:
    'rounded-[28px] border border-slate-900/10 bg-ink text-white shadow-panel shadow-slate-900/25',
} as const

export const surfacePaddingClasses = {
  compact: 'p-5 sm:p-6',
  default: 'p-6 sm:p-7',
  roomy: 'p-7 sm:p-9',
  flush: 'p-0',
} as const

export const headingClasses = {
  display:
    'max-w-5xl font-display text-[clamp(3rem,6vw,5.35rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-ink',
  page:
    'max-w-4xl font-display text-[clamp(2.75rem,4.8vw,4.55rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-ink',
  section:
    'max-w-3xl font-display text-[clamp(1.9rem,3vw,2.85rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink',
  card: 'text-[1.5rem] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[1.75rem]',
} as const

export const eyebrowClass =
  'inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent-deep/80'

export const eyebrowLineClass = 'h-px w-8 bg-accent/30'

export const leadClass =
  'max-w-3xl text-[1.02rem] leading-8 text-slate-600 sm:text-lg'

export const bodyClass =
  'text-[0.97rem] leading-7 text-slate-600 sm:text-base'

export const metaClass = 'text-sm font-medium text-slate-500'

export const finePrintClass =
  'text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'

export const tagClass =
  'inline-flex items-center rounded-full border border-slate-200 bg-white/[0.88] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-slate-600'

export const metricBadgeClass =
  'rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3'

export const navShellClass =
  'flex items-center gap-1 rounded-full border border-slate-200 bg-white px-1 py-1 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.22)]'

export const navLinkClass =
  'inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition duration-200 hover:bg-slate-50 hover:text-ink'

export const navLinkActiveClass =
  'bg-ink text-white shadow-[0_14px_30px_-24px_rgba(15,23,42,0.46)] hover:bg-ink hover:text-white'

export const buttonToneClasses = {
  primary:
    'inline-flex items-center justify-center rounded-full border border-transparent bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft shadow-slate-900/25 transition duration-200 hover:-translate-y-0.5 hover:bg-accent-deep focus:outline-none focus:ring-4 focus:ring-accent/10',
  secondary:
    'inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/[0.92] px-5 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-accent/[0.35] hover:text-ink focus:outline-none focus:ring-4 focus:ring-accent/10',
  ghost:
    'inline-flex items-center justify-center rounded-full border border-transparent px-4 py-3 text-sm font-semibold text-slate-600 transition duration-200 hover:text-ink focus:outline-none focus:ring-4 focus:ring-accent/10',
} as const

export const textLinkClass =
  'inline-flex items-center gap-2 text-sm font-semibold text-accent-deep transition duration-200 hover:text-ink'

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
