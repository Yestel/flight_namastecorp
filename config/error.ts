export class BadRequest extends Error {
	code: number = 400
	name: string = 'BadRequest'
}
