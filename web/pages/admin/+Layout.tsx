import { PropsWithChildren } from 'react'
import { AdminNavbar } from '../../components/admin/navbar'

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <style>{`body { background-color: var(--chakra-colors-gray-50); }`}</style>
      <AdminNavbar />
      {children}
    </>
  )
}
