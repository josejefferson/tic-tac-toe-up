import { useToast } from '@chakra-ui/react'
import { getErrorMessage } from '../../components/error/errors'
import { useSocketEvent } from '../../utils/socket'
import { useGameSocket } from './socket'

export function useSocketException() {
  const toast = useToast()
  const { socket } = useGameSocket()

  useSocketEvent<any>('exception', (err) => {
    toast({
      title: 'Error',
      description: getErrorMessage(err),
      status: 'error',
      position: 'top-right',
      duration: 3000,
      isClosable: true
    })
    socket.emit('sync')
  })
}
