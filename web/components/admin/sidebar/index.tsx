import { Box, Container, ContainerProps, Flex } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { ADMIN_NAVBAR_HEIGHT } from '../navbar'
import Sidebar from './sidebar'

interface IWithSidebarProps extends PropsWithChildren {
  currentPage?: string
  containerProps?: ContainerProps
}

export default function WithSidebar({ children, currentPage, containerProps }: IWithSidebarProps) {
  return (
    <Flex px={0} gap={{ base: 0, md: 5 }} h={`calc(100vh - ${ADMIN_NAVBAR_HEIGHT})`}>
      <Sidebar currentPage={currentPage} />
      <Box flex="1" w="full" overflow="auto" py={6}>
        <Container maxW={containerProps?.maxW ?? '5xl'} mb={5} {...containerProps}>
          {children}
        </Container>
      </Box>
    </Flex>
  )
}
