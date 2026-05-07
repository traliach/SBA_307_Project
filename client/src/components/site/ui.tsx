import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'
import { useId, useState } from 'react'
import {
  bodyClass,
  buttonToneClasses,
  cx,
  eyebrowClass,
  eyebrowLineClass,
  finePrintClass,
  headingClasses,
  leadClass,
  sectionToneClasses,
  siteContainerClass,
  surfacePaddingClasses,
  surfaceToneClasses,
  tagClass,
  textLinkClass,
} from './styles'

type ButtonVariant = keyof typeof buttonToneClasses
type SectionTone = 'default' | 'compact'
type SurfaceTone = keyof typeof surfaceToneClasses
type SurfacePadding = keyof typeof surfacePaddingClasses

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: SurfacePadding
  tone?: SurfaceTone
}

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export interface TagProps {
  children: ReactNode
  className?: string
}

/*
 * Phase 2 primitive usage examples:
 * <Section><Card><Button>Request scope</Button></Card></Section>
 * <TrustChips items={["Terraform", "Kubernetes"]} />
 * <FaqAccordion items={[{ question: "What changes?", answer: "Client UI only." }]} />
 */

export function SiteSection({
  children,
  className,
  id,
  tone = 'default',
}: SectionProps) {
  return (
    <section className={cx(sectionToneClasses[tone], className)} id={id}>
      <div className={cx(siteContainerClass, 'relative')}>{children}</div>
    </section>
  )
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span className={cx(eyebrowClass, className)}>
      <span aria-hidden className={eyebrowLineClass} />
      {children}
    </span>
  )
}

export function PageIntro({
  align = 'left',
  description,
  eyebrow,
  size = 'page',
  title,
}: {
  align?: 'left' | 'center'
  description?: ReactNode
  eyebrow: ReactNode
  size?: 'page' | 'section' | 'display'
  title: ReactNode
}) {
  return (
    <div
      className={cx(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
      )}
    >
      <Eyebrow className={align === 'center' ? 'justify-center' : ''}>{eyebrow}</Eyebrow>
      <div className={cx('flex flex-col gap-4', align === 'center' && 'items-center')}>
        <h1
          className={
            size === 'display'
              ? headingClasses.display
              : size === 'section'
                ? headingClasses.section
                : headingClasses.page
          }
        >
          {title}
        </h1>
        {description ? <div className={cx(leadClass, align === 'center' && 'mx-auto')}>{description}</div> : null}
      </div>
    </div>
  )
}

export function SurfaceCard({
  children,
  className,
  padding = 'default',
  tone = 'default',
  ...props
}: CardProps) {
  return (
    <div
      className={cx(
        surfaceToneClasses[tone],
        surfacePaddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function ButtonLink({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cx(buttonToneClasses[variant], className)}
      {...props}
    >
      {children}
    </a>
  )
}

export function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(buttonToneClasses[variant], className)}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export function Tag({
  children,
  className,
}: TagProps) {
  return <span className={cx(tagClass, className)}>{children}</span>
}

export function TextLink({
  children,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cx(textLinkClass, className)} {...props}>
      {children}
    </a>
  )
}

export function BodyCopy({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <p className={cx(bodyClass, className)}>{children}</p>
}

export interface KpiStripItem {
  label: string
  value: string
  detail?: string
}

export interface KpiStripProps {
  items: KpiStripItem[]
  className?: string
}

export function KpiStrip({ className, items }: KpiStripProps) {
  return (
    <div className={cx('grid gap-3 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {items.map((item) => (
        <MetricBlock
          detail={item.detail}
          key={`${item.label}-${item.value}`}
          label={item.label}
          value={item.value}
        />
      ))}
    </div>
  )
}

export interface TrustChipsProps {
  items: string[]
  className?: string
}

export function TrustChips({ className, items }: TrustChipsProps) {
  return (
    <div className={cx('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  )
}

export interface CtaBandProps {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  className?: string
}

export function CtaBand({
  actions,
  className,
  description,
  title,
}: CtaBandProps) {
  return (
    <section
      className={cx(
        'rounded-lg border border-accent/30 bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] p-6 text-white shadow-glow sm:p-8 lg:p-10',
        className,
      )}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-3xl space-y-3">
          <h2 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <div className="text-sm leading-7 text-white/80 sm:text-base">
              {description}
            </div>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  )
}

export interface MetricBlockProps {
  label: string
  value: string
  detail?: string
  className?: string
}

export function MetricBlock({
  className,
  detail,
  label,
  value,
}: MetricBlockProps) {
  return (
    <div className={cx('rounded-lg border border-border bg-surface p-4', className)}>
      <p className={finePrintClass}>{label}</p>
      <p className="mt-2 break-words font-mono text-lg font-semibold leading-7 text-text">
        {value}
      </p>
      {detail ? <p className="mt-2 text-sm leading-6 text-text-muted">{detail}</p> : null}
    </div>
  )
}

export interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({
  className,
  code,
  language = 'bash',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard?.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div
      className={cx(
        'overflow-hidden rounded-lg border border-border bg-[#07111f] shadow-card',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-normal text-text-muted">
          {language}
        </span>
        <button
          className="rounded-md border border-border px-2.5 py-1 text-xs font-semibold text-text-muted transition hover:border-accent/40 hover:text-accent-deep focus:outline-none focus:ring-4 focus:ring-focus/20"
          onClick={() => void handleCopy()}
          type="button"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-7 text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export interface TerminalLine {
  command?: string
  output?: string
}

export interface TerminalProps {
  title?: string
  lines: TerminalLine[]
  className?: string
}

export function Terminal({
  className,
  lines,
  title = 'ops-console',
}: TerminalProps) {
  return (
    <div
      aria-label={title}
      className={cx(
        'overflow-hidden rounded-lg border border-border bg-[#07111f] font-mono text-sm shadow-panel',
        className,
      )}
      role="img"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-error" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning" />
        <span className="h-2.5 w-2.5 rounded-full bg-success" />
        <span className="ml-2 text-xs font-semibold text-text-muted">{title}</span>
      </div>
      <div className="grid gap-2 p-4">
        {lines.map((line, index) => (
          <div
            className="animate-fade-up"
            key={`${line.command ?? line.output ?? 'line'}-${index}`}
            style={{ animationDelay: `${Math.min(index * 40, 240)}ms` }}
          >
            {line.command ? (
              <p className="text-slate-100">
                <span className="text-accent-deep">$ </span>
                {line.command}
              </p>
            ) : null}
            {line.output ? <p className="pl-4 text-text-muted">{line.output}</p> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export interface PipelineDiagramProps {
  className?: string
  steps?: string[]
}

export function PipelineDiagram({
  className,
  steps = ['Plan', 'Build', 'Test', 'Scan', 'Deploy'],
}: PipelineDiagramProps) {
  return (
    <svg
      aria-label="CI/CD pipeline diagram"
      className={cx('h-auto w-full text-text', className)}
      role="img"
      viewBox="0 0 760 160"
    >
      <rect fill="var(--color-surface)" height="160" rx="8" width="760" />
      <g transform="translate(36 50)">
        {steps.map((step, index) => {
          const x = index * 140
          const isLast = index === steps.length - 1

          return (
            <g key={step}>
              <rect
                fill="var(--color-elevated)"
                height="56"
                rx="8"
                stroke="var(--color-border)"
                width="104"
                x={x}
              />
              <text
                fill="var(--color-text)"
                fontFamily="var(--font-mono)"
                fontSize="14"
                fontWeight="600"
                textAnchor="middle"
                x={x + 52}
                y="34"
              >
                {step}
              </text>
              {!isLast ? (
                <>
                  <line
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                    x1={x + 110}
                    x2={x + 132}
                    y1="28"
                    y2="28"
                  />
                  <path
                    d={`M ${x + 132} 22 L ${x + 140} 28 L ${x + 132} 34`}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </>
              ) : null}
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export interface ArchitectureDiagramProps {
  className?: string
  title?: string
  nodes?: string[]
}

export function ArchitectureDiagram({
  className,
  nodes = ['Vercel SPA', 'Express API', 'MongoDB Atlas', 'Email service'],
  title = 'Cloud delivery architecture',
}: ArchitectureDiagramProps) {
  return (
    <div className={cx('rounded-lg border border-border bg-surface p-4', className)}>
      <p className={finePrintClass}>{title}</p>
      <svg aria-label={title} className="mt-4 h-auto w-full" role="img" viewBox="0 0 680 240">
        <rect fill="var(--color-bg)" height="240" rx="8" width="680" />
        {nodes.map((node, index) => {
          const row = Math.floor(index / 2)
          const col = index % 2
          const x = 52 + col * 320
          const y = 44 + row * 92

          return (
            <g key={node}>
              <rect
                fill="var(--color-elevated)"
                height="58"
                rx="8"
                stroke="var(--color-border)"
                width="240"
                x={x}
                y={y}
              />
              <text
                fill="var(--color-text)"
                fontFamily="var(--font-sans)"
                fontSize="14"
                fontWeight="600"
                textAnchor="middle"
                x={x + 120}
                y={y + 35}
              >
                {node}
              </text>
            </g>
          )
        })}
        <path
          d="M 292 73 C 335 73 335 73 372 73 M 172 102 C 172 136 172 136 172 165 M 492 102 C 492 136 492 136 492 165 M 292 194 C 335 194 335 194 372 194"
          fill="none"
          stroke="var(--color-accent)"
          strokeDasharray="6 6"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

export interface FaqItem {
  question: string
  answer: ReactNode
}

export interface FaqAccordionProps {
  items: FaqItem[]
  className?: string
}

export function FaqAccordion({ className, items }: FaqAccordionProps) {
  return (
    <div className={cx('grid gap-3', className)}>
      {items.map((item) => (
        <details
          className="group rounded-lg border border-border bg-surface p-4 open:shadow-card"
          key={item.question}
        >
          <summary className="cursor-pointer list-none font-semibold text-text marker:hidden focus:outline-none focus:ring-4 focus:ring-focus/20">
            <span className="flex items-center justify-between gap-4">
              {item.question}
              <span className="text-accent-deep transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <div className="mt-3 text-sm leading-7 text-text-muted">{item.answer}</div>
        </details>
      ))}
    </div>
  )
}

export interface FormFieldProps {
  label: string
  help?: ReactNode
  error?: ReactNode
  children: ReactNode
  className?: string
}

export function FormField({
  children,
  className,
  error,
  help,
  label,
}: FormFieldProps) {
  return (
    <label className={cx('flex flex-col gap-2.5', className)}>
      <span className="text-sm font-semibold text-text">{label}</span>
      {children}
      {help ? <span className="text-xs leading-5 text-text-muted">{help}</span> : null}
      {error ? <span className="text-xs font-semibold leading-5 text-error">{error}</span> : null}
    </label>
  )
}

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  help?: ReactNode
  error?: ReactNode
}

export function TextInput({
  error,
  help,
  id,
  label,
  ...props
}: TextInputProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  return (
    <FormField error={error} help={help} label={label}>
      <input aria-invalid={Boolean(error)} id={fieldId} {...props} />
    </FormField>
  )
}

export interface TextareaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  help?: ReactNode
  error?: ReactNode
}

export function TextareaField({
  error,
  help,
  id,
  label,
  ...props
}: TextareaFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  return (
    <FormField error={error} help={help} label={label}>
      <textarea aria-invalid={Boolean(error)} id={fieldId} {...props} />
    </FormField>
  )
}

export interface SubNavItem {
  href: string
  label: string
}

export interface SubNavProps {
  items: SubNavItem[]
  currentHref?: string
  className?: string
}

export function SubNav({ className, currentHref, items }: SubNavProps) {
  return (
    <nav
      aria-label="Section navigation"
      className={cx(
        'sticky top-[76px] z-30 flex gap-1 overflow-x-auto border-y border-border bg-bg/90 py-2 backdrop-blur',
        className,
      )}
    >
      {items.map((item) => (
        <a
          aria-current={currentHref === item.href ? 'page' : undefined}
          className={cx(
            'whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-text-muted transition hover:bg-elevated hover:text-text',
            currentHref === item.href && 'bg-primary text-white hover:bg-primary hover:text-white',
          )}
          href={item.href}
          key={item.href}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

export const Section = SiteSection
export const Card = SurfaceCard

const SitePrimitives = {
  ArchitectureDiagram,
  BodyCopy,
  Button,
  ButtonLink,
  Card,
  CodeBlock,
  CtaBand,
  Eyebrow,
  FaqAccordion,
  FormField,
  KpiStrip,
  MetricBlock,
  PageIntro,
  PipelineDiagram,
  Section,
  SiteSection,
  SubNav,
  SurfaceCard,
  Tag,
  Terminal,
  TextInput,
  TextLink,
  TextareaField,
  TrustChips,
}

export default SitePrimitives
