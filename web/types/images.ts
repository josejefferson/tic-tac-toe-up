import { IBaseEntity } from './base'

export interface IImage extends IBaseEntity {
  type: string
  fileName: string
}

export interface IImageCreate {
  file: File
}
