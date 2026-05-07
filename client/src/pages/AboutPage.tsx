import {
  ButtonLink,
  CtaBand,
  Eyebrow,
  PageIntro,
  SiteSection,
  SurfaceCard,
  TrustChips,
} from '../components/site/ui'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
  metaClass,
} from '../components/site/styles'
import { certificationLinks } from '../features/portfolio/content'
import type { ProfileContent } from '../types/site'

interface AboutPageProps {
  profile: ProfileContent
}

const VALUES = [
  {
    title: 'Reliability',
    detail: 'Prefer systems that fail clearly, recover predictably, and are easier to troubleshoot during real incidents.',
  },
  {
    title: 'Automation',
    detail: 'Move repeated release, infrastructure, and validation steps into reviewed code instead of manual checklists.',
  },
  {
    title: 'Clarity',
    detail: 'Make tradeoffs, ownership, and operating steps visible so teams can keep improving after handoff.',
  },
  {
    title: 'Security',
    detail: 'Treat IAM, secrets, pipeline gates, and review boundaries as part of normal delivery work.',
  },
  {
    title: 'Documentation',
    detail: 'Leave runbooks, architecture notes, and decision records close to the system they explain.',
  },
]

const DELIVERY_STEPS = [
  ['Assess', 'Find the friction: release flow, cloud posture, failure modes, and support gaps.'],
  ['Design', 'Choose a practical path that improves reliability without adding ceremony.'],
  ['Automate', 'Codify infrastructure, checks, deployment steps, and repeatable operations.'],
  ['Harden', 'Add rollback, security, observability, and documentation where the system needs it.'],
  ['Operate', 'Hand off clear signals, runbooks, and next improvements.'],
]

const STACK_GROUPS = [
  {
    label: 'Cloud',
    tools: ['AWS', 'Azure', 'GCP', 'EC2', 'S3', 'RDS', 'VPC', 'IAM', 'CloudWatch'],
  },
  {
    label: 'Orchestration',
    tools: ['Kubernetes', 'EKS', 'k3s', 'Docker', 'Helm', 'Kustomize', 'ArgoCD'],
  },
  {
    label: 'IaC',
    tools: ['Terraform', 'CloudFormation', 'Pulumi', 'Ansible'],
  },
  {
    label: 'CI/CD',
    tools: ['GitHub Actions', 'Jenkins', 'GitLab CI/CD', 'Azure DevOps', 'JFrog'],
  },
  {
    label: 'Observability',
    tools: ['Prometheus', 'Grafana', 'ELK Stack', 'OpenTelemetry', 'Datadog'],
  },
  {
    label: 'Languages',
    tools: ['TypeScript', 'JavaScript', 'Python', 'Bash', 'Node.js', 'React'],
  },
]

function SnapshotItem({
  label,
  value,
}: {
  label: string
  value: string | undefined
}) {
  if (!value) return null

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className={finePrintClass}>{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-text">{value}</p>
    </div>
  )
}

export function AboutPage({ profile }: AboutPageProps) {
  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="reveal grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div className="space-y-8">
            <PageIntro
              description={profile.about}
              eyebrow="About"
              size="page"
              title="DevOps engineering for release systems that teams can trust."
            />

            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <ButtonLink className="w-full sm:w-auto" href="/contact">
                Get in touch
              </ButtonLink>
              <ButtonLink
                download
                className="w-full sm:w-auto"
                href={profile.links.resume}
                rel="noreferrer"
                target="_blank"
                variant="secondary"
              >
                Download resume
              </ButtonLink>
            </div>

            <SurfaceCard className="grid gap-5 md:grid-cols-3" padding="compact" tone="subdued">
              <div>
                <p className={finePrintClass}>Cloud foundations</p>
                <p className={cx(bodyClass, 'mt-2 text-sm')}>
                  AWS infrastructure, Terraform workflows, IAM boundaries, and repeatable environments.
                </p>
              </div>
              <div>
                <p className={finePrintClass}>Delivery systems</p>
                <p className={cx(bodyClass, 'mt-2 text-sm')}>
                  CI/CD, Kubernetes, GitOps, release checks, and operational handoff.
                </p>
              </div>
              <div>
                <p className={finePrintClass}>Application delivery</p>
                <p className={cx(bodyClass, 'mt-2 text-sm')}>
                  React, TypeScript, Node.js, APIs, data models, and deployment paths.
                </p>
              </div>
            </SurfaceCard>
          </div>

          <SurfaceCard className="flex flex-col gap-4" padding="compact">
            <p className={finePrintClass}>Snapshot</p>
            <SnapshotItem label="Current role" value={profile.currentEmployer} />
            <SnapshotItem label="Previous role" value={profile.previousEmployer} />
            <SnapshotItem label="Education" value={profile.education} />
            <SnapshotItem label="Location" value={profile.location} />
          </SurfaceCard>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <div className="reveal grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4">
            <Eyebrow>Delivery approach</Eyebrow>
            <h2 className={headingClasses.section}>Assess first, then automate the path out.</h2>
            <p className={bodyClass}>
              I focus on the operating shape of the system: how changes are reviewed,
              deployed, observed, recovered, and explained to the team that owns it.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {DELIVERY_STEPS.map(([title, detail], index) => (
              <SurfaceCard className="flex h-full flex-col gap-4" key={title} padding="compact">
                <span className="font-mono text-sm font-semibold text-accent-deep">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-semibold text-text">{title}</h3>
                  <p className={cx(bodyClass, 'text-sm')}>{detail}</p>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <div className="reveal grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <SurfaceCard className="flex flex-col gap-5">
            <div className="space-y-3">
              <Eyebrow>Values</Eyebrow>
              <h2 className={headingClasses.section}>How I evaluate the work.</h2>
              <p className={bodyClass}>
                The strongest platform changes are practical, documented, and
                easy to keep operating after the first implementation.
              </p>
            </div>
          </SurfaceCard>

          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((value) => (
              <SurfaceCard className="flex h-full flex-col gap-3" key={value.title} padding="compact">
                <h3 className={headingClasses.card}>{value.title}</h3>
                <p className={bodyClass}>{value.detail}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <div className="reveal grid gap-6">
          <PageIntro
            description="Grouped by how the tools are used in delivery work: foundations, orchestration, infrastructure as code, release automation, observability, and implementation."
            eyebrow="Tool stack"
            size="section"
            title="The stack behind the work."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {STACK_GROUPS.map((group) => (
              <SurfaceCard className="flex h-full flex-col gap-4" key={group.label} padding="compact">
                <p className={finePrintClass}>{group.label}</p>
                <TrustChips items={group.tools} />
              </SurfaceCard>
            ))}
          </div>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <div className="reveal grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4">
            <Eyebrow>Experience</Eyebrow>
            <h2 className={headingClasses.section}>Current role, prior cloud work, and education.</h2>
          </div>

          <div className="grid gap-4">
            {profile.timeline.map((item) => (
              <SurfaceCard className="flex flex-col gap-3" key={`${item.title}-${item.period}`} padding="compact">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={headingClasses.card}>{item.title}</h3>
                  <p className={metaClass}>{item.period}</p>
                </div>
                <p className={bodyClass}>{item.detail}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <div className="reveal grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4">
            <Eyebrow>Certifications</Eyebrow>
            <h2 className={headingClasses.section}>Verified credentials and continuing education.</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {profile.certifications.map((item) => {
              const url = certificationLinks[item]

              return url ? (
                <a
                  className="rounded-lg border border-border bg-surface p-4 text-sm font-semibold leading-6 text-text transition hover:border-accent/40 hover:text-accent-deep"
                  href={url}
                  key={item}
                  rel="noreferrer"
                  target="_blank"
                >
                  {item}
                </a>
              ) : (
                <div
                  className="rounded-lg border border-border bg-surface p-4 text-sm font-semibold leading-6 text-text"
                  key={item}
                >
                  {item}
                </div>
              )
            })}
          </div>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <CtaBand
          actions={
            <>
              <ButtonLink href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
              <ButtonLink className="text-white hover:text-white" href="/work" variant="ghost">
                View work
              </ButtonLink>
            </>
          }
          description="Use the project library and services page as reference points, then send the release, cloud, platform, or full-stack problem you want to discuss."
          title="Open to senior DevOps and SRE roles, plus focused cloud delivery work."
        />
      </SiteSection>
    </>
  )
}
