const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Get all blogs
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
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
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  if (!title || !author) {
    return response.status(400).send('Either title or author not included in the request')
  }

  const newBlog = new Blog({ title, author, url, likes, user: user?._id || null })

  try {
    const savedBlog = await newBlog.save()

    // Concat the new blog in the user
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    return response.status(200).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

// Delete blog
blogRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const user = request.user

  console.log(user)

  try {
    const blog = await Blog.findById(id)

    if (blog.user.toString() === user._id.toString()) {
      const deletedBlog = await Blog.findByIdAndRemove(id)

      console.log(deletedBlog)
      return response.status(200).json({ message: 'Blog deleted successfully', deletedBlog })
    }

    return response.status(403).json({ message: 'No access right' })
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
