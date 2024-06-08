import { Box, Flex, IconButton, Link, Text } from '@chakra-ui/react'
import { atom, useSetAtom } from 'jotai'
import { RxHamburgerMenu } from 'react-icons/rx'
import { NavbarUser } from '../../navbar/user'

export const drawerAtom = atom(false)

export const ADMIN_NAVBAR_HEIGHT = '3.5rem'

export function AdminNavbar() {
  const setOpen = useSetAtom(drawerAtom)

  return (
    <Box borderBottomWidth={1} px={4} py={2} bg="white" h={ADMIN_NAVBAR_HEIGHT}>
      <Flex align="center" gap={2} h="full">
        <IconButton
          onClick={() => setOpen(true)}
          variant="ghost"
          aria-label="Sidebar"
          icon={<RxHamburgerMenu size={24} />}
          hideFrom="md"
        />
        <Text as={Link} href="/" fontSize="xl">
          Vike + NestJS Template
        </Text>
        <Box flex={1} />
        <NavbarUser />
      </Flex>
    </Box>
  )
}
