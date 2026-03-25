import { useScrollProgress } from '../../hooks/useScrollProgress'

export function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #4338ca, #818cf8)',
        zIndex: 9999,
        transition: 'width 80ms linear',
        pointerEvents: 'none',
      }}
    />
  )
}
