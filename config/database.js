require("dotenv").config()
const mysql = require("mysql")

// Create connection
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
})

// Only connect if not in test environment
if (process.env.NODE_ENV !== 'test') {
	//Connect
	db.connect((err) => {
		if (err) {
			throw err
		}
		console.log("MySql connected ... ")
	})
}

module.exports = db
