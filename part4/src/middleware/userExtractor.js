const jwt = require('jsonwebtoken')
const User = require('../models/User')

const userExtractor = async (request, response, next) => {
  const token = request.token

  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    console.log('decodedToken', decodedToken)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    request.tokenUsername = decodedToken.username
    request.user = user
  }

  next()
}

module.exports = userExtractor
