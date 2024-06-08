import type { PageContext } from 'vike/types'

export function title(pageContext: PageContext) {
  const pageTitle = 'Administration'
  const siteTitle = 'Vike + NestJS Template'
  return [pageTitle, siteTitle].join(' | ')
}
