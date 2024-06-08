import { api } from '../config/api'
import { IImage, IImageCreate } from '../types/images'
import { getCrudService } from './crud'

export const imagesService = {
  ...getCrudService<IImage, IImageCreate>('images'),
  create: async (data: IImageCreate): Promise<IImage> => {
    const formData = new FormData()

    for (const field in data) {
      formData.append(field, data[field as keyof IImageCreate])
    }

    const res = await api.post<IImage>('/images/', formData)
    return res.data
  }
}
