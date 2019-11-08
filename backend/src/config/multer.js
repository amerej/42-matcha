const multer = require('multer')
const uuidv4 = require('uuid/v4')
const MAX_SIZE = 2 * 1000 * 1000

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb (null, __dirname + '/../../uploads')
    },
    filename: (req, file, cb) => {
      cb (null, uuidv4() + getExtension(file))
    }
})

const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: MAX_SIZE
	}
})

function getExtension (file) {
	if (file.mimetype === 'image/jpeg') return '.jpg'
	if (file.mimetype === 'image/png') return '.png'
	if (file.mimetype === 'image/gif') return '.gif'
}

function fileFilter (req, file, cb) {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
		let error = new Error ()
		error.code = 'BAD_FILE_TYPE'
		return cb (error, false)
	}
  return cb (null, true)
}

module.exports = {
	upload
}
