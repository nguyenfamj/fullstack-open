const express = require('express')
const cors = require('cors')
const logger = require('./src/utils/logger')
const { connectDB } = require('./src/utils/dbConnection')
const morgan = require('morgan')
// Import router
const blogRouter = require('./src/controllers/blogController')

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

// Setup router
app.use('/api/blogs', blogRouter)

// Final middleware
app.use(errorHandler)

module.exports = app
