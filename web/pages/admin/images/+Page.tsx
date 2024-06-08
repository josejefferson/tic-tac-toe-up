import { Heading } from '@chakra-ui/react'
import { ImagesList } from '../../../components/admin/lists/images'
import WithSidebar from '../../../components/admin/sidebar'

export default function Page() {
  return (
    <WithSidebar currentPage="images">
      <Heading mb={5}>Images</Heading>
      <ImagesList />
    </WithSidebar>
  )
}
