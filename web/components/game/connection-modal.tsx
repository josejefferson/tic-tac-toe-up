import { Heading, Icon, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { useSocket } from '@josejefferson/socket.io-react-hook'
import { GiServerRack } from 'react-icons/gi'

export function ConnectionModal() {
  const { error, connected, socket } = useSocket()
  const realError = socket.active ? null : error

  return (
    <Modal isOpen={!connected} onClose={() => {}} isCentered closeOnEsc={false} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent w={300}>
        <ModalHeader textAlign="center">
          <Heading fontSize="lg" fontWeight="bold" color="primary.600">
            {realError ? 'SERVER CONNECTION ERROR' : 'CONNECTING TO SERVER'}
          </Heading>
        </ModalHeader>

        <ModalBody textAlign="center">
          <Icon as={GiServerRack} fontSize={100} color="secondary.600" />
          <Text hidden={!realError}>{realError?.message}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
