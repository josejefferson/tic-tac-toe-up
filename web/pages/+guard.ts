import type { PageContextServer } from 'vike/types'
import { getPageContext } from '../utils/context'

export const guard = async (pageContext: PageContextServer) => {
  await getPageContext(pageContext)
}
