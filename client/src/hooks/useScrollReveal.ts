/**
 * useScrollReveal.ts — Scroll-triggered animation hook
 *
 * This hook watches for elements that have the CSS class "reveal" and adds
 * the class "revealed" to them the moment they scroll into the viewport.
 *
 * How to use it in a page component:
 *   const revealRef = useScrollReveal()
 *   return <div ref={revealRef}> ... <div className="reveal"> ... </div> </div>
 *
 * The CSS in index.css then transitions those elements from hidden to visible.
 *
 * The tool that makes this possible is the browser's IntersectionObserver API.
 * Instead of listening to the scroll event on every frame (which is expensive),
 * IntersectionObserver fires a callback only when a watched element crosses a
 * threshold in the viewport — much more efficient.
 */

import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  // useRef gives us a mutable box that React won't re-render on change.
  // We attach it to a container DOM element so we can query its children.
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current

    // The ref might not be attached yet on the very first render — bail safely.
    if (!container) return

    // Find every element inside the container that wants to be animated.
    const targets = container.querySelectorAll('.reveal')

    // Nothing to observe — exit early to avoid creating an unused observer.
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // The element has entered the viewport: add the "revealed" class
            // so CSS can transition it from its hidden starting state.
            entry.target.classList.add('revealed')

            // Once revealed we stop watching this element.
            // There is no reason to animate it again on every scroll.
            observer.unobserve(entry.target)
          }
        }
      },
      {
        // threshold: 0.08 means the callback fires when 8% of the element is
        // visible — early enough for a smooth feel without premature triggering.
        threshold: 0.08,
        // rootMargin shrinks the effective viewport by 40 px at the bottom so
        // the animation starts just before the element fully enters the screen.
        rootMargin: '0px 0px -40px 0px',
      },
    )

    // Start watching each element.
    for (const target of targets) {
      observer.observe(target)
    }

    // Cleanup: called by React when the component unmounts or the effect re-runs.
    // disconnect() stops ALL observations at once, preventing memory leaks.
    return () => observer.disconnect()
  }, []) // Empty dependency array → run once after the first render, then cleanup on unmount.

  // The caller attaches this ref to the wrapping element so querySelectorAll
  // only searches inside it (not the entire page).
  return containerRef
}
