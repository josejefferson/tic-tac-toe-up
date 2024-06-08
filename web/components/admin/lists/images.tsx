import { Box, Card, Image, Link, SimpleGrid, Skeleton } from '@chakra-ui/react'
import { imagesService } from '../../../services/images'
import { getImageURL } from '../../../utils/formatters'
import ErrorInfo from '../../error'
import { NoItems } from '../../error/no-items'
import { Actions } from '../data/actions'
import Pagination from '../data/pagination'

export function ImagesList() {
  const api = imagesService.useAllPaginated()
  const { page, pageSize, setPage, setPageSize, pageCount, total } = api
  const { data, error, isLoading, refresh } = api

  return (
    <Box sx={{ clear: 'both' }}>
      {/* Error */}
      <ErrorInfo error={error} retry={refresh} />

      {/* Loading */}
      <SimpleGrid columns={{ base: 2, sm: 3, lg: 4 }} spacing={3}>
        {isLoading && [...Array(12)].map((_, i) => <Skeleton aspectRatio={1 / 1} rounded="md" key={i} />)}
      </SimpleGrid>

      {/* No items */}
      <NoItems hidden={isLoading || !!data?.length} />

      {/* Items */}
      <SimpleGrid columns={{ base: 2, sm: 3, lg: 4 }} spacing={3}>
        {data?.map((item) => (
          <Card overflow="hidden" aspectRatio={4 / 3} key={item.id}>
            <Link href={getImageURL(item.fileName)} target="_blank" rel="noreferrer" h="full">
              <Image src={getImageURL(item.fileName)} w="full" h="full" objectFit="cover" />
            </Link>
            <Actions
              baseURL="/admin/images"
              id={item.id}
              apiRoute={api.baseURL}
              refresh={refresh}
              disableEdit
              pos="absolute"
              top={1}
              right={1}
              bg="gray.100"
            />
          </Card>
        ))}
      </SimpleGrid>

      <Pagination
        page={page}
        pageSize={pageSize}
        pageCount={pageCount}
        total={total}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </Box>
  )
}
