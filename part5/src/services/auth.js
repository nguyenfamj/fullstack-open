import axios from 'axios'
const baseUrl = '/api/auth'

export const login = async ({ username, password }) => {
  const response = await axios.post(`${baseUrl}/login`, { username, password })

  return response.data
}
