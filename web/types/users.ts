import { Create, IBaseEntity } from './base'

export interface IUser extends IBaseEntity {
  name: string
  email: string
  role: 'admin'
}

export interface IUserCreate extends Create<IUser> {
  password: string
}
