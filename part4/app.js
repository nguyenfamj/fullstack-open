const express = require('express')
const cors = require('cors')
const logger = require('./src/utils/logger')
const { connectDB } = require('./src/utils/dbConnection')
const morgan = require('morgan')
const tokenExtractor = require('./src/middleware/tokenExtractor')
const userExtractor = require('./src/middleware/userExtractor')
// Import router
const blogRouter = require('./src/controllers/blogController')
const userRouter = require('./src/controllers/userController')
const authRouter = require('./src/controllers/authController')
const testRouter = require('./src/controllers/testController')

// Middleware
const { errorHandler } = require('./src/middleware/errorHandler')

const app = express()

logger.info('Connecting to the database')

connectDB()

app.use(cors())
app.use(express.json())

// Setup morgan logger
morgan.token('requestBody', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestBody'))

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testRouter)
  console.log('Test')
}

app.use(tokenExtractor)

// Setup router
app.use('/api/blogs', userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

// Final middleware
app.use(errorHandler)

module.exports = app
