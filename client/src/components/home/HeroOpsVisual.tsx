import {
  MetricBlock,
  PipelineDiagram,
  SurfaceCard,
  Terminal,
} from '../site/ui'

const terminalLines = [
  { command: 'terraform plan -out=tfplan' },
  { output: 'Plan: 20 to add, 0 to change, 0 to destroy.' },
  { command: 'gh workflow run deploy.yml --ref main' },
  { output: 'Workflow queued: lint -> build -> audit -> deploy' },
  { command: 'kubectl rollout status deploy/platform-api' },
  { output: 'deployment "platform-api" successfully rolled out' },
]

export default function HeroOpsVisual() {
  return (
    <SurfaceCard className="grid gap-4" padding="compact" tone="accent">
      <Terminal lines={terminalLines} title="release-check" />

      <div className="grid gap-3 sm:grid-cols-3">
        <MetricBlock
          label="Infra"
          value="IaC"
          detail="Terraform-managed environments."
        />
        <MetricBlock
          label="Delivery"
          value="CI/CD"
          detail="Quality gates before deploy."
        />
        <MetricBlock
          label="Ops"
          value="SLO"
          detail="Health and rollback checks."
        />
      </div>

      <PipelineDiagram steps={['Plan', 'Build', 'Audit', 'Deploy', 'Verify']} />
    </SurfaceCard>
  )
}
