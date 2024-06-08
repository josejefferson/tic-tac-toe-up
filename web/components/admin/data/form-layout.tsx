import { Card, CardProps, Divider, Heading, StackProps, VStack } from '@chakra-ui/react'

export function FormLayout(props: StackProps) {
  return <VStack spacing={8} align="stretch" {...props} />
}

interface IFormSectionProps extends CardProps {
  name: string
}

export function FormSection({ name, children, ...props }: IFormSectionProps) {
  return (
    <Card p={6} as={VStack} spacing="inherit" align="stretch" {...props}>
      <Heading size="md" fontWeight="medium">
        {name}
      </Heading>
      <Divider my={-3} borderColor="gray.200" />
      {children}
    </Card>
  )
}
