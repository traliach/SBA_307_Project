import { useEffect, useState } from 'react'

const counterUrl = import.meta.env.VITE_VISITOR_COUNTER_URL?.trim() ?? ''

export function useVisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    if (!counterUrl) return

    fetch(counterUrl)
      .then((res) => res.json())
      .then((data: { count: number }) => setCount(data.count))
      .catch(() => {
        // Silently fail — visitor counter is non-critical
      })
  }, [])

  return count
}
