const CONFIG = require('./config/config')
const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const unknownEndpoint = require('./middleware/unknownEndpoint')
const signup = require('./routes/signup.route')
const login = require('./controllers/login.controller')
const blog = require('./routes/blogs.route')
const cors = require('cors')
const { requestLogger } = require('./utils/logger')

const app = express()

// connect to db
require('./middleware/db')('mongodb+srv://baccrie:gbenga@nodeexpressproject.ywglc5t.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority')

// allow requests from all origins
app.use(cors())

// parse information from request
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// use request logger
app.use(requestLogger)

// set info response
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Api Working.....',
    README: 'Will be updated later'
  })
})

app.use('/api/signup', signup)
app.use('/api/login', login)
app.use('/api/blog', blog)

// use middleware for unknown endpoints
app.use(unknownEndpoint)

// use error handler middleware
app.use(errorHandler)

module.exports = app