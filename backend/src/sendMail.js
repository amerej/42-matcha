const nodemailer = require ('nodemailer')
const { serviceMail, authMail } = require ('./config/mail')

const sendVerificationMail = async(to, uuid) => {
	const transporter = nodemailer.createTransport({
		service: serviceMail,
		auth: {
			user: authMail.user,
			pass: authMail.pass
		}
	})
	var mailOptions = { from: authMail.user, to: to, subject: 'Matcha account verification', html: '<p>' + uuid + '</p>' }
	return await transporter.sendMail(mailOptions)
}

export {
  sendVerificationMail
}
