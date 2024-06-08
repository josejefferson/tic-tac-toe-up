import { IUser } from './users'

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse extends IAuthenticatedUser {}

export interface IAuthenticatedUser extends IUser {}
