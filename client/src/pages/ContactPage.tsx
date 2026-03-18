import { TestimonialSubmissionCard } from '../components/site/TestimonialSubmissionCard'
import { Button, ButtonLink, Eyebrow, SiteSection, SurfaceCard } from '../components/site/ui'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
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
  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <SurfaceCard padding="roomy" tone="accent">
            <div className="flex h-full flex-col gap-8">
              <div className="space-y-5">
                <Eyebrow>Contact</Eyebrow>
                <div className="space-y-5">
                  <h1 className={headingClasses.page}>
                    Reach out for roles, interviews, or practical delivery
                    conversations.
                  </h1>
                  <p className="max-w-3xl text-[1.06rem] leading-8 text-slate-700">
                    If you are hiring for DevOps, platform engineering,
                    infrastructure automation, cloud delivery, or an
                    operations-minded software role, I am open to the
                    conversation.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {contactItems.map((item) => (
                  <div
                    className="rounded-[24px] border border-slate-200/80 bg-white/[0.86] p-5"
                    key={item.label}
                  >
                    <p className={finePrintClass}>{item.label}</p>
                    {item.href ? (
                      <a
                        className="mt-2 block text-base font-semibold text-ink transition hover:text-accent-deep"
                        href={item.href}
                        rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-base font-semibold text-ink">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-[24px] border border-slate-200/80 bg-white/[0.86] p-5">
                <p className={finePrintClass}>Good topics to lead with</p>
                <ul className="mt-3 grid gap-3">
                  {contactTopics.slice(0, 4).map((topic) => (
                    <li className="flex gap-3" key={topic.value}>
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span className={bodyClass}>{topic.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink download href={profile.links.resume}>
                  Download resume
                </ButtonLink>
                <ButtonLink
                  href={profile.links.linkedin}
                  rel="noreferrer"
                  target="_blank"
                  variant="secondary"
                >
                  View LinkedIn
                </ButtonLink>
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard className="flex flex-col gap-8" padding="roomy">
            <div className="space-y-4">
              <Eyebrow>Message</Eyebrow>
              <div className="space-y-4">
                <h2 className={headingClasses.section}>
                  Send a note with the role, project, or delivery problem you want
                  to discuss.
                </h2>
                <p className={bodyClass}>
                  I review messages for hiring conversations, delivery work, CI/CD
                  modernization, platform reliability, and software engineering
                  collaboration.
                </p>
              </div>
            </div>

            <form className="contact-form" onSubmit={onSubmit}>
              <div className="field-grid">
                <label className="field">
                  <span>Name</span>
                  <input
                    name="name"
                    onChange={onChange}
                    placeholder="Your full name"
                    required
                    type="text"
                    value={contactForm.name}
                  />
                </label>

                <label className="field">
                  <span>Email</span>
                  <input
                    name="email"
                    onChange={onChange}
                    placeholder="you@example.com"
                    required
                    type="email"
                    value={contactForm.email}
                  />
                </label>
              </div>

              <label className="field">
                <span>Inquiry</span>
                <select name="inquiryType" onChange={onChange} value={contactForm.inquiryType}>
                  {contactTopics.map((topic) => (
                    <option key={topic.value} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Message</span>
                <textarea
                  name="message"
                  onChange={onChange}
                  placeholder="Share the role, project, or delivery challenge you want to discuss."
                  required
                  rows={6}
                  value={contactForm.message}
                />
              </label>

              <div className="form-actions">
                <Button disabled={submitState === 'submitting'} type="submit">
                  {submitState === 'submitting' ? 'Sending...' : 'Send message'}
                </Button>
                {submitMessage ? (
                  <p
                    className={cx(
                      'form-status',
                      submitState === 'success'
                        ? 'form-status--success'
                        : submitState === 'error'
                          ? 'form-status--error'
                          : '',
                    )}
                  >
                    {submitMessage}
                  </p>
                ) : null}
              </div>
            </form>
          </SurfaceCard>
        </div>
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
