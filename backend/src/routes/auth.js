const authController = require ('../controllers/auth')
const { upload } = require ('../config/multer')
const express = require ('express')
const router = express.Router()

router.post('/signin',
	upload.array(),
	authController.signin
)

router.post('/signup',
	upload.array(),
	authController.signup
)

router.put('/signout',
	upload.array(),
	authController.signout
)

router.post('/verify',
	upload.array(),
	authController.verify
)

module.exports = router
