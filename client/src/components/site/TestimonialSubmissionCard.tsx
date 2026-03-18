import type { ChangeEvent, FormEvent } from 'react'
import type {
  SubmitState,
  TestimonialSubmissionInput,
} from '../../types/site'
import { bodyClass, cx, finePrintClass, headingClasses } from './styles'
import { Button, Eyebrow, SurfaceCard } from './ui'

interface TestimonialSubmissionCardProps {
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  submitMessage: string
  submitState: SubmitState
  testimonialForm: TestimonialSubmissionInput
}

export function TestimonialSubmissionCard({
  onChange,
  onSubmit,
  submitMessage,
  submitState,
  testimonialForm,
}: TestimonialSubmissionCardProps) {
  return (
    <SurfaceCard tone="subdued" className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div className="flex flex-col gap-5">
        <div className="space-y-4">
          <Eyebrow>Reference</Eyebrow>
          <div className="space-y-3">
            <h2 className={headingClasses.card}>Worked with me before?</h2>
            <p className={bodyClass}>
              You can submit a short testimonial here for admin review. Nothing is
              published automatically.
            </p>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5">
          <p className={finePrintClass}>Review flow</p>
          <ul className="mt-3 grid gap-3">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
              <span className={bodyClass}>Submit a short quote and role details.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
              <span className={bodyClass}>The testimonial enters the admin moderation queue.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
              <span className={bodyClass}>Approved quotes appear on the public site.</span>
            </li>
          </ul>
        </div>
      </div>

      <form className="contact-form" onSubmit={onSubmit}>
        <div className="field-grid">
          <label className="field">
            <span>Name</span>
            <input name="author" onChange={onChange} value={testimonialForm.author} />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              name="email"
              onChange={onChange}
              type="email"
              value={testimonialForm.email}
            />
          </label>
          <label className="field">
            <span>Role</span>
            <input name="role" onChange={onChange} value={testimonialForm.role} />
          </label>
          <label className="field">
            <span>Company</span>
            <input
              name="company"
              onChange={onChange}
              value={testimonialForm.company}
            />
          </label>
        </div>

        <label className="field">
          <span>Testimonial</span>
          <textarea
            name="quote"
            onChange={onChange}
            rows={5}
            value={testimonialForm.quote}
          />
        </label>

        <div className="form-actions">
          <Button
            disabled={submitState === 'submitting'}
            type="submit"
          >
            {submitState === 'submitting' ? 'Submitting...' : 'Submit for review'}
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
  )
}
