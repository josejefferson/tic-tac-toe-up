import { ReactElement } from 'react'
import { AiOutlineBarChart, AiOutlineCamera } from 'react-icons/ai'

export interface ISidebarLink {
  id: string
  name: string
  url?: string
  icon: ReactElement
  create?: boolean
}

export const SIDEBAR_LINKS: ISidebarLink[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    url: '/admin/',
    icon: <AiOutlineBarChart size={20} />
  },
  {
    id: 'images',
    name: 'Images',
    url: '/admin/images',
    icon: <AiOutlineCamera size={20} />
  }
]
