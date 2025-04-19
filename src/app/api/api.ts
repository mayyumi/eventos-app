import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '', // pode ser apenas '' se estiver no mesmo domínio
})

export default api
