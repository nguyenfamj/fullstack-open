const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

// Get all blogs
blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    return response.status(200).json(blogs)
  })
})

// Get single blog
blogRouter.get('/:id', (request, response, next) => {
  const id = request.params.id

  Blog.findById(id)
    .then((foundBlog) => {
      if (!foundBlog) {
        return response
          .status(404)
          .json({ message: `Blog with id ${id} not found` })
          .end()
      }
      return response.status(200).json(foundBlog)
    })
    .catch((error) => next(error))
})

// Create new blog
blogRouter.post('/', (request, response, next) => {
  const { title, author, url, likes } = request.body

  console.log(title, author, url, likes)

  if (!title || !author) {
    return response.status(400).send('Either title or author not included in the request')
  }

  const newBlog = new Blog({ title, author, url, likes })

  newBlog
    .save()
    .then((savedBlog) => {
      return response.status(200).json(savedBlog)
    })
    .catch((error) => next(error))
})

// Delete blog
blogRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id

  Blog.findByIdAndRemove(id)
    .then((result) => {
      console.log(`Blog ${result._id} deleted successfully`)
      response.status(204).json(result).end()
    })
    .catch((error) => next(error))
})

// Update blog
blogRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body

  if (!title || !author) {
    return response.status(400).send('Either title or author not included in the request')
  }

  const updatedBlog = { title, author, url, likes }

  Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((blog) => response.status(200).json(blog).end())
    .catch((error) => next(error))
})

module.exports = blogRouter
