import { Reservation, Spot } from './types'

const LS_KEY = 'smart_parking_ev_db_v1'

interface DB {
	spots: Spot[]
	reservations: Reservation[]
}

function readDb(): DB {
	const raw = localStorage.getItem(LS_KEY)
	if (!raw) {
		const seeded = seed()
		localStorage.setItem(LS_KEY, JSON.stringify(seeded))
		return seeded
	}
	try {
		return JSON.parse(raw) as DB
	} catch {
		const seeded = seed()
		localStorage.setItem(LS_KEY, JSON.stringify(seeded))
		return seeded
	}
}

function writeDb(db: DB) {
	localStorage.setItem(LS_KEY, JSON.stringify(db))
}

function seed(): DB {
	const spots: Spot[] = [
		{
			id: 's1',
			name: 'Central Garage L1',
			address: '100 Main St',
			evCapable: true,
			maxHeightMeters: 2.0,
			pricePerHour: 2.5,
			energyPricePerKwh: 0.3,
			capacity: 50,
			operatorId: 'op1',
		},
		{
			id: 's2',
			name: 'Riverside Lot',
			address: '5 River Rd',
			evCapable: false,
			maxHeightMeters: 3.0,
			pricePerHour: 1.5,
			energyPricePerKwh: 0.0,
			capacity: 80,
			operatorId: 'op1',
		},
		{
			id: 's3',
			name: 'Tech Park EV Hub',
			address: '200 Innovation Ave',
			evCapable: true,
			maxHeightMeters: 2.2,
			pricePerHour: 3.0,
			energyPricePerKwh: 0.28,
			capacity: 30,
			operatorId: 'op2',
		},
	]
	return { spots, reservations: [] }
}

export const db = {
	read: readDb,
	write: writeDb,
}


