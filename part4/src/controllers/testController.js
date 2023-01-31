const testRouter = require('express').Router()

const Blog = require('../models/Blog')
const User = require('../models/User')

testRouter.post('/reset', async (request, response) => {
  const response1 = await Blog.deleteMany({})
  const response2 = await User.deleteMany({})

  console.log(response1)
  console.log(response2)

  console.log('Information has been reset')

  response.status(200).json({ response1, response2 }).end()
})

module.exports = testRouter
