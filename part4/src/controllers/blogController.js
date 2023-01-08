const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

// Get all blogs
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.status(200).json(blogs)
})

// Get single blog
blogRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    const foundBlog = await Blog.findById(id)

    if (!foundBlog) {
      return response
        .status(404)
        .json({ message: `Blog with id ${id} not found` })
        .end()
    }

    return response.status(200).json(foundBlog)
  } catch (error) {
    next(error)
  }
})

// Create new blog
blogRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  console.log(title, author, url, likes)

  if (!title || !author) {
    return response.status(400).send('Either title or author not included in the request')
  }

  const newBlog = new Blog({ title, author, url, likes })

  try {
    const savedBlog = await newBlog.save()

    return response.status(200).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

// Delete blog
blogRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    const result = await Blog.findOneAndRemove(id)
    console.log(`Blog ${result._id} deleted successfully`)

    return response.status(204).json(result).end()
  } catch (error) {
    next(error)
  }
})

// Update blog
blogRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  if (!title || !author) {
    return response.status(400).send('Either title or author not included in the request')
  }

  const updatedBlog = { title, author, url, likes }

  try {
    const blog = await Blog.findOneAndUpdate(request.params.id, updatedBlog, {
      new: true,
      runValidators: true,
      context: 'query',
    })

    return response.status(200).json(blog).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
