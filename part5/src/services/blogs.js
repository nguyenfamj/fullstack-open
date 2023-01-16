import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createNew = async ({ data, token }) => {
  const response = await axios.post(baseUrl, data, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data
}

const exportedObject = { getAll, createNew }

export default exportedObject
