import type { ApiHealth, ApiState } from '../../types/site'
import { cx } from './styles'

interface ApiStatusBadgeProps {
  health: ApiHealth | null
  state: ApiState
}

const labels: Record<ApiState, string> = {
  loading: 'Checking API',
  online: 'API connected',
  offline: 'Local content fallback',
}

const toneClasses: Record<ApiState, string> = {
  loading: 'border-amber-200/80 bg-amber-50/80 text-amber-800',
  online: 'border-emerald-200/80 bg-emerald-50/80 text-emerald-800',
  offline: 'border-line bg-surface-tinted text-muted',
}

const dotClasses: Record<ApiState, string> = {
  loading: 'bg-amber-500 animate-pulse',
  online: 'bg-emerald-500',
  offline: 'bg-stone-400',
}

export function ApiStatusBadge({ health, state }: ApiStatusBadgeProps) {
  const detail =
    state === 'online' && health?.timestamp
      ? `Updated ${new Date(health.timestamp).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        })}`
      : state === 'offline'
        ? 'Using local portfolio data'
        : 'Verifying server availability'

  return (
    <div
      className={cx(
        'inline-flex max-w-full flex-wrap items-center gap-2 rounded-lg border px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-normal backdrop-blur-sm',
        toneClasses[state],
      )}
    >
      <span className={cx('h-1.5 w-1.5 rounded-full', dotClasses[state])} />
      <span>{labels[state]}</span>
      <span className="normal-case text-[0.7rem] font-medium tracking-normal opacity-70">
        {detail}
      </span>
    </div>
  )
}
