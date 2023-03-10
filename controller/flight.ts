import { BadRequest } from '../config/error'

export interface Flight {
	from: string
	to: string
}

export function sortFlights(flights: Flight[]): Flight[] {
	const reverseMap = new Map<string, string>()
	const hash = new Set<String>()

	// create a reverse map
	for (const { from, to } of flights) {
		reverseMap.set(to, from)
	}

	// Find starting point
	let current = reverseMap.keys().next().value
	while (reverseMap.has(current)) {
		if (hash.has(current)) {
			throw new BadRequest('Invalid flights. Loop detected.')
		}
		hash.add(current)
		current = reverseMap.get(current)!
	}

	// Sort flights
	const sortedFlights: Flight[] = []
	while (flights.length > 0) {
		const index = flights.findIndex(flight => flight.from === current)
		const flight = flights[index]

		if (!flight) {
			throw new BadRequest('Invalid flights. Orphan flight detected.')
		}

		sortedFlights.push(flight)
		flights.splice(index, 1)
		current = flight.to
	}

	return sortedFlights
}
