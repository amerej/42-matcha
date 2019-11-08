const Users = require('../models/user');
const optionsNodeGeocoder = require('../config/nodeGeocoder');
const NodeGeocoder = require('node-geocoder');
const { saltRounds } = require('../config/jwt');
const bcrypt = require('bcrypt');
const CustomError = require('../errors/CustomError');
const BadRequest = require('../errors/BadRequest');
const _fill = require('lodash/fill');
const _omit = require('lodash/omit');

const sendSuccess = (res, message) => data => {
  res.status(200).json({type: 'success', message, data})
}

const sendError = (res, status, message) => error => {
  res.status(status || error.status).json({
    type: 'error', 
    message: message || error.message, 
    error
  })
}

const getUserProfile = async (req, res, next) => {
	try {
		let result = await Users.getUserProfile('person_id', req.params.user_id);
		const geocoder = NodeGeocoder(optionsNodeGeocoder);
		const pictures = _fill(Array(5), process.env.UPLOAD_PATH + "empty.png");

		for (let key in result.pictures) {
			pictures.splice(result.pictures[key].index, 1, process.env.UPLOAD_PATH + result.pictures[key].filename);
		}
		result.pictures = pictures;
	
		// const userLocalization = await geocoder.reverse(
		// 	{ lat: result.latitude, lon: result.longitude })
		// result.localization = userLocalization[0].city
		result.localization = "nowhere";
		result = _omit(result, ["latitude", "longitude"])

		sendSuccess(res, `Retrieve user profile success.`)(result);

		// res.status(200).json ({
		// 	status: 'success',
		// 	message: `Retrieve user profile success.`,
		// 	result
    // });
	} catch (err) { next (err) }
}

// const getUserProfile = async (req, res, next) => {
// 	try {
// 		let result = await Users.getUserProfile('person_id', req.params.user_id);
// 		const geocoder = NodeGeocoder(optionsNodeGeocoder);
// 		const pictures = _fill(Array(5), process.env.UPLOAD_PATH + "empty.png");

// 		for (let key in result.pictures) {
// 			pictures.splice(result.pictures[key].index, 1, process.env.UPLOAD_PATH + result.pictures[key].filename);
// 		}
// 		result.pictures = pictures;
	
// 		// const userLocalization = await geocoder.reverse(
// 		// 	{ lat: result.latitude, lon: result.longitude })
// 		// result.localization = userLocalization[0].city
// 		result.localization = "nowhere";
// 		result = _omit(result, ["latitude", "longitude"])
// 		console.log(result)

// 		res.status(200).json ({
// 			status: 'success',
// 			message: `Retrieve user profile success.`,
// 			result
//     });
// 	} catch (err) {
// 			res.status(200).json ({
// 			status: 'error',
// 			message: `Retrieve user profile failed.`
// 		});
// 	}
// }

const updateUserProfile = async (req, res, next) => {
	try {
		// const geocoder = NodeGeocoder(optionsNodeGeocoder)
		// const userLocalization = req.body.localization || null
		let latitude = null
		let longitude = null
		// if (userLocalization) {
		// 	const result = await geocoder.geocode(userLocalization)
		// 	if (result) {
		// 		latitude = result[0].latitude
		// 		longitude = result[0].longitude
		// 	}
		// }
		const user = {
			userId: req.user.userId || null,
			gender: req.body.gender || null,
			orientation: req.body.orientation || null,
			bio: req.body.bio || null,
			age: req.body.age || null,
			latitude: latitude || null,
			longitude: longitude || null,
			localization: req.body.localization || null,
			tag: req.body.tag || null
		}
    const result = await Users.updateUserProfile (user)
		res.status(200).json({ status: 'success', message: `Update user profile success !`,
			gender: result.gender,
			orientation: result.orientation,
			bio: result.bio,
			age: result.age,
			popularity:  result.popularity,
			latitude: result.latitude,
			longitude: result.longitude,
			// localization: userLocalization[0].city,
			localization: 'nowhere',
			tag: result.tag
		})
	}
	catch (err) { next (new CustomError (err, `Update user profile error.`)) }
}

const getUserAccount = async (req, res, next) => {
	try {
		const result = await Users.getUser ('person_id', req.user.userId) 
		res.status(200).json ({ status: 'success', message: `Retrieve user account success.`,
      email: result.email,
			username: result.username,
			firstname: result.firstname,
			lastname: result.lastname
    })
	}
	catch (err) { next (new CustomError (err, `Retrieve user account error.`)) }
}

const updateUserAccount = async (req, res, next) => {
	try {
		// check if username || email exists
		const username = await Users.checkIfExists ('username', req.body.username)
		if (username.exists) {
			throw new BadRequest (`Update user account error. Username already exists.`)
		}
	
		const email = await Users.checkIfExists('email', req.body.email)
		if (email.exists) {
			throw new BadRequest (`Update user account error. Email already registered.`)
		}

		let password_hash = ''
		if (req.body.password) {
			// generate a salt && hash the password along with our new salt
			const salt = await bcrypt.genSalt (saltRounds)
			password_hash = await bcrypt.hash (req.body.password, salt)
		}

		const user = {
			userId: req.user.userId || null,
			email: req.body.email || null,
			username: req.body.username || null,
			firstname: req.body.firstname || null,
			lastname: req.body.lastname || null,
			password: password_hash || null
		}

    const result = await Users.updateUserAccount (user)
    res.status(200).json({ status: 'success', message: `Update user account success.`,
			email: result.email,
			username: result.username,
			firstname: result.firstname,
			lastname: result.lastname
    })
	}
	catch (err) {
		next (err)
	}
}

// User Picture

const getUserPictures = async (req, res, next) => {
	try {
		const pictures = await Users.getUserPictures (req.params.user_id)
		res.status(200).json({ status: 'success', message: `Retrieve user pictures success.`, pictures
		})
	} catch (err) { next (new CustomError (err, `Retrieve user pictures error.`, 500)) }
}

const updateUserPicture = async (req, res, next) => {
	try {
		const data = {
			userId: req.user.userId,
			index: req.body.index,
			filename: req.file.filename
		}
		const picture = await Users.updateUserPicture (data)

		res.status(200).json ({
			status: 'success',
			message: `Update user picture success !`,
			filename: picture.filename,
			index: picture.index,
		})
	} catch (err) { next (new CustomError (err, `Update user picture error.`, 500)) }
}

const getUserSearch = async (req, res, next) => {
	try {
		const query = {
			userId: req.user.userId,
			ageMin: req.query.age[0],
			ageMax: req.query.age[1],
			popMin: req.query.popularity[0],
			popMax: req.query.popularity[1],
			distance: req.query.distance,
			tag: req.query.tag || null
    }
    const users = await Users.getUserSearch(query)
    console.log(users)
		res.status(200).json ({ status: 'success', message: `Retrieve user search success.`, users })
	} catch (err) { next (new CustomError (err, `Retrieve user search failed.`)) }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const getUserProfileVisits = async(req, res, next) => {
	try {
		const result = await Users.getUserVisits(req.user.userId, req.query.limit || 0, req.query.offset || 0);

		for (let res of result) {
			let pictures = _fill(Array(5), process.env.UPLOAD_PATH + "empty.png");
			for (let key in res.pictures) {
				pictures.splice(res.pictures[key].index, 1, process.env.UPLOAD_PATH + res.pictures[key].filename);
			}
			res.pictures = pictures;
		}
    res.status(200).json({
			status: 'success',
			message: `Retrieve user visits success.`,
			result
		})
	} catch(err) { next(err) }
}

const addUserProfileVisit = async (req, res, next) => {
	try {
		const visit = await Users.addUserVisit (req.user.userId, req.body.currentRouteUserId)

		res.status(200).json ({ status: 'success', message: `Add user visit success.`,
			visit: {
				userId: visit.person_id,
				dateCreation: visit.date_creation,
				isUserNotified: visit.is_person_notified
			}
		})
	} catch (err) { next (new CustomError (err, `Add user visit failed.`)) }
}

export {
	getUserProfile,
	updateUserProfile,
	getUserAccount,
	updateUserAccount,
	updateUserPicture,
	getUserPictures,
	getUserSearch,
	getUserProfileVisits,
	addUserProfileVisit
}
