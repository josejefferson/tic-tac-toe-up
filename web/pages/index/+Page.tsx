import { Center, Heading } from '@chakra-ui/react'
import { Navbar } from '../../components/navbar'

export default function Page() {
  return (
    <>
      <Navbar />

      <Center my={8}>
        <Heading>Hello World</Heading>
      </Center>
    </>
  )
}
