'use strict';

module.exports = function NotFound(message) {

  Error.captureStackTrace(this, this.constructor)

  this.name = 'NotFound'
  this.message = message || 'The requested resource couldn\'t be found'
  this.status = 404
  this.code = 404
}

require('util').inherits(module.exports, Error)
