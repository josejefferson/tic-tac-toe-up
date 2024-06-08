import { Center, Container, Heading, Icon, Text } from '@chakra-ui/react'
import { GiMagnifyingGlass, GiServerRack } from 'react-icons/gi'
import { usePageContext } from 'vike-react/usePageContext'

export default function Page() {
  const { is404 } = usePageContext()
  return is404 ? <Error404 /> : <Error500 />
}

function Error404() {
  return (
    <Center as={Container} maxW="7xl" textAlign="center" flexDirection="column" py={20} gap={10}>
      <Icon as={GiMagnifyingGlass} fontSize={100} color="primary.600" />
      <Heading>404 NOT FOUND</Heading>
      <Text>This page does not exist</Text>
    </Center>
  )
}

function Error500() {
  return (
    <Center as={Container} maxW="7xl" textAlign="center" flexDirection="column" py={20} gap={10}>
      <Icon as={GiServerRack} fontSize={100} color="primary.600" />
      <Heading>500 INTERNAL SERVER ERROR</Heading>
      <Text>Something went wrong displaying this page</Text>
    </Center>
  )
}
