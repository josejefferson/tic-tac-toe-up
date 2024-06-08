import { Box, BoxProps, Heading } from '@chakra-ui/react'
import { GiSpiderWeb } from 'react-icons/gi'

export function NoItems(props: BoxProps) {
  return (
    <Box color="gray.500" my={5} textAlign="center" mx="auto" w="full" sx={{ clear: 'both' }} {...props}>
      <GiSpiderWeb size={96} style={{ margin: 'auto' }} />
      <Heading my={3}>No items</Heading>
    </Box>
  )
}
