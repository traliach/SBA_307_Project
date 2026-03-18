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
  loading: 'border-amber-200 bg-amber-50/90 text-amber-800',
  online: 'border-emerald-200 bg-emerald-50/90 text-emerald-800',
  offline: 'border-slate-200 bg-white/90 text-slate-600',
}

const dotClasses: Record<ApiState, string> = {
  loading: 'bg-amber-500',
  online: 'bg-emerald-500',
  offline: 'bg-slate-400',
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
      className={[
        'inline-flex flex-wrap items-center gap-2 rounded-full border px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em]',
        toneClasses[state],
      ].join(' ')}
    >
      <span className={cx('h-2 w-2 rounded-full', dotClasses[state])} />
      <span>{labels[state]}</span>
      <span className="normal-case text-[0.72rem] font-medium tracking-normal opacity-80">
        {detail}
      </span>
    </div>
  )
}
