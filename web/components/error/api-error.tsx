import { Box, Button, Collapse, Heading, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

export function getAxiosErrorMessage(error: AxiosError<any>): string | undefined {
  const { code, response } = error
  const { status, data } = response ?? {}

  if (code === 'ERR_NETWORK') {
    return 'Connection failed'
  } else if (code === 'ETIMEDOUT') {
    return 'Connection to the server timed out'
  } else if (code === 'ERR_CANCELED') {
    return 'Request canceled'
  } else if (code === 'ERR_BAD_REQUEST' || code === 'ERR_BAD_RESPONSE') {
    if (status === StatusCodes.UNAUTHORIZED && data?.message === 'Invalid credentials') {
      return 'Incorrect e-mail or password'
    } else if (status === StatusCodes.UNPROCESSABLE_ENTITY) {
      if (!data?.message) return 'Validation error'

      let errorsText = data?.message
      if (Array.isArray(data?.message)) {
        errorsText = data?.message.join('\n')
      }

      return 'Validation error:\n' + errorsText
    } else if (typeof data?.message === 'string') {
      return data.message
    } else {
      const status = error.response?.status
      const statusText = getReasonPhrase(error.response?.status!)
      return `The server returned an error "${status} ${statusText}"`
    }
  }
}

export function AxiosErrorDetails({ error }: { error: AxiosError<any> }) {
  const { isOpen, onToggle } = useDisclosure()

  if (!error.response?.data) return null

  return (
    <Box maxW="full">
      <Collapse in={isOpen} animateOpacity style={{ width: '100%' }}>
        <Text as="pre" textAlign="left" overflow="auto" bg="gray.900" p={2} rounded="base">
          {JSON.stringify(error.response?.data)}
        </Text>
      </Collapse>
      <Box>
        <Button variant="link" color="inherit" fontWeight={400} fontSize="xs" onClick={onToggle}>
          {isOpen ? 'Hide' : 'Show'} server response
        </Button>
      </Box>
    </Box>
  )
}

export function AxiosTecnicalErrorDetails({ error }: { error: AxiosError<any> }) {
  const boxBg = useColorModeValue('gray.100', 'gray.900')

  return (
    <>
      {error.request?.data && (
        <>
          <Heading size="sm" my={3}>
            Request
          </Heading>
          <Text as="pre" textAlign="left" overflow="auto" p={2} rounded="base" bg={boxBg}>
            {JSON.stringify(error.request.data, null, 2)}
          </Text>
        </>
      )}

      {error.response?.data && (
        <>
          <Heading size="sm" my={3}>
            Response
          </Heading>
          <Text as="pre" textAlign="left" overflow="auto" p={2} rounded="base" bg={boxBg}>
            {error.response?.status} {getReasonPhrase(error.response?.status)}
            {'\n\n'}
            {JSON.stringify(error.response?.data, null, 2)}
          </Text>
        </>
      )}
    </>
  )
}
