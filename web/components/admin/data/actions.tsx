import {
  IconButton,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  Text,
  useBoolean,
  useToast
} from '@chakra-ui/react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMore } from 'react-icons/ai'
import { navigate } from 'vike/client/router'
import { getCrudService } from '../../../services/crud'
import { EntityID } from '../../../types/base'
import { getErrorMessage } from '../../error/errors'

interface IActionsProps extends Omit<MenuButtonProps, 'id'> {
  id: EntityID
  apiRoute: string
  baseURL: string
  refresh: () => any
  disableEdit?: boolean
  disableDelete?: boolean
}

export function Actions({ id, apiRoute, baseURL, refresh, disableEdit, disableDelete, ...props }: IActionsProps) {
  const toast = useToast()
  const [confirmDel, setConfirmDel] = useBoolean(false)

  const handleRemoveItem = async () => {
    setConfirmDel.off()

    const toastID = toast({
      title: 'Deleting item...',
      status: 'loading'
    })

    try {
      await getCrudService(apiRoute).remove(id)
      await refresh()
      toast.update(toastID, {
        title: 'Item deleted successfully',
        status: 'success',
        isClosable: true,
        duration: 1000
      })
    } catch (err: any) {
      toast.update(toastID, {
        title: 'Error deleting item',
        description: <Text whiteSpace="pre-line">{getErrorMessage(err)}</Text>,
        status: 'error',
        isClosable: true
      })
      refresh()
    }
  }

  return (
    <Menu onClose={setConfirmDel.off}>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<AiOutlineMore size={18} />}
        size="xs"
        variant="outline"
        border="none"
        rounded="full"
        onClick={(e) => e.stopPropagation()}
        {...props}
      />
      <MenuList onClick={(e) => e.stopPropagation()}>
        {!disableEdit && (
          <MenuItem onClick={() => navigate(`${baseURL}/edit/${id}`)} icon={<AiOutlineEdit size={20} />}>
            Edit
          </MenuItem>
        )}
        {!disableDelete && (
          <MenuItem
            icon={<AiOutlineDelete size={20} />}
            color="red.500"
            closeOnSelect={confirmDel}
            onClick={confirmDel ? handleRemoveItem : setConfirmDel.on}
          >
            {confirmDel ? 'Click again to delete' : 'Delete'}
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}
