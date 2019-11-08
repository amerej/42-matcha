const db = require ('../db/db')

// USERS

const updateIsUserOnline = userId => {
	return db.none (`
	update person set is_online = not is_online where person_id = $1`, userId)
}

const addUser = (email, username, firstname, lastname, password) => { 
	return db.one(`
		insert into person (email, username, firstname, lastname, password)
		values ($1, $2, $3, $4, $5)
		returning *`, [ email, username, firstname, lastname, password ])
}

const getUser = (identifier, value) => {
	return db.oneOrNone (`
	select *
	from person
	where upper(cast($1~ as text)) = upper(cast($2 as text))`, [ identifier, value ])
}

const checkIfExists = (identifier, value) => {
	return db.oneOrNone (`
	select exists(select 1 from person where upper($1~) = upper($2))`, [ identifier, value ])
}

const updateUserProfile = user => {
	return db.oneOrNone (`
	update person
	set
		gender = coalesce ($2, gender),
		orientation = coalesce ($3, orientation),
		bio = coalesce ($4, bio),
		age = coalesce ($5, age),
		latitude = coalesce ($6, latitude),
		longitude = coalesce ($7, longitude),
		tag = coalesce ($8, tag)
		where person_id = $1
	returning *`, [ user.userId, user.gender, user.orientation, user.bio, user.age, user.latitude, user.longitude, user.tag ])
}

const updateUserAccount = user => {
	return db.oneOrNone (`
	update person
	set
		email = coalesce ($2, email),
		username = coalesce ($3, username),
		firstname = coalesce ($4, firstname),
		lastname = coalesce ($5, lastname),
		password = coalesce ($6, password)
		WHERE person_id = $1
	returning *`, [ user.userId, user.email, user.username, user.firstname, user.lastname, user.password ])
}

const updateUserLocation = (userId, userGeoloc) => {
	return db.oneOrNone (`
	INSERT INTO Users (latitude, longitude)
	VALUES ($2, $3)
	WHERE user_id = $1 RETURNING *`, [ userId, userGeoloc.lat, userGeoloc.long ])
}

// USERS PICTURES

const getUserPictures = userId => {
	return db.any (`
	select index, filename
	from person_picture
	where person_id = $1`, userId)
}

const updateUserPicture = picture => {
	return db.oneOrNone (`
	insert into person_picture (person_id, index, filename)
	values ($1, $2, $3)
	on conflict on constraint person_id_index_uq
	do update set filename = $3
	returning *`, [ picture.userId, picture.index, picture.filename ])
}

// USERS SEARCH

const getUserSearch = ({ ageMin, ageMax, popMin, popMax, distance, tag, userId }) => {
  return db.any(`
    SELECT p2.person_id, p2.username, round(ST_Distance(p1.geo, p2.geo) / 1000) AS distance, pp.picture
    FROM person p1
    INNER JOIN person p2 ON round(ST_Distance(p1.geo, p2.geo) / 1000) <= $5
    LEFT JOIN LATERAL (
      SELECT pp.filename AS picture
      FROM (
        SELECT
          filename
        FROM person_picture
        WHERE person_picture.person_id = p2.person_id) pp
        LIMIT 1
      ) pp
    ON TRUE
    WHERE
    ($1 is null or p2.age >= $1)
		and ($2 is null or p2.age <= $2)
		and ($3 is null or p2.popularity >= $3)
		and ($4 is null or p2.popularity <= $4)
		and ($5 is null or round(ST_Distance(p1.geo, p2.geo) / 1000) <= $5)
    and ($6 is null or p2.tag = $6)
    and p1.person_id = $7
  `, [ ageMin, ageMax, popMin, popMax, distance, tag, userId ])
}

// const getUserSearch = ({ ageMin, ageMax, popMin, popMax, distance, tag, userId }) => {
// 	return db.tx(async t => {
//     const geo = await t.one (`select geo from person where person_id = $1`, userId, a => a.geo)
// 		return await t.any (`
//     select p.username, array_to_json(array_agg(row_to_json((pp)))) as pictures, round(ST_Distance($7, p.geo) / 1000) as distance
// 		from person p
//     left join (select person_id, index, filename from person_picture) pp on p.person_id = pp.person_id
// 		where
// 		($1 is null or age >= $1)
// 		and ($2 is null or age <= $2)
// 		and ($3 is null or popularity >= $3)
// 		and ($4 is null or popularity <= $4)
// 		and ($5 is null or round(ST_Distance($7, p.geo) / 1000) <= $5)
//     and ($6 is null or tag = $6)
//     group by p.person_id`, [ ageMin, ageMax, popMin, popMax, distance, tag, geo, userId ])
// 	})
// }

// USERS VISITS

const addUserVisit = (userId, userIdVisited) => {
	return db.oneOrNone (`
	insert into person_visit (person_id, person_visited_id)
	values ($1, $2)
	returning *`, [ userId, userIdVisited ])
}

const getUserVisits = (userId, limit, offset) => {
	return db.any (`
	SELECT 
		p.person_id,
		p.username,
		p.firstname,
		p.lastname,
		pv.date_creation,
		pv.is_person_notified,
		pp.pictures
	FROM person p
	LEFT JOIN LATERAL (
		SELECT json_agg(json_build_object('index', pp.index, 'filename', pp.filename)) AS pictures
		FROM (
			SELECT
				person_id,
				index,
				filename
			FROM person_picture
			WHERE person_picture.person_id = p.person_id) pp
		) pp
	ON TRUE
	INNER JOIN person_visit pv
	ON pv.person_id = p.person_id
	WHERE pv.person_visited_id = $1
	ORDER BY pv.date_creation DESC
	LIMIT $2
	OFFSET $3`, [ userId, limit, offset ])
}

const findUserNewNotificationsCount = userId => {
	return db.oneOrNone (`
	SELECT COUNT(*)
	FROM Users_Visits
	WHERE user_visited_id = $1 AND is_user_notified IS FALSE`, userId)
}

const updateNew = user_id => {
	return db.oneOrNone (`
	UPDATE Users_Visits
	SET is_user_notified = TRUE
	WHERE user_id = $1`, user_id)
}

const getUserProfile = (identifier, value) => {
	return db.oneOrNone(`
	SELECT
		p.person_id,
		p.username,
		p.firstname,
		p.lastname,
		p.gender,
		p.orientation,
		p.bio,
		p.age,
		p.popularity,
		p.latitude,
		p.longitude,
		p.localization,
		p.tag,
		p.is_online,
		pp.pictures
	FROM person p
	LEFT JOIN LATERAL (
		SELECT json_agg(json_build_object('index', pp.index, 'filename', pp.filename)) AS pictures
		FROM (
			SELECT
				person_id,
				index,
				filename
			FROM person_picture
			WHERE person_picture.person_id = p.person_id) pp
		) pp
	ON TRUE
	WHERE UPPER(CAST(p.$1~ AS text)) = UPPER(CAST($2 AS text))`, [ identifier, value ])
}

export {
	addUser,
	checkIfExists,
	getUser,
	getUserPictures,
	getUserSearch,
	updateUserLocation,
	updateUserProfile,
	updateUserAccount,
	updateIsUserOnline,
	updateUserPicture,
	addUserVisit,
	getUserVisits,
  getUserProfile
}
