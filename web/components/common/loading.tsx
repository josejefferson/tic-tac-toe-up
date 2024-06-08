import { Center, Spinner } from '@chakra-ui/react'

export function Loading() {
  return (
    <Center my={10}>
      <Spinner size="xl" />
    </Center>
  )
}
