import { Button, Skeleton, Table, TableCellProps, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { getCrudService } from '../../../services/crud'
import { IID } from '../../../types/base'
import ErrorInfo from '../../error'
import { NoItems } from '../../error/no-items'
import { Actions } from './actions'
import Pagination from './pagination'

interface IListTableProps<T extends IID> {
  api: ReturnType<ReturnType<typeof getCrudService<T>>['useAllPaginated']>
  baseURL: string
  columns: {
    name: string
    render: (item: T) => ReactNode
    headProps?: TableCellProps
    cellProps?: TableCellProps
  }[]
  disableEdit?: boolean
  disableDelete?: boolean
}

export function ListTable<T extends IID>({ api, baseURL, columns, disableEdit, disableDelete }: IListTableProps<T>) {
  const { page, pageSize, setPage, setPageSize, pageCount, total } = api
  const { data, error, isLoading, refresh } = api

  return (
    <>
      {/* Add element button */}
      <Button
        as="a"
        href={`${baseURL}/create`}
        rightIcon={<AiOutlinePlus />}
        float="right"
        colorScheme="secondary"
        variant="outline"
      >
        Adicionar
      </Button>

      {/* Error */}
      <ErrorInfo error={error} retry={refresh} sx={{ clear: 'both' }} />

      {/* Table */}
      <TableContainer sx={{ clear: 'both' }}>
        <Table variant="simple" size="sm">
          <Thead>
            {/* Table titles */}
            <Tr>
              <Th w={0} />
              {columns.map(({ name, headProps }, i) => (
                <Th key={i} {...headProps}>
                  {name}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {/* Loading */}
            {isLoading &&
              [...Array(10)].map((_, i) => (
                <Tr key={i}>
                  {[...Array(columns.length + 1)].map((_, i) => (
                    <Td children={<Skeleton h="24px" minW={6} />} key={i} />
                  ))}
                </Tr>
              ))}

            {/* No items */}
            <Tr hidden={isLoading || !!data?.length}>
              <Td colSpan={999} children={<NoItems />} />
            </Tr>

            {/* Items */}
            {data?.map((item) => (
              <Tr key={item.id}>
                <Td w={0}>
                  <Actions
                    id={item.id}
                    apiRoute={api.baseURL}
                    baseURL={baseURL}
                    refresh={refresh}
                    disableEdit={disableEdit}
                    disableDelete={disableDelete}
                  />
                </Td>
                {columns.map(({ render, cellProps }, i) => (
                  <Td overflow="hidden" textOverflow="ellipsis" key={i} {...cellProps}>
                    {render(item)}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Pagination
        page={page}
        pageSize={pageSize}
        pageCount={pageCount}
        total={total}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </>
  )
}
