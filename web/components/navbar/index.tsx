import { Box, Container, Flex, Link } from '@chakra-ui/react'
import { NavbarUser } from './user'

export function Navbar() {
  return (
    <Box borderBottomWidth={1}>
      <Container maxW="7xl" p={2}>
        <Flex align="center" gap={2}>
          <Link href="/">Vike + NestJS Template</Link>
          <Box flex={1} />
          <NavbarUser />
        </Flex>
      </Container>
    </Box>
  )
}
