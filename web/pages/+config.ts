import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'

export default {
  extends: vikeReact,
  filesystemRoutingRoot: '/',
  passToClient: ['routeParams', 'host', 'user']
} satisfies Config
