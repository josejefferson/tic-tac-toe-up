import { AxiosError } from 'axios'
import { ReactNode } from 'react'
import { AxiosErrorDetails, AxiosTecnicalErrorDetails, getAxiosErrorMessage } from './api-error'

/** Returns an error message */
export function getErrorMessage(error: any): string | undefined {
  if (error instanceof AxiosError) {
    return getAxiosErrorMessage(error)
  }

  return error?.message
}

/** Returns error details */
export function getErrorDetails(error: any): ReactNode {
  if (error instanceof AxiosError) {
    return <AxiosErrorDetails error={error} />
  }

  return null
}

/** Returns technical error details */
export function getTecnicalErrorDetails(error: any): ReactNode {
  if (error instanceof AxiosError) {
    return <AxiosTecnicalErrorDetails error={error} />
  }

  return null
}
