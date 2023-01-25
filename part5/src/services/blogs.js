import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async ({ data }) => {
  const response = await axios.post(baseUrl, data)

  return response.data
}

const updateBlog = async ({ blogId, data }) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, data)

  return response.data
}

const deleteBlog = async ({ blogId }) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`)

  return response.data
}

const exportedObject = { getAll, createNew, updateBlog, deleteBlog }

export default exportedObject
