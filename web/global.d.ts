import { IncomingHttpHeaders } from 'http'
import { IAuthenticatedUser } from './types/auth'

declare global {
  namespace Vike {
    interface PageContext {
      headers: IncomingHttpHeaders
      cookies: Record<string, string>
      user: IAuthenticatedUser | null
    }
  }
}
