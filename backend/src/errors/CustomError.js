'use strict'

module.exports = function CustomError(err, message, code) {

  Error.captureStackTrace(this, this.constructor)

  this.name = 'CustomError'
  this.message = message || 'CustomError'
  this.status = code || 500
  this.code = code || 500
  this.err = err || null
}

require('util').inherits(module.exports, Error)
