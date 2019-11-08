const configJson = require('../config/postgres')
const env = process.env.NODE_ENV
const config = configJson[env]

// pg-promise initialization options:
const initOptions = {}

// Load and initialize pg-promise:
const pgp = require('pg-promise')(initOptions)

// Create the database instance:
const db = pgp(config)

module.exports = db
