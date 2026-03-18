import { ButtonLink, PageIntro, SiteSection, SurfaceCard } from '../components/site/ui'

export function NotFoundPage() {
  return (
    <SiteSection className="pt-16 sm:pt-20 lg:pt-24">
      <SurfaceCard className="mx-auto flex max-w-3xl flex-col gap-8 text-center" tone="subdued">
        <PageIntro
          align="center"
          description="The route is not available in this portfolio."
          eyebrow="404"
          size="page"
          title="Page not found."
        />

        <div className="flex justify-center">
          <ButtonLink href="/">Back to overview</ButtonLink>
        </div>
      </SurfaceCard>
    </SiteSection>
  )
}
