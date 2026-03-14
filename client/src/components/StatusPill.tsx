import type { ApiState } from '../types/site'

interface StatusPillProps {
  state: ApiState
  timestamp?: string | null
}

const labels: Record<ApiState, string> = {
  loading: 'Checking API',
  online: 'API connected',
  offline: 'API unavailable',
}

export function StatusPill({ state, timestamp }: StatusPillProps) {
  const timeLabel =
    state === 'online' && timestamp
      ? `Updated ${new Date(timestamp).toLocaleTimeString()}`
      : 'Using local starter content'

  return (
    <div className={`status-pill status-pill--${state}`}>
      <span className="status-pill__dot" aria-hidden="true" />
      <span>
        {labels[state]} · {timeLabel}
      </span>
    </div>
  )
}
