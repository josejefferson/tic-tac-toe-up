import { Button, Input, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { navigate } from 'vike/client/router'
import { api } from '../../config/api'

export function JoinRoom() {
  const toast = useToast()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  // TODO: Join on press Enter
  const joinRoom = async () => {
    setLoading(true)
    try {
      await api.get(`/rooms/query/${code}`)
      void navigate(`/room/${code}`)
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Room not found', // TODO: real error message
        status: 'error',
        duration: 10000,
        isClosable: true
      })
    }
    setLoading(false)
  }

  return (
    <>
      <Input
        rounded="full"
        maxW={240}
        display="block"
        mx="auto"
        textAlign="center"
        placeholder="Room code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button
        shadow="md"
        rounded="full"
        colorScheme="primary"
        variant="outline"
        mt={-2}
        isDisabled={loading || !code}
        onClick={joinRoom}
      >
        Join
      </Button>
    </>
  )
}
