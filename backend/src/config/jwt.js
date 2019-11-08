module.exports = {
  saltRounds: 2,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
	accessTokenExpireTime: 21600
}

// 21600 = 3600 * 6 = 6h
