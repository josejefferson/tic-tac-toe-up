import type { PageContext } from 'vike/types'

export function title(pageContext: PageContext) {
  const { is404 } = pageContext
  const pageTitle = is404 ? '404 Not Found' : '500 Internal Server Error'
  const siteTitle = 'Tic-Tac-Toe UP!'
  return [pageTitle, siteTitle].join(' | ')
}
