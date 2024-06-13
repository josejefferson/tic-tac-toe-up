import { useEffect } from 'react'
import { useGameSocket } from '../components/game/socket'

export function useSocketEvent<IncomingMessage extends any[] = any[], OutcomingMessage extends any[] = any[]>(
  event: string,
  callback?: (...data: IncomingMessage) => void
) {
  const { socket } = useGameSocket()

  useEffect(() => {
    if (!callback) return

    socket.on(event, callback)

    return () => {
      socket.off(event, callback)
    }
  }, [callback, event, socket])

  return (...args: OutcomingMessage) => {
    socket.emit(event, ...args)
  }
}
