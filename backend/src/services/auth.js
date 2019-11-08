const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { accessTokenSecret, accessTokenExpireTime } = require('../config/jwt')

const authenticate = user => {

	const payload = {
		username: user.username,
		userId: user.person_id,
		password: user.password,
		time: new Date ()
	}
	return {
		userId: user.person_id,
		username: user.username,
		accessToken: jwt.sign(payload, accessTokenSecret, { expiresIn : accessTokenExpireTime }),
		expiresIn: accessTokenExpireTime
	}
}

export {
	authenticate
}
