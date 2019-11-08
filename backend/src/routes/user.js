const userController = require ('../controllers/user')
const authMiddleware = require ('../middlewares/auth')
const userMiddleware = require ('../middlewares/user')
const { upload } = require ('../config/multer')
const express = require ('express')
const router = express.Router()

router.put('/users/:user_id/profile',
	upload.array(),
	authMiddleware.checkAuth,
	authMiddleware.checkVerifiedAccount,
	userMiddleware.andRestrictToSelf,
	userController.updateUserProfile
)

router.put('/users/:user_id/profileFull',
	upload.array(),
	authMiddleware.checkAuth,
	authMiddleware.checkVerifiedAccount,
	userMiddleware.andRestrictToSelf,
	userController.updateUserProfile
)

router.get('/users/:user_id/profile',
	authMiddleware.checkAuth,
	authMiddleware.checkVerifiedAccount,
	userController.getUserProfile
)

router.put('/users/:user_id/account',
	upload.array(),
	authMiddleware.checkAuth,
	authMiddleware.checkVerifiedAccount,
	userMiddleware.andRestrictToSelf,
	userController.updateUserAccount
)

router.get('/users/:user_id/account',
	upload.array(),
	authMiddleware.checkAuth,
	authMiddleware.checkVerifiedAccount,
	userMiddleware.andRestrictToSelf,
	userController.getUserAccount
)

router.put('/users/:user_id/picture',
	authMiddleware.checkAuth,
	userMiddleware.andRestrictToSelf,
	upload.single('image'),
	userController.updateUserPicture
)

router.get('/users/:user_id/pictures',
	authMiddleware.checkAuth,
	userController.getUserPictures
)

router.post('/users/:user_id/visits',
	upload.array(),
	authMiddleware.checkAuth,
	authMiddleware.checkVerifiedAccount,
	userMiddleware.andRestrictToSelf,
	userController.addUserProfileVisit
)

router.get('/users/:user_id/visits',
	authMiddleware.checkAuth,
	authMiddleware.checkVerifiedAccount,
	userMiddleware.andRestrictToSelf,
	userController.getUserProfileVisits
)

router.get('/users/:user_id/search',
	authMiddleware.checkAuth,
	authMiddleware.checkVerifiedAccount,
	userController.getUserSearch
)

module.exports = router
