import { Card, Flex } from '@chakra-ui/react'
import { FormProvider, useForm } from 'react-hook-form'
import { usePageContext } from 'vike-react/usePageContext'
import { navigate } from 'vike/client/router'
import LoginForm from '../../components/login/form'
import { Navbar } from '../../components/navbar'
import { useAuth } from '../../contexts/auth.context'
import { ILoginRequest } from '../../types/auth'

export default function Page() {
  const form = useForm<ILoginRequest>()
  const { handleSubmit } = form
  const { login } = useAuth()
  const { urlParsed } = usePageContext()
  const redirect = urlParsed.search.next

  const onSubmitHandler = async ({ email, password }: ILoginRequest) => {
    await login(email, password)
    void navigate(redirect || '/admin')
  }

  return (
    <>
      <Navbar />
      <Flex h="100vh" align="center" justify="center">
        <FormProvider {...form}>
          <Card as="form" bg="gray.50" textAlign="center" p={10} w={450} onSubmit={handleSubmit(onSubmitHandler)}>
            <LoginForm />
          </Card>
        </FormProvider>
      </Flex>
    </>
  )
}
