import {
  ArchitectureDiagram,
  Button,
  ButtonLink,
  CodeBlock,
  CtaBand,
  FaqAccordion,
  KpiStrip,
  PageIntro,
  PipelineDiagram,
  SiteSection,
  SubNav,
  SurfaceCard,
  Terminal,
  TextInput,
  TextareaField,
  TrustChips,
} from '../components/site/ui'

const trustItems = [
  'Terraform',
  'Docker',
  'Kubernetes',
  'GitHub Actions',
  'AWS',
  'Prometheus',
  'TypeScript',
]

const kpiItems = [
  {
    label: 'Pipeline',
    value: 'green',
    detail: 'Build, test, scan, and deploy gates passed.',
  },
  {
    label: 'Release',
    value: '4 stages',
    detail: 'Plan through production rollout.',
  },
  {
    label: 'Runtime',
    value: 'Vite 8',
    detail: 'Rolldown-backed client build.',
  },
  {
    label: 'Audit',
    value: '0 high',
    detail: 'High-severity audit gate is clean.',
  },
]

const terminalLines = [
  { command: 'terraform plan -out=tfplan' },
  { output: 'Plan: 8 to add, 0 to change, 0 to destroy.' },
  { command: 'gh workflow run deploy.yml' },
  { output: 'Workflow queued for production release.' },
  { command: 'kubectl rollout status deploy/web' },
  { output: 'deployment "web" successfully rolled out' },
]

const codeSample = `npm ci
npm run build:client
npm audit --audit-level=high`

export function ComponentPreviewPage() {
  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="grid gap-8">
          <PageIntro
            description="Reusable UI primitives for the achille.tech redesign, shown with production-like DevOps content."
            eyebrow="Dev preview"
            size="page"
            title="Component primitives"
          />

          <SubNav
            currentHref="#overview"
            items={[
              { href: '#overview', label: 'Overview' },
              { href: '#visuals', label: 'Visuals' },
              { href: '#forms', label: 'Forms' },
              { href: '#faq', label: 'FAQ' },
            ]}
          />
        </div>
      </SiteSection>

      <SiteSection id="overview" tone="compact">
        <div className="grid gap-6">
          <TrustChips items={trustItems} />
          <KpiStrip items={kpiItems} />
          <CtaBand
            actions={
              <>
                <ButtonLink href="/contact" variant="secondary">
                  Get in touch
                </ButtonLink>
                <ButtonLink href="/work" variant="ghost">
                  View work
                </ButtonLink>
              </>
            }
            description="A compact CTA band for closing sections and route-level calls to action."
            title="Need a delivery platform that is easier to review and operate?"
          />
        </div>
      </SiteSection>

      <SiteSection id="visuals" tone="compact">
        <div className="grid gap-6 lg:grid-cols-2">
          <Terminal lines={terminalLines} />
          <CodeBlock code={codeSample} language="shell" />
          <SurfaceCard className="lg:col-span-2">
            <PipelineDiagram />
          </SurfaceCard>
          <ArchitectureDiagram className="lg:col-span-2" />
        </div>
      </SiteSection>

      <SiteSection id="forms" tone="compact">
        <SurfaceCard className="max-w-2xl">
          <form className="grid gap-5">
            <TextInput
              help="Use a work email for delivery or hiring conversations."
              label="Work email"
              placeholder="you@example.com"
              type="email"
            />
            <TextareaField
              help="A short stack summary is enough for the first pass."
              label="Current delivery friction"
              placeholder="Manual deploys, fragile rollback, missing observability..."
              rows={4}
            />
            <div className="flex flex-wrap gap-3">
              <Button type="button">Send request</Button>
              <Button type="button" variant="secondary">
                Save draft
              </Button>
            </div>
          </form>
        </SurfaceCard>
      </SiteSection>

      <SiteSection id="faq" tone="compact">
        <FaqAccordion
          items={[
            {
              question: 'Does this route ship to production?',
              answer: 'No. PublicSite only renders this preview when import.meta.env.DEV is true.',
            },
            {
              question: 'Do these primitives add dependencies?',
              answer: 'No. The interactive primitives use native buttons, details, forms, and SVG.',
            },
            {
              question: 'Are reduced-motion preferences supported?',
              answer: 'Yes. The global CSS disables transition and animation duration for reduced-motion users.',
            },
          ]}
        />
      </SiteSection>
    </>
  )
}
