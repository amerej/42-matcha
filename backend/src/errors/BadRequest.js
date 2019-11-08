'use strict'

module.exports = function NotFound(message) {

  Error.captureStackTrace(this, this.constructor)

  this.name = 'BadRequest'
  this.message = message || 'Bad request'
  this.status = 400
  this.code = 400
}

require('util').inherits(module.exports, Error)
