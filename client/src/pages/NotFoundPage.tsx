import { ButtonLink, PageIntro, SiteSection, SurfaceCard } from '../components/site/ui'

export function NotFoundPage() {
  return (
    <SiteSection className="pt-16 sm:pt-20 lg:pt-24">
      <SurfaceCard className="mx-auto flex max-w-3xl flex-col gap-8 text-center" tone="subdued">
        <PageIntro
          align="center"
          description="The route is not available in this portfolio. Use one of the primary paths below to get back to the work, services, or contact form."
          eyebrow="404"
          size="page"
          title="Page not found."
        />

        <div className="grid gap-3 sm:flex sm:justify-center">
          <ButtonLink className="w-full sm:w-auto" href="/">
            Home
          </ButtonLink>
          <ButtonLink className="w-full sm:w-auto" href="/work" variant="secondary">
            Work
          </ButtonLink>
          <ButtonLink className="w-full sm:w-auto" href="/contact" variant="ghost">
            Contact
          </ButtonLink>
        </div>
      </SurfaceCard>
    </SiteSection>
  )
}
