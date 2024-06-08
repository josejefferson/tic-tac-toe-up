import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { api } from '../config/api'
import { SWRWithInfo, fetcherWithInfo } from '../config/swr'
import { EntityID } from '../types/base'
import { Paginated } from '../types/pagination'

export function getCrudService<Entity, EntityCreate = Entity>(baseURL: string) {
  /** Hook with page elements and dynamic pagination */
  function useAllPaginated() {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(12)
    return {
      ...useAllPage(page, pageSize),
      setPage,
      setPageSize
    }
  }

  /** Hook with page elements and fixed pagination */
  function useAllPage(page: number, pageSize: number) {
    let url = `/${baseURL}/`
    url += `?page=${page}`
    url += `&limit=${pageSize}`

    const swr = useSWR<SWRWithInfo<Paginated<Entity[]>>>(url, fetcherWithInfo)
    const rawPageCount = swr.data?.data.pageCount
    const rawTotal = swr.data?.data.total
    const [pageCount, setPageCount] = useState(rawPageCount)
    const [total, setTotal] = useState(rawTotal)
    useEffect(() => void setPageCount(rawPageCount ?? pageCount), [rawPageCount, pageCount])
    useEffect(() => void setTotal(rawTotal ?? total), [rawTotal, total])

    return {
      data: swr.data?.data.data,
      page,
      pageSize,
      pageCount: pageCount ?? 0,
      total: total ?? 0,
      error: swr.error,
      isLoading: swr.isLoading,
      refresh: () => swr.mutate(),
      baseURL
    }
  }

  /** Hook with all elements */
  function useAll() {
    const url = `/${baseURL}/`
    const swr = useSWR<SWRWithInfo<Entity[]>>(url, fetcherWithInfo)
    return {
      data: swr.data?.data,
      error: swr.error,
      isLoading: swr.isLoading,
      refresh: () => swr.mutate(),
      baseURL
    }
  }

  /** Hook with one element */
  function useOne(id?: EntityID) {
    const { data, error, isLoading, mutate } = useSWR<Entity>(`/${baseURL}/${id}`, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    })

    return { data, error, isLoading, refresh: () => mutate() }
  }

  /** Returns all elements */
  async function getAll(): Promise<Entity> {
    const res = await api.get<Entity>(`/${baseURL}/`)
    return res.data
  }

  /** Returns one element */
  async function getOne(id: EntityID): Promise<Entity> {
    const res = await api.get<Entity>(`/${baseURL}/${id}`)
    return res.data
  }

  /** Creates an element */
  async function create(data: EntityCreate): Promise<Entity> {
    const res = await api.post<Entity>(`/${baseURL}/`, data)
    return res.data
  }

  /** Updates an element */
  async function update(id: EntityID, data: EntityCreate): Promise<Entity> {
    const res = await api.patch<Entity>(`/${baseURL}/${id}`, data)
    return res.data
  }

  /** Deletes an element */
  async function remove(id: EntityID): Promise<void> {
    const res = await api.delete(`/${baseURL}/${id}`)
    return res.data
  }

  return {
    useAllPaginated,
    useAllPage,
    useAll,
    useOne,
    getAll,
    getOne,
    create,
    update,
    remove
  }
}
