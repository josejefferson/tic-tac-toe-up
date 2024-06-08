import { PageContextServer } from 'vike/types'

export const data = async ({ headers }: PageContextServer) => {
  // const { data: data } = await serverAPI.get<IType[]>('/data', { headers })
  return {}
}

export type HomeData = Awaited<ReturnType<typeof data>>
