import { useSocket } from '@josejefferson/socket.io-react-hook'
import { useEffect } from 'react'

export function useSocketEvent<IncomingMessage extends any[] = any[], OutcomingMessage extends any[] = any[]>(
  event: string,
  callback?: (...data: IncomingMessage) => void
) {
  const { socket } = useSocket()

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
