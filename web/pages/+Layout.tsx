import { Box, Center, Divider, Heading, chakra } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import '../styles/globals.css'
import '../styles/nprogress.css'

const T = <chakra.span fontWeight={900}>T</chakra.span>
const UP = <chakra.span fontWeight={900}>UP!</chakra.span>

export function Layout({ children }: PropsWithChildren) {
  return (
    <Center minH="100vh" bg="primary.600">
      <Box bg="white" maxW="100%" w={960} rounded="xl" shadow="xl" m={6} textAlign="center" p={8}>
        <Heading fontWeight="medium" mb={8} color="secondary.500">
          {T}ic-{T}ac-{T}oe {UP}
        </Heading>

        <Divider my={8} />

        {children}
      </Box>
    </Center>
  )
}
