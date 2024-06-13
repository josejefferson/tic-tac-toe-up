import { useToast } from '@chakra-ui/react'
import { useSocket } from '@josejefferson/socket.io-react-hook'
import { getErrorMessage } from '../../components/error/errors'
import { useSocketEvent } from '../../utils/socket'

export function useSocketException() {
  const toast = useToast()
  const { socket } = useSocket()

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
