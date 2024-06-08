import { PageContextServer } from 'vike/types'
import { IAuthenticatedUser } from '../types/auth'

export async function getPageContext(pageContext: PageContextServer) {
  const user = await getAuthenticatedUser(pageContext)
  pageContext.user = user
}

export async function getAuthenticatedUser({ headers }: PageContextServer) {
  const { serverAPI } = await import('../config/server-api')
  try {
    const { data: user } = await serverAPI.get<IAuthenticatedUser | undefined>('/auth/me', { headers })
    return user || null
  } catch {
    return null
  }
}
