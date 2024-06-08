import { baseURL } from '../config/api'

export function getImageURL(fileName: string) {
  return `${baseURL}/static/${fileName}`
}
