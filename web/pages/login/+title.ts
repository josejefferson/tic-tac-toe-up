import type { PageContext } from 'vike/types'

export function title(pageContext: PageContext) {
  const pageTitle = 'Log in'
  const siteTitle = 'Vike + NestJS Template'
  return [pageTitle, siteTitle].join(' | ')
}
