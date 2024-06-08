import { Button, Center, Text, useToast } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AiOutlineSave } from 'react-icons/ai'
import { navigate } from 'vike/client/router'
import { EntityID, IID } from '../../../types/base'
import { getErrorMessage } from '../../error/errors'

interface IFormBasePropsCreate<T> extends PropsWithChildren {
  redirect?: string
  service: (data: any) => Promise<any>
  onSelect?: (data: T) => any
}

interface IFormBasePropsUpdate<T> extends PropsWithChildren {
  values: T
  redirect?: string
  service: (id: EntityID, data: any) => Promise<any>
  onSelect?: (data: T) => any
}

type IFormBaseProps<T> = IFormBasePropsCreate<T> | IFormBasePropsUpdate<T>

export function FormBase<T extends IID>(props: IFormBaseProps<T>) {
  const values = (props as IFormBasePropsUpdate<T>).values as any
  const form = useForm<T>({ defaultValues: values })
  const { handleSubmit, formState } = form
  const { isSubmitting } = formState
  const toast = useToast()

  const onSubmitHandler = async (data: T) => {
    const fn = 'values' in props ? props.service(data?.id, data) : props.service(data)

    try {
      const result = await fn
      if (props.redirect) await navigate(props.redirect)
      if (props.onSelect) props.onSelect(result)
      toast({
        description: 'Saved',
        status: 'success',
        duration: 1000,
        isClosable: true
      })
    } catch (err) {
      console.error(err)
      toast({
        title: 'An error occurred',
        description: <Text whiteSpace="pre-line">{getErrorMessage(err)}</Text>,
        status: 'error',
        isClosable: true
      })
    }
  }

  return (
    <FormProvider {...form}>
      <form
        method="POST"
        onSubmit={(e) => {
          e.stopPropagation() // Prevents a parent form from being submitted
          void handleSubmit(onSubmitHandler)(e)
        }}
      >
        {props.children}

        <Center>
          <Button
            type="submit"
            leftIcon={<AiOutlineSave />}
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            loadingText="Saving"
            colorScheme="secondary"
            size="lg"
            mt={3}
          >
            Save
          </Button>
        </Center>
      </form>
    </FormProvider>
  )
}
