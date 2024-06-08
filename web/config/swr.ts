import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'
import { SWRConfiguration } from 'swr'
import { api } from './api'

export const swrOptions: SWRConfiguration = {
  /** Returns only the body of the API */
  fetcher: async (url: string) => {
    const { data } = await api.get(url)
    return data
  }
}

export type SWRWithInfo<T> = {
  data: T
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders
  status: number
  statusText: string
}

/** Returns the body, status, and headers of the API */
export const fetcherWithInfo = async (url: string): Promise<SWRWithInfo<any>> => {
  const { data, headers, status, statusText } = await api.get(url)
  return { data, headers, status, statusText }
}
