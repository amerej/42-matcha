const jwt = require ('jsonwebtoken')
const { accessTokenSecret } = require ('../config/jwt')
const Unauthorized = require ('../errors/Unauthorized')
const { checkIfAccountIsVerified } = require ('../models/auth')

const checkAuth = (req, res, next) => {

	if (!req.token)
		throw new Unauthorized ('Authentication failed. No token provided.')
	
	jwt.verify (req.token, accessTokenSecret, (err, decoded) => {
		
		if (err) {
			throw new Unauthorized ('Authentication failed. Bad token provided.')
		}

		req.user = {
			username: decoded.username,
			userId: decoded.userId
		}
    next()
	})
}

const checkVerifiedAccount = async (req, res, next) => {
	try {
		// check if account is verified
		const account = await checkIfAccountIsVerified ('person_id', req.user.userId)

		if (!account.exists)
			throw new Unauthorized ('Verification failed. You need to verify your account.')

	} catch (e) {
		return next (e)
	}
	next ()
}

export {
	checkAuth,
	checkVerifiedAccount
}
