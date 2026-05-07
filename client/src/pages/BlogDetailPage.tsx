import {
  ButtonLink,
  CodeBlock,
  CtaBand,
  PageIntro,
  SiteSection,
  SurfaceCard,
  Tag,
  TrustChips,
} from '../components/site/ui'
import {
  bodyClass,
  finePrintClass,
  headingClasses,
  metaClass,
  textLinkClass,
} from '../components/site/styles'
import {
  findBlogArticleBySlug,
  getRelatedBlogArticles,
} from '../content/blog'
import { NotFoundPage } from './NotFoundPage'

interface BlogDetailPageProps {
  slug: string
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

export function BlogDetailPage({ slug }: BlogDetailPageProps) {
  const article = findBlogArticleBySlug(slug)

  if (!article) return <NotFoundPage />

  const relatedArticles = getRelatedBlogArticles(article)

  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="reveal mx-auto max-w-4xl space-y-8">
          <a className={textLinkClass} href="/blog">
            Back to blog
          </a>

          <PageIntro
            description={article.excerpt}
            eyebrow={article.category}
            size="page"
            title={article.title}
          />

          <div className="flex flex-wrap items-center gap-2">
            <Tag>{article.readTime}</Tag>
            <Tag>{formatDate(article.date)}</Tag>
            <Tag>{article.author}</Tag>
          </div>
        </div>
      </SiteSection>

      <SiteSection className="pt-0" tone="compact">
        <div className="reveal grid gap-8 lg:grid-cols-[240px_minmax(0,760px)] lg:justify-center">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <SurfaceCard className="space-y-4" padding="compact">
              <p className={finePrintClass}>On this page</p>
              <nav aria-label="Article table of contents" className="grid gap-2">
                {article.sections.map((section) => (
                  <a
                    className="text-sm font-semibold leading-6 text-text-muted transition hover:text-accent-deep"
                    href={`#${section.id}`}
                    key={section.id}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
              <TrustChips items={article.tags} />
            </SurfaceCard>
          </aside>

          <article className="grid gap-5">
            {article.sections.map((section) => (
              <SurfaceCard className="scroll-mt-28 space-y-4" id={section.id} key={section.id}>
                <h2 className={headingClasses.section}>{section.title}</h2>
                <div className={bodyClass}>{section.body}</div>
                {section.code ? (
                  <CodeBlock
                    code={section.code.value}
                    language={section.code.language}
                  />
                ) : null}
              </SurfaceCard>
            ))}
          </article>
        </div>
      </SiteSection>

      {relatedArticles.length ? (
        <SiteSection tone="compact">
          <div className="reveal mx-auto grid max-w-5xl gap-6">
            <PageIntro
              description="Related notes with overlapping delivery, cloud, or platform topics."
              eyebrow="Related"
              size="section"
              title="Keep reading."
            />

            <div className="grid gap-5 md:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <SurfaceCard className="flex h-full flex-col gap-4" key={relatedArticle.slug} padding="compact">
                  <div className="space-y-2">
                    <p className={finePrintClass}>{relatedArticle.category}</p>
                    <h3 className={headingClasses.card}>{relatedArticle.title}</h3>
                    <p className={bodyClass}>{relatedArticle.excerpt}</p>
                  </div>
                  <p className={metaClass}>{relatedArticle.readTime}</p>
                  <ButtonLink className="mt-auto w-full" href={`/blog/${relatedArticle.slug}`} variant="secondary">
                    Read
                  </ButtonLink>
                </SurfaceCard>
              ))}
            </div>
          </div>
        </SiteSection>
      ) : null}

      <SiteSection tone="compact">
        <CtaBand
          actions={
            <>
              <ButtonLink href="/contact" variant="secondary">
                Discuss the topic
              </ButtonLink>
              <ButtonLink className="text-white hover:text-white" href="/work" variant="ghost">
                View work
              </ButtonLink>
            </>
          }
          description="Use the article as a starting point, then bring the stack, constraints, and outcome you want to improve."
          title="Need similar thinking applied to your environment?"
        />
      </SiteSection>
    </>
  )
}
