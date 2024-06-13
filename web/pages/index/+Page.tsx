import { Avatar, Button, Divider, Flex, Heading, Input, Link, Text, VStack } from '@chakra-ui/react'

export default function Page() {
  return (
    <>
      <Flex>
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

        <Divider orientation="vertical" h="full" />

        <VStack flex={1} spacing={4}>
          <Heading fontSize="md" fontWeight="bold" color="primary.600">
            ROOMS
          </Heading>

          <Text>Create a room to play with a friend!</Text>

          <Button shadow="md" rounded="full" size="lg" colorScheme="primary" mt={-2}>
            Create room
          </Button>

          <Divider />

          <Heading fontSize="md" fontWeight="bold" color="primary.600">
            JOIN ROOM
          </Heading>

          <Input
            rounded="full"
            maxW={240}
            display="block"
            mx="auto"
            textAlign="center"
            placeholder="Room code"
            value=""
          />

          <Button shadow="md" rounded="full" colorScheme="primary" variant="outline" mt={-2}>
            Join
          </Button>
        </VStack>
      </Flex>

      <Divider my={8} />

      <Text>&copy; {new Date().getFullYear()} - Jefferson Dantas</Text>
    </>
  )
}
