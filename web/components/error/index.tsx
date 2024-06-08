import {
  Box,
  Button,
  Collapse,
  Heading,
  StackProps,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { ReactNode, useRef } from 'react'
import { RiAlertFill } from 'react-icons/ri'
import { copyRichText } from '../../utils/copy-rich-text'
import { getErrorDetails, getErrorMessage, getTecnicalErrorDetails } from './errors'

interface IErrorInfoProps extends Omit<StackProps, 'title'> {
  error: any
  title?: ReactNode
  retry?: () => any
}

export default function ErrorInfo(props: IErrorInfoProps) {
  if (!props.error) return null
  return <ErrorInfoErr {...props} />
}

function ErrorInfoErr({ error, title, retry, ...props }: IErrorInfoProps) {
  const { isOpen, onToggle } = useDisclosure()
  const toast = useToast()

  const message = getErrorMessage(error)
  const details = getErrorDetails(error)
  const tecnical = getTecnicalErrorDetails(error)

  const tecnicalDetailsRef = useRef<HTMLDivElement>(null)

  const copyTecnicalDetails = async () => {
    await copyRichText(tecnicalDetailsRef.current?.innerHTML!, tecnicalDetailsRef.current?.innerText!)
    toast({
      description: 'Technical details copied',
      status: 'info',
      duration: 2000,
      isClosable: true
    })
  }

  return (
    <Box color="gray.500" my={5} textAlign="center" mx="auto" w="full" sx={{ clear: 'both' }} {...props}>
      <RiAlertFill size={96} style={{ margin: 'auto' }} />

      <Heading my={3}>{title || 'Something went wrong'}</Heading>

      {message && <Text whiteSpace="pre-line">{message}</Text>}

      {details && <Box my={2}>{details}</Box>}

      <Box hidden={!retry} mt={3} mb={0}>
        <Button variant="outline" color="inherit" onClick={retry}>
          Try again
        </Button>
      </Box>

      <Box>
        <Button variant="link" color="inherit" fontWeight={400} fontSize="xs" onClick={onToggle}>
          {isOpen ? 'Hide' : 'Show'} technical details
        </Button>
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ width: '100%' }}>
        <Box ref={tecnicalDetailsRef}>
          <Heading size="sm" my={3}>
            Stack trace
          </Heading>
          <Text
            as="pre"
            textAlign="left"
            overflow="auto"
            p={2}
            rounded="base"
            bg={useColorModeValue('gray.100', 'gray.900')}
          >
            {error?.stack}
          </Text>

          {tecnical}
        </Box>

        <Box hidden={!retry} my={3}>
          <Button variant="outline" color="inherit" onClick={copyTecnicalDetails}>
            Copy technical details
          </Button>
        </Box>
      </Collapse>
    </Box>
  )
}
