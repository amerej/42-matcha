'use strict'

module.exports = function Unauthorized(message) {

  Error.captureStackTrace(this, this.constructor)

  this.name = 'Unauthorized'
  this.message = message || 'Unauthorized'
  this.status = 401
  this.code = 401
}

require('util').inherits(module.exports, Error)
