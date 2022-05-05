require('dotenv').config({path: './secrets.env'})
module.exports = {
	emailpassword: process.env.EMAIL_PASSWORD,
	sessionsecret: process.env.SESSION_SECRET,
	googleid: process.env.GOOGLE_CLIENT_ID,
	googlesecret: process.env.GOOGLE_CLIENT_SECRET
}