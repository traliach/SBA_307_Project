import { ButtonLink, PageIntro, SiteSection, SurfaceCard } from '../components/site/ui'
import { bodyClass, finePrintClass, headingClasses } from '../components/site/styles'

const PRIVACY_SECTIONS = [
  {
    title: 'Information collected',
    body: 'The contact form collects the name, email address, inquiry type, and message you choose to submit. Testimonial submissions collect the quote and attribution details entered into the form.',
  },
  {
    title: 'How it is used',
    body: 'Submitted information is used to reply to messages, review testimonials, and manage portfolio communications. It is not sold or used for third-party advertising.',
  },
  {
    title: 'Where it is processed',
    body: 'The portfolio uses a React client, an Express API, MongoDB Atlas for stored submissions, and email delivery for contact notifications.',
  },
  {
    title: 'Cookies and tracking',
    body: 'This site does not use advertising or marketing cookies. Essential cookies may be used for admin authentication, and a local browser preference may be used to remember the selected color theme.',
  },
  {
    title: 'Your choices',
    body: 'You can request deletion or correction of a submitted message by emailing the address listed on the Contact page.',
  },
]

export function PrivacyPage() {
  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="reveal mx-auto max-w-3xl">
          <PageIntro
            description="A plain-language summary of what this portfolio collects and how submitted information is used."
            eyebrow="Privacy"
            size="page"
            title="Privacy policy."
          />
        </div>
      </SiteSection>

      <SiteSection className="pt-0" tone="compact">
        <div className="reveal mx-auto grid max-w-3xl gap-4">
          <SurfaceCard className="flex flex-col gap-2" padding="compact" tone="subdued">
            <p className={finePrintClass}>Last updated</p>
            <p className={bodyClass}>May 7, 2026</p>
          </SurfaceCard>

          {PRIVACY_SECTIONS.map((section) => (
            <SurfaceCard className="space-y-3" key={section.title}>
              <h2 className={headingClasses.card}>{section.title}</h2>
              <p className={bodyClass}>{section.body}</p>
            </SurfaceCard>
          ))}

          <SurfaceCard className="space-y-4" tone="subdued">
            <h2 className={headingClasses.card}>Contact</h2>
            <p className={bodyClass}>
              For privacy questions or deletion requests, use the contact path
              on this site and include enough detail to identify the submission.
            </p>
            <ButtonLink className="w-full sm:w-auto" href="/contact">
              Contact Ali
            </ButtonLink>
          </SurfaceCard>
        </div>
      </SiteSection>
    </>
  )
}
