import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { navigate } from 'vike/client/router'
import { api } from '../../config/api'

export function CreateRoom() {
  const [loading, setLoading] = useState(false)

  const createRoom = async () => {
    setLoading(true)
    const { data } = await api.post<{ id: string }>('/rooms/create')
    void navigate(`/room/${data.id}`)
  }

  return (
    <Button shadow="md" rounded="full" size="lg" colorScheme="primary" mt={-2} isLoading={loading} onClick={createRoom}>
      Create room
    </Button>
  )
}
