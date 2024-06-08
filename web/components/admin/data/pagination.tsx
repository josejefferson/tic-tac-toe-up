import { Flex, IconButton, Select, Text } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface IPaginationProps {
  page: number
  pageSize: number
  pageCount: number
  total: number
  setPage: Dispatch<SetStateAction<number>>
  setPageSize: Dispatch<SetStateAction<number>>
}

export default function Pagination({ page, pageSize, pageCount, total, setPage, setPageSize }: IPaginationProps) {
  // Leaving the page if it doesn't exist
  useEffect(() => {
    if (pageCount > 0 && page > pageCount) {
      setPage(pageCount)
    }
  }, [page, pageCount, setPage])

  if (pageCount === 0) {
    page = 0
  }

  return (
    <Flex align="center" gap={2} mt={3} overflow="auto" whiteSpace="nowrap">
      <IconButton
        aria-label="Previous page"
        size="sm"
        variant="outline"
        colorScheme="secondary"
        isDisabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        <MdChevronLeft />
      </IconButton>

      <IconButton
        aria-label="Next page"
        size="sm"
        variant="outline"
        colorScheme="secondary"
        isDisabled={page >= pageCount}
        onClick={() => setPage(page + 1)}
      >
        <MdChevronRight />
      </IconButton>

      <Text>
        Page {page} of {pageCount} - Total: {total}
      </Text>

      <Text ml={10}>Per page:</Text>

      <Select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} w={20} minW={20} size="sm">
        <option value="12">12</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="1000">1000</option>
      </Select>
    </Flex>
  )
}
