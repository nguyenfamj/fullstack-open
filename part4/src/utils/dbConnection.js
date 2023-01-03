const { MONGO_URI } = require('./config')
const mongoose = require('mongoose')

const connectDB = () =>
  mongoose
    .connect(MONGO_URI)
    .then((result) => {
      console.log('MongoDB cluster connected successfully')
    })
    .catch((error) => {
      console.log(error)
      process.exit(1)
    })

module.exports = { connectDB }
