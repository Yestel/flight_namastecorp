import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
	console.log(err.message)

	if (err.name === 'BadRequest') {
		res.status(400).json({ error: err.message })
	} else if (err.sql) {
		res.status(400).json({ code: err.code, error: err.message })
	} else {
		res.status(500).json({ error: err.message })
	}
}
