import { Button, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { MdArrowForward, MdEmail, MdKey } from 'react-icons/md'
import { ILoginRequest } from '../../types/auth'

export default function LoginForm() {
  const form = useFormContext<ILoginRequest>()
  const { register, formState } = form
  const { isSubmitting } = formState

  return (
    <>
      <Heading size="lg" mb={5}>
        Log in
      </Heading>

      <FormControl>
        <FormLabel>E-mail</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdEmail />
          </InputLeftElement>
          <Input
            type="email"
            placeholder="Enter your e-mail"
            autoFocus
            required
            isDisabled={isSubmitting}
            {...register('email')}
          />
        </InputGroup>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdKey />
          </InputLeftElement>
          <Input
            type="password"
            placeholder="Enter your password"
            required
            isDisabled={isSubmitting}
            {...register('password')}
          />
        </InputGroup>
      </FormControl>
      <Button
        type="submit"
        rightIcon={<MdArrowForward />}
        w="150px"
        mx="auto"
        mt={5}
        colorScheme="teal"
        variant="outline"
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        loadingText="Logging in"
      >
        Log in
      </Button>
    </>
  )
}
