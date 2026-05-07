import { useState } from 'react'
import { blogArticles, blogCategories } from '../content/blog'
import {
  ButtonLink,
  PageIntro,
  SiteSection,
  SurfaceCard,
  Tag,
  TrustChips,
} from '../components/site/ui'
import {
  bodyClass,
  cx,
  finePrintClass,
  headingClasses,
  metaClass,
} from '../components/site/styles'

type BlogCategory = 'All' | (typeof blogCategories)[number]

const categoryFilters: BlogCategory[] = ['All', ...blogCategories]

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function BlogIndexPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<BlogCategory>('All')

  const normalizedQuery = query.trim().toLowerCase()
  const visibleArticles = blogArticles.filter((article) => {
    const matchesCategory = category === 'All' || article.category === category
    const matchesQuery =
      !normalizedQuery ||
      `${article.title} ${article.excerpt} ${article.tags.join(' ')}`
        .toLowerCase()
        .includes(normalizedQuery)

    return matchesCategory && matchesQuery
  })

  return (
    <>
      <SiteSection className="pt-10 sm:pt-14 lg:pt-16">
        <div className="reveal grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <PageIntro
            description="A hidden article index template for future DevOps, cloud, Kubernetes, observability, and full-stack write-ups. No posts are published until real articles are drafted."
            eyebrow="Blog"
            size="page"
            title="Engineering notes, ready when the first real article ships."
          />

          <SurfaceCard className="flex flex-col gap-4" padding="compact" tone="subdued">
            <p className={finePrintClass}>Route status</p>
            <p className={bodyClass}>
              Hidden from navigation. Accessible by URL for review and ready to
              promote through the route flag.
            </p>
            <TrustChips items={['Hidden route', 'No fake posts', 'Template ready']} />
          </SurfaceCard>
        </div>
      </SiteSection>

      <SiteSection className="pt-0" tone="compact">
        <div className="reveal grid gap-5">
          <SurfaceCard className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]" padding="compact">
            <label className="field">
              <span>Search articles</span>
              <input
                aria-label="Search articles"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by topic, stack, or keyword"
                type="search"
                value={query}
              />
            </label>

            <div
              aria-label="Article categories"
              className="flex flex-wrap gap-2 lg:justify-end"
              role="toolbar"
            >
              {categoryFilters.map((item) => (
                <button
                  aria-pressed={category === item}
                  className={cx(
                    'rounded-md border px-3 py-2 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-4 focus:ring-focus/20',
                    category === item
                      ? 'border-primary bg-primary text-white'
                      : 'border-border bg-surface text-text-muted hover:border-accent/40 hover:text-text',
                  )}
                  key={item}
                  onClick={() => setCategory(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </SurfaceCard>

          {visibleArticles.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleArticles.map((article) => (
                <SurfaceCard
                  className="flex h-full flex-col gap-5 transition duration-200 hover:border-accent/40 hover:shadow-card-hover"
                  key={article.slug}
                  padding="compact"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag>{article.category}</Tag>
                      <span className={metaClass}>{article.readTime}</span>
                    </div>
                    <h2 className={headingClasses.card}>{article.title}</h2>
                    <p className={bodyClass}>{article.excerpt}</p>
                  </div>
                  <div className="mt-auto space-y-4 border-t border-border pt-4">
                    <p className={finePrintClass}>
                      {article.author} · {formatDate(article.date)}
                    </p>
                    <TrustChips items={article.tags} />
                    <ButtonLink className="w-full" href={`/blog/${article.slug}`}>
                      Read article
                    </ButtonLink>
                  </div>
                </SurfaceCard>
              ))}
            </div>
          ) : (
            <SurfaceCard className="grid gap-5 text-center" tone="subdued">
              <div className="mx-auto max-w-2xl space-y-3">
                <p className={finePrintClass}>Empty state</p>
                <h2 className={headingClasses.section}>No published articles yet.</h2>
                <p className={bodyClass}>
                  This route is intentionally scaffolded and hidden until there is
                  at least one real article. Add typed entries in
                  <span className="font-mono text-text"> client/src/content/blog.ts </span>
                  when a post is ready.
                </p>
              </div>
              <div className="flex justify-center">
                <ButtonLink href="/contact" variant="secondary">
                  Suggest a topic
                </ButtonLink>
              </div>
            </SurfaceCard>
          )}
        </div>
      </SiteSection>
    </>
  )
}
