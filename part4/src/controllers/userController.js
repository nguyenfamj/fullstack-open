const userRouter = require('express').Router()
const User = require('../models/User')

// Import dependencies
const bcrypt = require('bcrypt')

// Create new user
userRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (!(username && name && password)) {
    return response.status(400).json({ error: 'Required information missing!' })
  }

  //   Check if the username has already been used
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  if (password.length <= 3) {
    return response.status(400).json({ error: 'password must be more than 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()

    return response.status(200).json(savedUser)
  } catch (error) {
    next(error)
  }
})

// Get all users
userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')

  return response.status(200).json(users)
})

module.exports = userRouter
