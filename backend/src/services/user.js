const { getNewsCount } = require ('../models/user')

const getUserProfileVisitsNewCount = params => getNewsCount (params)

export {
	getUserProfileVisitsNewCount
}
