import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react'
import {
  bodyClass,
  buttonToneClasses,
  cx,
  eyebrowClass,
  eyebrowLineClass,
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

export function SiteSection({
  children,
  className,
  id,
  tone = 'default',
}: HTMLAttributes<HTMLElement> & {
  tone?: SectionTone
}) {
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
        'flex flex-col gap-4',
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
}: HTMLAttributes<HTMLDivElement> & {
  padding?: SurfacePadding
  tone?: SurfaceTone
}) {
  return (
    <div
      className={cx(
        surfaceToneClasses[tone],
        surfacePaddingClasses[padding],
        className,
      )}
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
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant
}) {
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
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}) {
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
}: {
  children: ReactNode
  className?: string
}) {
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
