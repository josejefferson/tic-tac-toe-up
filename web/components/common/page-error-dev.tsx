import { Box, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FallbackProps } from 'react-error-boundary'

export function PageErrorDev({ error, resetErrorBoundary }: FallbackProps) {
  useEffect(() => {
    const timer = setInterval(() => resetErrorBoundary(), 5000)
    return () => clearInterval(timer)
  })

  return (
    <Box p={8}>
      <Heading mb={4} color="red.500" fontWeight="medium">
        Error rendering page
      </Heading>
      <Text as="pre" overflow="auto">
        {error.stack}
      </Text>
    </Box>
  )
}
