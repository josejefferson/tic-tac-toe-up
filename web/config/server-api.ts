import axios from 'axios'

if (typeof window !== 'undefined') {
  throw new Error('server-api.ts should not be used in the browser')
}

export const baseURL = `http://127.0.0.1:${process.env.PORT || 3000}/api`
export const serverAPI = axios.create({ baseURL })
