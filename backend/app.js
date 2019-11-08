const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require ('helmet')
const cors = require('cors')
const bearerToken = require('express-bearer-token')

const routes = require ('./src/routes')

const app = express()

app.use(helmet())
app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bearerToken())
app.use(cookieParser())
app.use(express.static('uploads'))

app.use(routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// Multer error handler
app.use(function (err, req, res, next) {
  if (err.code === 'LIMIT_FILE_SIZE') {
		return res.status(400).json({
      status: 'error',
      message: 'File is too big!'
    })
	}
	else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
		return res.status(400).json({
      status: 'error',
      message: 'Max file uploads reached!'
    })
	}
	else if (err.code === 'BAD_FILE_TYPE') {
    return res.status(400).json({
      status: 'error',
      message: 'Only images file are allowed!'
    })
	}
	next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({ error: err })
})

module.exports = app
