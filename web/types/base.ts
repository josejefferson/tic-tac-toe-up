export type EntityID = string

export interface IID {
  id: EntityID
}

export interface IBaseEntity extends IID {
  createdAt: string
  updatedAt: string
}

export type Create<T extends IBaseEntity> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
