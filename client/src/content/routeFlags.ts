export const optionalRouteFlags = {
  blog: false,
  portal: false,
} as const

export const optionalRoutes = [
  {
    enabled: optionalRouteFlags.blog,
    href: '/blog',
    label: 'Blog',
  },
  {
    enabled: optionalRouteFlags.portal,
    href: '/portal',
    label: 'Portal',
  },
] as const
