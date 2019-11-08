const db = require ( '../db/db' )

const updateIsAccountVerified = uuid => {
	return db.oneOrNone(`
	update person set is_account_verified = not is_account_verified where uuid = $1`, uuid)
}

const checkIfAccountIsVerified = (identifier, value) => {
	return db.oneOrNone(`
	select exists(select 1 from person where $1~ = $2 and is_account_verified = true)`, [ identifier, value ])
}

const checkIfExists = (identifier, value) => {
	return db.oneOrNone (`
	select exists(select 1 from person where $1~ = $2)`, [ identifier, value ])
}

export {
	updateIsAccountVerified,
	checkIfAccountIsVerified,
	checkIfExists
}
