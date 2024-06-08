import { Button, Container, HStack, Heading, Link, ListItem, Text, UnorderedList, useClipboard } from '@chakra-ui/react'
import { FallbackProps } from 'react-error-boundary'
import { BiLogoGmail } from 'react-icons/bi'
import { MdContentCopy, MdEmail } from 'react-icons/md'
import { usePageContext } from 'vike-react/usePageContext'

export function PageErrorProd({ error }: FallbackProps) {
  const { urlOriginal } = usePageContext()
  const reportContent = getReportContent(error, urlOriginal)
  const { onCopy, hasCopied } = useClipboard(reportContent)

  const email = import.meta.env.VITE_REPORT_EMAIL
  const subject = 'Error Report'
  const body = reportContent

  const mailToURL = getMailToURL(email, subject, body)
  const gmailURL = getGmailURL(email, subject, body)

  return (
    <Container maxW="6xl" py={8} fontFamily="'Segoe UI', system-ui, sans-serif">
      <Text fontSize="8xl">:(</Text>
      <Heading fontWeight={200} mb={4}>
        Oops! We encountered an issue while loading this page
      </Heading>
      <Text mb={4}>
        Help us improve your experience! Report the error and our development team will fix it as soon as possible.
      </Text>
      <HStack wrap="wrap" spacing={2} mb={4}>
        <Button as={Link} href={mailToURL} target="_blank" leftIcon={<MdEmail />} colorScheme="orange" hidden={!email}>
          Report error via e-mail
        </Button>
        <Button
          as={Link}
          href={gmailURL}
          target="_blank"
          leftIcon={<BiLogoGmail />}
          colorScheme="red"
          variant="outline"
          hidden={!email}
        >
          Report via Gmail
        </Button>
        <Button
          leftIcon={<MdContentCopy />}
          variant="outline"
          colorScheme="blue"
          onClick={onCopy}
          isDisabled={hasCopied}
        >
          {hasCopied ? 'Copied!' : 'Copy error report'}
        </Button>
      </HStack>
      <Text as="em">We appreciate your cooperation</Text>

      <Heading fontSize="lg" mt={8} mb={2}>
        In the meantime, you can try the following options:
      </Heading>
      <UnorderedList>
        <ListItem>Reload the page</ListItem>
        <ListItem>Go back to the previous page</ListItem>
        <ListItem>Try logging out and logging back into your account</ListItem>
      </UnorderedList>
    </Container>
  )
}

function getMailToURL(email: string, subject: string, body: string) {
  subject = encodeURIComponent(subject)
  body = encodeURIComponent(body)
  email = encodeURIComponent(email)
  return `mailto:${email}?subject=${subject}&body=${body}`
}

function getGmailURL(email: string, subject: string, body: string) {
  subject = encodeURIComponent(subject)
  body = encodeURIComponent(body)
  email = encodeURIComponent(email)
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`
}

function getReportContent(error: any, url: string) {
  let text = `Date/time:\n${new Date().toLocaleString('pt-BR')}\n\n`
  text += `URL:\n${url}\n\n`
  text += `Stack:\n${error?.stack}\n\n`
  return text
}
