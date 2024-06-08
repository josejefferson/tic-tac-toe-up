import axios from 'axios'

export const baseURL = import.meta.env.PUBLIC_ENV__API_ENDPOINT || '/api'
export const api = axios.create({ baseURL })
