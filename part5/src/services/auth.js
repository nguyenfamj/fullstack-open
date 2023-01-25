import axios from 'axios'
const baseUrl = '/api/auth'

export const login = async ({ username, password }) => {
  const response = await axios.post(`${baseUrl}/login`, { username, password })

  axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.appToken}`
  console.log(response)

  return response.data
}
