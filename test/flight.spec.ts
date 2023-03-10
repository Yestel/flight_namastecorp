import chai, { assert, expect } from 'chai'
import chaiHttp from 'chai-http'
import { Flight } from '../controller/flight'
import app from '../server'

chai.use(chaiHttp)

describe('POST /api/flight', () => {
	it('Error: Invalid flights. Orphan flight detected.', async () => {
		const flights: Flight[] = [
			{
				from: 'SFO',
				to: 'GRU'
			},
			{
				from: 'EZE',
				to: 'MIA'
			},
			{
				from: 'GRUD',
				to: 'SCL'
			},
			{
				from: 'MIA',
				to: 'SFO'
			}
		]
		const res = await chai.request(app).post('/api/flight').send(flights)

		expect(res).to.have.status(400)
		expect(res.body).to.have.property('error', 'Invalid flights. Orphan flight detected.')
	})

	it('Error: Invalid flights. Loop detected.', async () => {
		const flights: Flight[] = [
			{
				from: 'SFO',
				to: 'GRU'
			},
			{
				from: 'EZE',
				to: 'MIA'
			},
			{
				from: 'GRU',
				to: 'EZE'
			},
			{
				from: 'MIA',
				to: 'SFO'
			}
		]
		const res = await chai.request(app).post('/api/flight').send(flights)

		expect(res).to.have.status(400)
		expect(res.body).to.have.property('error', 'Invalid flights. Loop detected.')
	})

	it('Success', async () => {
		const flights: Flight[] = [
			{
				from: 'SFO',
				to: 'GRU'
			},
			{
				from: 'EZE',
				to: 'MIA'
			},
			{
				from: 'GRU',
				to: 'SCL'
			},
			{
				from: 'MIA',
				to: 'SFO'
			}
		]

		const result_flights = [
			{
				from: 'EZE',
				to: 'MIA'
			},
			{
				from: 'MIA',
				to: 'SFO'
			},
			{
				from: 'SFO',
				to: 'GRU'
			},
			{
				from: 'GRU',
				to: 'SCL'
			}
		]

		const res = await chai.request(app).post('/api/flight').send(flights)

		expect(res).to.have.status(200)
		assert.deepEqual(res.body, result_flights)
	})
})
