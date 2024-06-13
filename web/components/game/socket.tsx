import { useSocket } from '@josejefferson/socket.io-react-hook'
import { usePageContext } from 'vike-react/usePageContext'

export function useGameSocket() {
  const { routeParams } = usePageContext()
  const id = routeParams?.roomID
  return useSocket(id ? '/room' : '/', { query: { id } })
}
