import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
	console.log(err.message)

	if (err.message === 'Invalid flights. Orphan flight detected.') {
		res.status(400).json({ error: err.message })
	} else if (err.message === 'Invalid flights. Loop detected.') {
		res.status(400).json({ error: err.message })
	} else if ('sql' in err) {
		res.status(400).json({ code: err.code, error: err.message })
	} else {
		res.status(500).json({ error: err.message })
	}
}
