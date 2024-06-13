import helmet, { HelmetOptions } from 'helmet'

export const helmetConfig: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'img-src': ["'self'", 'https:'],
      'script-src': ["'self'", "'unsafe-inline'"]
    }
  }
}
