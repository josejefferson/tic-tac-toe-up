import { Heading } from '@chakra-ui/react'
import WithSidebar from '../../components/admin/sidebar'

export default function Page() {
  return (
    <WithSidebar currentPage="dashboard">
      <Heading>Dashboard</Heading>
    </WithSidebar>
  )
}
