import { useState } from 'react'
import {
  ButtonLink,
  CtaBand,
  Eyebrow,
  PageIntro,
  SiteSection,
  SurfaceCard,
  Tag,
} from '../components/site/ui'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
  metaClass,
} from '../components/site/styles'

const portalNavItems = ['Overview', 'Environments', 'Deployments', 'Activity']

const previewCards = [
  {
    label: 'Portal status',
    value: 'Coming soon',
    detail: 'Static preview only. No auth, client data, or data fetching.',
  },
  {
    label: 'Engagement view',
    value: 'Scope-first',
    detail: 'Designed for audits, implementation work, and ongoing support.',
  },
  {
    label: 'Operating model',
    value: 'Health + activity',
    detail: 'Environment state, deployment notes, and next actions in one view.',
  },
]

const deploymentCards = [
  ['Sample web app', 'Ready for review', 'Preview environment'],
  ['Sample API', 'Healthy', 'Health endpoint green'],
  ['Sample pipeline', 'Waiting', 'Change approval pending'],
]

const environments = [
  {
    name: 'Sample production',
    status: 'Stable',
    release: 'Approved release',
    owner: 'Platform',
  },
  {
    name: 'Sample staging',
    status: 'Review',
    release: 'Validation pending',
    owner: 'Delivery',
  },
  {
    name: 'Sample preview',
    status: 'Active',
    release: 'Branch deploy',
    owner: 'Engineering',
  },
]

const activityItems = [
  'Deployment note added for rollback review.',
  'Infrastructure task marked ready for handoff.',
  'Monitoring checklist updated after environment review.',
  'Next scope discussion queued for platform reliability work.',
]

export function PortalPreviewPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(
      'Preview only: no email was saved. Use the Contact page to request portal updates.',
    )
  }

  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="reveal grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <PageIntro
            description="A hidden coming-soon preview for future consulting or client work. It shows the intended shape of a client portal without authentication, real data, or backend changes."
            eyebrow="Client portal"
            size="page"
            title="A clearer view for scoped delivery work."
          />

          <SurfaceCard className="flex flex-col gap-4" padding="compact" tone="subdued">
            <p className={finePrintClass}>Route status</p>
            <p className={bodyClass}>
              Hidden from navigation. Static mock data only. Ready to promote
              through the route flag when the portal concept is approved.
            </p>
            <div className="flex flex-wrap gap-2">
              <Tag>Coming soon</Tag>
              <Tag>No auth</Tag>
              <Tag>No data fetch</Tag>
            </div>
          </SurfaceCard>
        </div>
      </SiteSection>

      <SiteSection className="pt-0" tone="compact">
        <div className="reveal overflow-hidden rounded-lg border border-border bg-surface shadow-panel">
          <div className="grid lg:grid-cols-[230px_minmax(0,1fr)]">
            <aside className="border-b border-border bg-bg p-4 lg:border-b-0 lg:border-r">
              <div className="space-y-5">
                <div>
                  <p className={finePrintClass}>Portal preview</p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-text">
                    Delivery workspace
                  </h2>
                </div>

                <nav aria-label="Portal preview sections" className="grid gap-1">
                  {portalNavItems.map((item, index) => (
                    <a
                      className={cx(
                        'rounded-md px-3 py-2 text-sm font-semibold transition',
                        index === 0
                          ? 'bg-primary text-white'
                          : 'text-text-muted hover:bg-elevated hover:text-text',
                      )}
                      href={`#portal-${item.toLowerCase()}`}
                      key={item}
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="grid gap-5 p-4 sm:p-5 lg:p-6">
              <div className="grid gap-4 md:grid-cols-3" id="portal-overview">
                {previewCards.map((card) => (
                  <SurfaceCard className="shadow-none" key={card.label} padding="compact">
                    <p className={finePrintClass}>{card.label}</p>
                    <p className="mt-2 font-mono text-lg font-semibold text-text">
                      {card.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-text-muted">{card.detail}</p>
                  </SurfaceCard>
                ))}
              </div>

              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
                <SurfaceCard className="shadow-none" id="portal-environments">
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className={finePrintClass}>Environment health</p>
                      <h3 className={headingClasses.card}>Sample operating view.</h3>
                    </div>
                    <Tag>Preview data</Tag>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[620px] text-left text-sm">
                      <thead className="border-b border-border text-text-muted">
                        <tr>
                          <th className="py-3 pr-4 font-semibold" scope="col">Environment</th>
                          <th className="py-3 pr-4 font-semibold" scope="col">Status</th>
                          <th className="py-3 pr-4 font-semibold" scope="col">Release</th>
                          <th className="py-3 font-semibold" scope="col">Owner</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {environments.map((environment) => (
                          <tr key={environment.name}>
                            <td className="py-3 pr-4 font-semibold text-text">
                              {environment.name}
                            </td>
                            <td className="py-3 pr-4 text-text-muted">{environment.status}</td>
                            <td className="py-3 pr-4 text-text-muted">{environment.release}</td>
                            <td className="py-3 text-text-muted">{environment.owner}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SurfaceCard>

                <SurfaceCard className="shadow-none" id="portal-deployments">
                  <p className={finePrintClass}>Deployment status</p>
                  <div className="mt-4 grid gap-3">
                    {deploymentCards.map(([name, status, detail]) => (
                      <div className="rounded-lg border border-border bg-elevated p-4" key={name}>
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-text">{name}</p>
                          <span className="h-2.5 w-2.5 rounded-full bg-success" />
                        </div>
                        <p className="mt-2 text-sm font-semibold text-accent-deep">{status}</p>
                        <p className="mt-1 text-sm leading-6 text-text-muted">{detail}</p>
                      </div>
                    ))}
                  </div>
                </SurfaceCard>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_330px]">
                <SurfaceCard className="shadow-none" id="portal-activity">
                  <p className={finePrintClass}>Activity feed</p>
                  <div className="mt-4 grid gap-3">
                    {activityItems.map((item) => (
                      <div className="flex gap-3 rounded-lg border border-border bg-elevated p-4" key={item}>
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        <p className={cx(bodyClass, 'text-sm')}>{item}</p>
                      </div>
                    ))}
                  </div>
                </SurfaceCard>

                <SurfaceCard className="shadow-none">
                  <div className="space-y-3">
                    <Eyebrow>Updates</Eyebrow>
                    <h3 className={headingClasses.card}>Get notified when this becomes real.</h3>
                    <p className={bodyClass}>
                      This form is client-only in the preview and does not store
                      email addresses.
                    </p>
                  </div>

                  <form className="mt-5 grid gap-3" onSubmit={handleSubmit}>
                    <label className="field">
                      <span>Email</span>
                      <input
                        autoComplete="email"
                        onChange={(event) => {
                          setEmail(event.target.value)
                          setMessage('')
                        }}
                        placeholder="you@company.com"
                        required
                        type="email"
                        value={email}
                      />
                    </label>
                    <button className="button button--primary" type="submit">
                      Get notified
                    </button>
                    {message ? (
                      <p aria-live="polite" className={metaClass} role="status">
                        {message}
                      </p>
                    ) : null}
                  </form>
                </SurfaceCard>
              </div>
            </div>
          </div>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <CtaBand
          actions={
            <>
              <ButtonLink href="/contact" variant="secondary">
                Request scope
              </ButtonLink>
              <ButtonLink className="text-white hover:text-white" href="/services" variant="ghost">
                View services
              </ButtonLink>
            </>
          }
          description="The portal is a future support surface. Current consulting conversations should still start with scope, environment, timeline, and expected outcome."
          title="Need a scoped delivery workspace for future work?"
        />
      </SiteSection>
    </>
  )
}
