import {
  Button,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { GiClosedDoors, GiMagnifyingGlass } from 'react-icons/gi'
import { SocketEventStarted } from '../../types/socket'
import { useSocketEvent } from '../../utils/socket'
import { useGameSocket } from './socket'

export function MatchModal() {
  const { socket, connected } = useGameSocket()
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const [disconnected, setDisconnected] = useState(false)
  useEffect(() => void (!connected && setDisconnected(false)), [connected])

  useSocketEvent<SocketEventStarted>('started', () => {
    setDisconnected(false)
    onClose()
  })

  useSocketEvent<SocketEventStarted>('ended', () => {
    setDisconnected(true)
    onOpen()
  })

  const rematch = async () => {
    socket.emit('join')
    setDisconnected(false)
  }

  return (
    <Modal isOpen={connected && isOpen} onClose={onClose} isCentered closeOnEsc={false} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent w={300}>
        <ModalHeader textAlign="center">
          <Heading fontSize="lg" fontWeight="bold" color="primary.600">
            {disconnected ? 'MATCH DISCONNECTED' : 'SEARCHING FOR OPPONENT'}
          </Heading>
        </ModalHeader>

        <ModalBody textAlign="center">
          <Icon
            as={disconnected ? GiClosedDoors : GiMagnifyingGlass}
            fontSize={100}
            color="secondary.600"
            className={disconnected ? undefined : 'animate-orbit'}
          />
          {disconnected && <Text>The other player left the match</Text>}
        </ModalBody>

        <ModalFooter justifyContent="center" hidden={!disconnected}>
          <Button colorScheme="blue" variant="outline" size="sm" onClick={rematch} w="full">
            Join another match
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
