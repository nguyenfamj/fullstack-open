const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authRouter = require('express').Router()
const User = require('../models/User')

authRouter.post('/login', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

  if (!isPasswordCorrect || !user) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  const tokenizedUser = { username: user.username, id: user._id }

  const jwtToken = jwt.sign(tokenizedUser, process.env.JWT_SECRET, { expiresIn: 60 * 60 })

  return response.status(200).json({ appToken: jwtToken, ...tokenizedUser })
})

module.exports = authRouter
