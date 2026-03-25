import { useScrollProgress } from '../../hooks/useScrollProgress'

const SIZE = 44
const STROKE = 3
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ScrollProgressBar() {
  const progress = useScrollProgress()
  const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE

  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        padding: 0,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        opacity: progress > 3 ? 1 : 0,
        transform: progress > 3 ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: progress > 3 ? 'auto' : 'none',
      }}
    >
      {/* Ring */}
      <svg
        width={SIZE}
        height={SIZE}
        style={{ display: 'block', transform: 'rotate(-90deg)' }}
      >
        <defs>
          <linearGradient id="scroll-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4338ca" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="white"
          stroke="rgba(0,0,0,0.07)"
          strokeWidth={STROKE}
        />
        {/* Progress arc */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="url(#scroll-grad)"
          strokeWidth={STROKE}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 80ms linear' }}
        />
      </svg>

      {/* Up arrow centered inside the ring */}
      <svg
        aria-hidden="true"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <path
          d="M5 8V2M2 5l3-3 3 3"
          stroke="#4338ca"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
