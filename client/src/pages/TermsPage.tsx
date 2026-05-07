import { ButtonLink, PageIntro, SiteSection, SurfaceCard } from '../components/site/ui'
import { bodyClass, finePrintClass, headingClasses } from '../components/site/styles'

const TERMS_SECTIONS = [
  {
    title: 'Use of the site',
    body: 'This site is a personal portfolio for reviewing professional background, services, projects, and contact options. Do not use the forms for spam, abusive messages, or unlawful content.',
  },
  {
    title: 'Project information',
    body: 'Project descriptions are provided for evaluation and portfolio context. External repositories and live project links may have their own terms or licenses.',
  },
  {
    title: 'No warranty',
    body: 'The site is provided as-is. While the content is maintained with care, availability and accuracy are not guaranteed for every external link or third-party service.',
  },
  {
    title: 'Professional conversations',
    body: 'Submitting a form does not create a contract, employment relationship, consulting agreement, or confidentiality obligation unless both sides agree in writing.',
  },
]

export function TermsPage() {
  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="reveal mx-auto max-w-3xl">
          <PageIntro
            description="Simple terms for using this portfolio, contacting Ali, and reviewing project information."
            eyebrow="Terms"
            size="page"
            title="Terms of use."
          />
        </div>
      </SiteSection>

      <SiteSection className="pt-0" tone="compact">
        <div className="reveal mx-auto grid max-w-3xl gap-4">
          <SurfaceCard className="flex flex-col gap-2" padding="compact" tone="subdued">
            <p className={finePrintClass}>Last updated</p>
            <p className={bodyClass}>May 7, 2026</p>
          </SurfaceCard>

          {TERMS_SECTIONS.map((section) => (
            <SurfaceCard className="space-y-3" key={section.title}>
              <h2 className={headingClasses.card}>{section.title}</h2>
              <p className={bodyClass}>{section.body}</p>
            </SurfaceCard>
          ))}

          <SurfaceCard className="space-y-4" tone="subdued">
            <h2 className={headingClasses.card}>Questions</h2>
            <p className={bodyClass}>
              For questions about these terms or project usage, contact Ali through
              the public contact page.
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
