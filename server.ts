import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'

import flightRouter from './api/flight'
import { errorHandler } from './middleware/errorHandler'

const app = express()
app.use(bodyParser.json())

app.get('/api/healthcheck', async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.json({ status: 'ok' })
	} catch (error) {
		next(error)
	}
})

app.use(flightRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3000
const server = app.listen(3000, () => {
	console.log(`Listening on port: ${PORT}`)
})

export default server
