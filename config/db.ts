import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'password',
	database: process.env.MYSQL_DATABASE || 'flight',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
})
