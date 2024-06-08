import { Text, useToast } from '@chakra-ui/react'
import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { navigate } from 'vike/client/router'
import { getErrorMessage } from '../components/error/errors'
import { getProfile, login as loginService, logout as logoutService } from '../services/authentication'
import { IAuthenticatedUser, ILoginResponse } from '../types/auth'

export interface IAuthContext {
  user: IAuthenticatedUser | null
  login: (identifier: string, password: string) => Promise<ILoginResponse | null>
  logout: () => void
  refresh: () => Promise<IAuthenticatedUser | null>
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: PropsWithChildren) {
  const userFromPage = usePageContext().user || null
  const [user, setUser] = useState<IAuthenticatedUser | null>(userFromPage)
  const toast = useToast()

  const refresh = useCallback(async () => {
    const user = await getProfile()

    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }

    return user
  }, [setUser])

  const login = useCallback(
    async (email: string, password: string): Promise<ILoginResponse | null> => {
      try {
        const user = await loginService(email, password)
        await refresh()
        toast({
          description: `Welcome ${user.name}`,
          status: 'success',
          isClosable: true,
          duration: 5000
        })
        return user
      } catch (err: any) {
        toast({
          title: 'Error while logging in',
          description: <Text whiteSpace="pre-line">{getErrorMessage(err)}</Text>,
          status: 'error',
          isClosable: true
        })
        throw err
      }
    },
    [refresh, toast]
  )

  const logout = useCallback(async () => {
    await logoutService()
    setUser(null)
    toast({
      description: 'User logged out',
      isClosable: true,
      duration: 5000
    })
    void navigate('/login')
  }, [setUser, toast])

  return (
    <AuthContext.Provider value={useMemo(() => ({ user, login, logout, refresh }), [login, logout, refresh, user])}>
      {children}
    </AuthContext.Provider>
  )
}
