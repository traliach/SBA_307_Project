import { TestimonialSubmissionCard } from '../components/site/TestimonialSubmissionCard'
import {
  Button,
  ButtonLink,
  CtaBand,
  Eyebrow,
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
  textLinkClass,
} from '../components/site/styles'
import type {
  ContactItem,
  ContactSubmissionInput,
  ContactTopic,
  ProfileContent,
  SubmitState,
  TestimonialSubmissionInput,
} from '../types/site'

interface ContactPageProps {
  contactForm: ContactSubmissionInput
  contactItems: ContactItem[]
  contactTopics: ContactTopic[]
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  profile: ProfileContent
  submitMessage: string
  submitState: SubmitState
  testimonialForm: TestimonialSubmissionInput
  testimonialSubmitMessage: string
  testimonialSubmitState: SubmitState
  onTestimonialChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onTestimonialSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

const REQUEST_HINTS = [
  'What is slow or risky today?',
  'Which stack or cloud is involved?',
  'What outcome would make the first reply useful?',
]

const RESPONSE_PATHS = [
  {
    label: 'Hiring',
    detail: 'Senior DevOps, SRE, platform engineering, or full-stack roles.',
  },
  {
    label: 'Consulting',
    detail: 'CI/CD, AWS, Terraform, Kubernetes, observability, or delivery automation.',
  },
  {
    label: 'Technical review',
    detail: 'Architecture, release flow, reliability, or cloud foundation feedback.',
  },
]

function ContactLink({ item }: { item: ContactItem }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 transition duration-200 hover:border-accent/40">
      <p className={finePrintClass}>{item.label}</p>
      {item.href ? (
        <a
          className="mt-2 block break-words text-sm font-semibold leading-6 text-text transition hover:text-accent-deep"
          href={item.href}
          rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
          target={item.href.startsWith('http') ? '_blank' : undefined}
        >
          {item.value}
        </a>
      ) : (
        <p className="mt-2 text-sm font-semibold leading-6 text-text">{item.value}</p>
      )}
    </div>
  )
}

export function ContactPage({
  contactForm,
  contactItems,
  contactTopics,
  onChange,
  onSubmit,
  onTestimonialChange,
  onTestimonialSubmit,
  profile,
  submitMessage,
  submitState,
  testimonialForm,
  testimonialSubmitMessage,
  testimonialSubmitState,
}: ContactPageProps) {
  const remainingCharacters = Math.max(10 - contactForm.message.length, 0)

  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="reveal grid gap-8 xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          <div className="space-y-6">
            <SurfaceCard className="flex flex-col gap-8" padding="roomy" tone="accent">
              <div className="space-y-6">
                <Eyebrow>Contact</Eyebrow>
                <div className="space-y-5">
                  <h1 className={headingClasses.page}>
                    Let&apos;s talk about your delivery platform.
                  </h1>
                  <p className="max-w-3xl text-[1.05rem] leading-8 text-text-muted sm:text-lg">
                    Tell me where the friction is: releases, reliability, cost,
                    security, or full-stack delivery. No lengthy intake process,
                    just enough detail for a useful first reply.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {RESPONSE_PATHS.map((path) => (
                  <div className="rounded-lg border border-border bg-surface p-4" key={path.label}>
                    <p className={finePrintClass}>{path.label}</p>
                    <p className={cx(bodyClass, 'mt-2 text-sm')}>{path.detail}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <Tag>Usually replies within one business day</Tag>
                <Tag>Open to senior DevOps and SRE roles</Tag>
                <Tag>Remote or Newark, NJ area</Tag>
              </div>
            </SurfaceCard>

            <SurfaceCard className="grid gap-4 sm:grid-cols-2" padding="compact">
              {contactItems.map((item) => (
                <ContactLink item={item} key={item.label} />
              ))}
              <div className="rounded-lg border border-border bg-surface p-4 transition duration-200 hover:border-accent/40">
                <p className={finePrintClass}>Security disclosure</p>
                <a
                  className="mt-2 block break-words text-sm font-semibold leading-6 text-text transition hover:text-accent-deep"
                  href={`${profile.links.email}?subject=Security%20disclosure%20for%20achille.tech`}
                >
                  Email responsible disclosure notes
                </a>
              </div>
            </SurfaceCard>
          </div>

          <SurfaceCard className="flex flex-col gap-8 scroll-mt-28" id="request" padding="roomy">
            <div className="space-y-5">
              <Eyebrow>Request</Eyebrow>
              <div className="space-y-4">
                <h2 className={headingClasses.section}>
                  Send the role, project, or delivery problem.
                </h2>
                <p className={bodyClass}>
                  The form keeps the existing API contract intact: name, work
                  email, main challenge, and message. Add company, team size, or
                  budget context inside the message if it helps scope the reply.
                </p>
              </div>
            </div>

            <form className="contact-form" onSubmit={onSubmit}>
              <div className="field-grid">
                <label className="field">
                  <span>Name</span>
                  <input
                    autoComplete="name"
                    name="name"
                    onChange={onChange}
                    placeholder="Your full name"
                    required
                    type="text"
                    value={contactForm.name}
                  />
                </label>

                <label className="field">
                  <span>Work email</span>
                  <input
                    autoComplete="email"
                    name="email"
                    onChange={onChange}
                    placeholder="you@company.com"
                    required
                    type="email"
                    value={contactForm.email}
                  />
                </label>
              </div>

              <label className="field">
                <span>Main challenge</span>
                <select name="inquiryType" onChange={onChange} value={contactForm.inquiryType}>
                  {contactTopics.map((topic) => (
                    <option key={topic.value} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="rounded-lg border border-border bg-elevated p-4">
                <p className={finePrintClass}>Useful context</p>
                <ul className="mt-3 grid gap-2">
                  {REQUEST_HINTS.map((hint) => (
                    <li className="flex gap-3" key={hint}>
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span className={cx(bodyClass, 'text-sm')}>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <label className="field">
                <span className="flex items-center justify-between gap-3">
                  Message
                  <span
                    className={cx(
                      finePrintClass,
                      'font-normal',
                      remainingCharacters > 0 ? 'text-error' : 'text-text-muted',
                    )}
                  >
                    {remainingCharacters > 0
                      ? `${remainingCharacters} more char${remainingCharacters === 1 ? '' : 's'} needed`
                      : `${contactForm.message.length} / 2000`}
                  </span>
                </span>
                <textarea
                  maxLength={2000}
                  name="message"
                  onChange={onChange}
                  placeholder="Example: We have manual releases from Jenkins into AWS, limited rollback visibility, and need a clearer CI/CD path over the next month."
                  required
                  rows={7}
                  value={contactForm.message}
                />
              </label>

              <label className="flex items-start gap-3 rounded-lg border border-border bg-elevated p-4">
                <input
                  className="mt-1 h-4 w-4 flex-shrink-0 rounded border-border"
                  required
                  type="checkbox"
                />
                <span className={cx(bodyClass, 'text-sm')}>
                  I consent to being contacted about this message. This does not
                  add fields to the API payload.
                </span>
              </label>

              <div className="form-actions">
                <Button disabled={submitState === 'submitting'} type="submit">
                  {submitState === 'submitting' ? 'Sending...' : 'Send request'}
                </Button>
                {submitMessage ? (
                  <p
                    aria-live="polite"
                    className={cx(
                      'form-status',
                      submitState === 'success'
                        ? 'form-status--success'
                        : submitState === 'error'
                          ? 'form-status--error'
                          : '',
                    )}
                    role="status"
                  >
                    {submitMessage}
                  </p>
                ) : null}
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
              <p className={metaClass}>Prefer another path?</p>
              <a className={textLinkClass} href={profile.links.email}>
                Email
              </a>
              <a className={textLinkClass} href={profile.links.linkedin} rel="noreferrer" target="_blank">
                LinkedIn
              </a>
              <a className={textLinkClass} href={profile.links.github} rel="noreferrer" target="_blank">
                GitHub
              </a>
            </div>
          </SurfaceCard>
        </div>
      </SiteSection>

      <SiteSection tone="compact">
        <CtaBand
          actions={
            <>
              <ButtonLink href={profile.links.resume} rel="noreferrer" target="_blank" variant="secondary">
                View resume
              </ButtonLink>
              <ButtonLink className="text-white hover:text-white" href="/work" variant="ghost">
                Review work first
              </ButtonLink>
            </>
          }
          description="If this is a hiring conversation, the resume and project library give the fastest technical context before a first call."
          title="Need the short version before reaching out?"
        />
      </SiteSection>

      <SiteSection tone="compact">
        <TestimonialSubmissionCard
          onChange={onTestimonialChange}
          onSubmit={onTestimonialSubmit}
          submitMessage={testimonialSubmitMessage}
          submitState={testimonialSubmitState}
          testimonialForm={testimonialForm}
        />
      </SiteSection>
    </>
  )
}
