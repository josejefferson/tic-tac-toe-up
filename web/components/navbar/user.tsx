import { Avatar, Button, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, Tooltip } from '@chakra-ui/react'
import { useAuth } from '../../contexts/auth.context'

export function NavbarUser() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <Button as="a" href="/login" variant="ghost" px={2}>
        Log in
      </Button>
    )
  }

  const UserInfoTooltip = (
    <>
      <Text fontWeight="bold">{user.name}</Text>
      <Text fontStyle="italic">{user.email}</Text>
    </>
  )

  return (
    <Menu>
      <Tooltip label={UserInfoTooltip} placement="bottom-end">
        <MenuButton>
          <Avatar size="sm" name={user.name} />
        </MenuButton>
      </Tooltip>
      <Portal>
        <MenuList>
          <MenuItem as={Link} href="/admin">
            Administration
          </MenuItem>
          <MenuItem onClick={logout}>Log out</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}
