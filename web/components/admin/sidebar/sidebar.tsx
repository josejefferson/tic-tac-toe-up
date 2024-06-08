import { Box, BoxProps, Button, Drawer, DrawerContent, DrawerOverlay, Flex, IconButton, Link } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { AiOutlinePlus } from 'react-icons/ai'
import { drawerAtom } from '../navbar'
import { ISidebarLink, SIDEBAR_LINKS } from './links'

interface ISidebarProps {
  currentPage?: string
}

export default function Sidebar({ currentPage }: ISidebarProps) {
  const [open, setOpen] = useAtom(drawerAtom)

  return (
    <Box py={4} bg="white" borderRightWidth={1} overflowY="auto">
      <SidebarContent currentPage={currentPage} hideBelow="md" />
      <Drawer isOpen={open} placement="left" onClose={() => setOpen(false)}>
        <DrawerOverlay />
        <DrawerContent overflow="auto" py={3}>
          <SidebarContent currentPage={currentPage} w="full" />
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export function SidebarContent({ currentPage, ...props }: ISidebarProps & BoxProps) {
  return (
    <Box w="290px" left={0} top={0} zIndex={1500} {...props}>
      <Flex direction="column" gap={2}>
        {SIDEBAR_LINKS?.map((sidebarLink, i) => (
          <SidebarLink sidebarLink={sidebarLink} currentPage={currentPage} key={i} />
        ))}
      </Flex>
    </Box>
  )
}

function SidebarLink({ sidebarLink, currentPage }: { sidebarLink: ISidebarLink; currentPage?: string }) {
  const active = currentPage && currentPage === sidebarLink.id

  const LeftIcon = (
    <Box
      borderWidth={1}
      p={1}
      color={active ? 'white' : 'primary.500'}
      bg={active ? 'primary.500' : undefined}
      rounded="lg"
    >
      {sidebarLink.icon}
    </Box>
  )

  return (
    <Flex borderLeftWidth={3} px={2} borderColor={active ? 'primary.500' : 'transparent'}>
      <Button
        as={Link}
        href={sidebarLink.url}
        leftIcon={LeftIcon}
        color={active ? 'primary.500' : undefined}
        w="full"
        variant="ghost"
        pl={2}
        pr={0}
      >
        <Box w="full" textAlign="left" overflow="hidden" textOverflow="ellipsis" fontWeight={active ? 600 : 400}>
          {sidebarLink.name}
        </Box>
      </Button>
      <IconButton
        aria-label="Create"
        as={Link}
        href={`${sidebarLink.url}/create`}
        variant="ghost"
        color="inherit"
        rounded="full"
        hidden={!sidebarLink.create}
      >
        <AiOutlinePlus size={20} />
      </IconButton>
    </Flex>
  )
}
