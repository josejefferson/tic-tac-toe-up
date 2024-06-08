import { api } from '../config/api'
import { IAuthenticatedUser, ILoginRequest, ILoginResponse } from '../types/auth'

export async function login(email: string, password: string) {
  const loginRequest: ILoginRequest = {
    email,
    password
  }

  const { data } = await api.post<ILoginResponse>('/auth/login', loginRequest)
  return data
}

export async function logout() {
  await api.post('/auth/logout')
}

export async function getProfile() {
  try {
    const { data } = await api.get<IAuthenticatedUser>('/auth/me')
    return data
  } catch (err) {
    return null
  }
}
