import { Component, type ErrorInfo, type ReactNode } from 'react'
import { siteContainerClass } from './site/styles'
import { ButtonLink, SurfaceCard } from './site/ui'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[client] uncaught render error', error, errorInfo.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="app-shell">
          <section className="py-16 sm:py-20 lg:py-24">
            <div className={siteContainerClass}>
              <SurfaceCard
                className="mx-auto flex max-w-3xl flex-col gap-5 text-center"
                tone="subdued"
              >
                <span className="eyebrow justify-center">Client error</span>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink">
                  Rendering failed
                </h2>
                <p className="section-intro mx-auto">{this.state.error.message}</p>
                <p className="section-intro mx-auto">
                  Open the browser console to inspect the stack trace.
                </p>
                <div className="flex justify-center">
                  <ButtonLink href="/" variant="secondary">
                    Return to the portfolio
                  </ButtonLink>
                </div>
              </SurfaceCard>
            </div>
          </section>
        </div>
      )
    }

    return this.props.children
  }
}
