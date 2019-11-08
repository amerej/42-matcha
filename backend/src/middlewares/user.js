const Unauthorized = require ('../errors/Unauthorized')
const parseInt = require ('lodash/parseInt')

const andRestrictToSelf = (req, res, next) => {
	const paramsId = parseInt (req.params.user_id)
	// If our authenticated user is the user we are viewing then everything is fine :)
	if (paramsId !== req.user.userId)
		throw new Unauthorized ()
	next()
}

export {
	andRestrictToSelf
}
