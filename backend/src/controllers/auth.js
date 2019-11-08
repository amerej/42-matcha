const authService = require('../services/auth')
const { saltRounds } = require('../config/jwt')
const bcrypt = require('bcrypt')
const { sendVerificationMail } = require('../sendMail')

const Users = require('../models/user')
const Auth = require('../models/auth')

const BadRequest = require('../errors/BadRequest')
const Unauthorized = require('../errors/Unauthorized')
const CustomError = require('../errors/CustomError')

const signin = async (req, res, next) => {
	try {
		// Find user
		const user = await Users.getUser ('username', req.body.username)
		if (!user)
			throw new Unauthorized (`Authentification failed. Wrong username or password`)

		// Check if user account is verified
		if (!user.is_account_verified)
			throw new Unauthorized (`Authentification failed. Account not verified`)

		// Load hash from your password DB
		const match = await bcrypt.compare (req.body.password || '', user['password'])
		if (!match)
			throw new Unauthorized (`Authentification failed. Wrong username or password`)

		const auth_user = await authService.authenticate (user)

		// Update user is_online
		await Users.updateIsUserOnline (auth_user['userId'])

		res.status(200).json({ status: 'success', message: 'Sign in success. User successfully signed in',
			userId: auth_user['userId'],
			username: auth_user['username'],
			accessToken: auth_user['accessToken'],
			expiresIn: auth_user['expiresIn']
		})
	} catch (e) { next (e) }
}

const signup = async (req, res, next) => {
	try {
		// check if username exists
		const username = await Users.checkIfExists ('username', req.body.username)
		if (username.exists) throw new BadRequest ('Registration failed. User with this username already registered.')

		// check if email exists
		const email = await Users.checkIfExists ('email', req.body.email)
		if (email.exists) throw new BadRequest ('Registration failed. User with this email already registered.')

		// generate a salt && hash the password along with our new salt
		const salt = await bcrypt.genSalt (saltRounds)
		const hash_password = await bcrypt.hash (req.body.password, salt)

		// insert user in DB
		const user = await Users.addUser (req.body.email, req.body.username, req.body.firstname, req.body.lastname, hash_password)

		// send mail with verification link
		await sendVerificationMail (req.body.email, user.uuid)
		
		res.status(200).json({
			status: 'success',
			message: 'Registration success. User successfully registered'
		})
	} catch (e) { next(e) }
}

const verify = async (req, res, next) => {
	try {
		// check if uuid's matches
		console.log(req.body.uuid)
		const account = await Auth.checkIfExists ('uuid', req.body.uuid)
		console.log(account)
		if (!account.exists) {
			return res.status(200).json({
				status: 'error',
				message: 'Verification error. Invalid code!'
			});
		}
		// set account verified
		await Auth.updateIsAccountVerified (req.body.uuid);

		res.status(200).json({
			status: 'success',
			message: 'Verification success. Account validated!'
		});
	} catch (e) {
		res.status(500).json({
			status: 'error',
			message: 'Verification error. Unexpected error!'
		});
	}
}

const signout = async (req, res, next) => {
	try {
		await Users.updateIsUserOnline (req.body.userId)
	
	} catch (e) { return next(e) }
	res.status(200).json({
		status: 'success',
		message: 'Signout success'
	})
}

const sendmail = async (req, res, next) => {
	
	var user, verifiedAccount

	try {
		user = await Users.getUser ('user_id', req.body.userId)
		if (!user)
			throw new BadRequest('Resend email failure. User not find.')
	} catch (e) { return next(e) }

	// creating an account verified for email verification
	try {
		verifiedAccount = await getVerifiedAccount ('id', req.body.userId)
		if (!verifiedAccount) {
			throw new BadRequest ('Resend email failure. Account not find')
		}
	} catch (e) {
		return next (e)
	}

	// send mail with verification link
	try {
		const mail = await sendVerificationMail(user.email, accountVerified.uuid)
	} catch (e) {
		throw new CustomError('Resend email failure. Error sending verification email')
	}

	res.status(200).json({
		success: true,
		message: 'Resend email success. Mail successfully resend'
	})
}

export {
	signin,
	signup,
	verify,
	signout
}
