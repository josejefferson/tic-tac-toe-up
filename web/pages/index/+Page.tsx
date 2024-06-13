import { Avatar, Button, Divider, Flex, Heading, Input, Link, Text, VStack } from '@chakra-ui/react'
import { CreateRoom } from '../../components/home/create-room'
import { JoinRoom } from '../../components/home/join-room'

export default function Page() {
  return (
    <>
      <Flex direction={{ base: 'column', md: 'row' }} gap={16}>
        <VStack flex={1} spacing={4}>
          <Heading fontSize="md" fontWeight="bold" color="primary.600">
            INFORMATION
          </Heading>

          <Avatar size="2xl" bg="secondary.500" />

          <Input
            rounded="full"
            maxW={240}
            display="block"
            mx="auto"
            value="Anonymous"
            textAlign="center"
            placeholder="Your name"
          />

          <Button as={Link} href="/play" shadow="md" rounded="full" size="lg" colorScheme="secondary">
            Play now!
          </Button>
        </VStack>

        <VStack flex={1} spacing={4}>
          <Heading fontSize="md" fontWeight="bold" color="primary.600">
            ROOMS
          </Heading>

          <Text>Create a room to play with a friend!</Text>

          <CreateRoom />

          <Divider />

          <Heading fontSize="md" fontWeight="bold" color="primary.600">
            JOIN ROOM
          </Heading>

          <JoinRoom />
        </VStack>
      </Flex>

      <Divider my={8} />

      <Text>&copy; {new Date().getFullYear()} - Jefferson Dantas</Text>
    </>
  )
}
