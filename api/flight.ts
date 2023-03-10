import { Router, Request, Response, NextFunction } from 'express'

import { Flight, sortFlights } from '../controller/flight'
import { pool } from '../config/db'

const router = Router()

router.post('/api/flight', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const flights: Flight[] = req.body
		const ipAddress = req.ip
		const timestamp = new Date()

		const sortedFlights = sortFlights(flights)

		const connection = await pool.getConnection()
		try {
			await connection.query('INSERT INTO flight (flights, ip_address, timestamp) VALUES (?, ?, ?)', [JSON.stringify(sortedFlights), ipAddress, timestamp])
		} finally {
			connection.release()
		}

		res.status(200).json(sortedFlights)
	} catch (err) {
		next(err)
	}
})

export default router
