const express = require('express')
const router = express.Router()
const usersRoutes = require('./user')
const authRoutes = require('./auth')

router.get('/', function(req, res, next) {
	res.status(200).json ({
		status: 'success',
		message: 'Welcome to Matcha API'
  })
})

router.use(usersRoutes)
router.use(authRoutes)

module.exports = router
