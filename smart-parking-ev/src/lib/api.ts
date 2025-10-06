import { db } from './db'
import { EnforcementResult, Reservation, Spot } from './types'

function uid(prefix: string) {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

export function listSpots(filters?: { evOnly?: boolean; maxPricePerHour?: number }) {
	const d = db.read()
	let list = d.spots
	if (filters?.evOnly) list = list.filter((s) => s.evCapable)
	if (filters?.maxPricePerHour != null) list = list.filter((s) => s.pricePerHour <= filters.maxPricePerHour!)
	return list
}

export function getSpot(id: string): Spot | undefined {
	return db.read().spots.find((s) => s.id === id)
}

export function reserveSpot(args: {
	spotId: string
	plate: string
	startTime: number
	endTime: number
}): Reservation {
	const d = db.read()
	const spot = d.spots.find((s) => s.id === args.spotId)
	if (!spot) throw new Error('Spot not found')
	const reservation: Reservation = {
		id: uid('r'),
		spotId: spot.id,
		spotName: spot.name,
		plate: args.plate,
		startTime: args.startTime,
		endTime: args.endTime,
		status: 'reserved',
		qrToken: uid('qr'),
		chargeKwh: 0,
		parkingMinutes: 0,
		amountParking: 0,
		amountEnergy: 0,
		amountPenalty: 0,
		amountTotal: 0,
	}
	d.reservations.unshift(reservation)
	db.write(d)
	return reservation
}

export function getReservation(id: string) {
	return db.read().reservations.find((r) => r.id === id)
}

export function findReservationByQrOrPlate(tokenOrPlate: string) {
	const d = db.read()
	return d.reservations.find((r) => r.qrToken === tokenOrPlate || r.plate.toLowerCase() === tokenOrPlate.toLowerCase())
}

export function checkIn(reservationId: string) {
	const d = db.read()
	const r = d.reservations.find((x) => x.id === reservationId)
	if (!r) throw new Error('Reservation not found')
	r.status = 'active'
	r.checkInAt = Date.now()
	db.write(d)
	return r
}

const CHARGE_RATE_KW = 7 // 7 kW home-like charger

export function startCharging(reservationId: string) {
	const d = db.read()
	const r = d.reservations.find((x) => x.id === reservationId)
	if (!r) throw new Error('Reservation not found')
	if (!r.checkInAt) throw new Error('Check-in required')
	r.chargeStartedAt = Date.now()
	db.write(d)
	return r
}

export function stopCharging(reservationId: string) {
	const d = db.read()
	const r = d.reservations.find((x) => x.id === reservationId)
	if (!r) throw new Error('Reservation not found')
	if (r.chargeStartedAt) {
		const elapsedHours = (Date.now() - r.chargeStartedAt) / 3_600_000
		r.chargeKwh += elapsedHours * CHARGE_RATE_KW
		r.chargeStartedAt = undefined
	}
	db.write(d)
	return r
}

export function checkoutAndBill(reservationId: string) {
	const d = db.read()
	const r = d.reservations.find((x) => x.id === reservationId)
	if (!r) throw new Error('Reservation not found')
	const spot = d.spots.find((s) => s.id === r.spotId)!

	// finalize any active charging
	if (r.chargeStartedAt) {
		const elapsedHours = (Date.now() - r.chargeStartedAt) / 3_600_000
		r.chargeKwh += elapsedHours * CHARGE_RATE_KW
		r.chargeStartedAt = undefined
	}

	r.checkOutAt = Date.now()

	const parkedMinutes = Math.max(0, Math.round(((r.checkOutAt ?? Date.now()) - (r.checkInAt ?? Date.now())) / 60000))
	r.parkingMinutes = parkedMinutes
	r.amountParking = (parkedMinutes / 60) * spot.pricePerHour
	r.amountEnergy = r.chargeKwh * spot.energyPricePerKwh

	// penalties: overstay past reserved endTime
	if ((r.checkOutAt ?? 0) > r.endTime) {
		const overMinutes = Math.round(((r.checkOutAt ?? 0) - r.endTime) / 60000)
		r.amountPenalty = Math.max(0, overMinutes * 0.2)
	}

	r.amountTotal = round2(r.amountParking + r.amountEnergy + r.amountPenalty)
	r.status = 'completed'
	db.write(d)
	return r
}

export async function pay(reservationId: string) {
	// simulate gateway call
	await new Promise((res) => setTimeout(res, 800))
	const d = db.read()
	const r = d.reservations.find((x) => x.id === reservationId)
	if (!r) throw new Error('Reservation not found')
	r.paidAt = Date.now()
	db.write(d)
	return r
}

export function enforcementCheck(input: string): EnforcementResult {
	const r = findReservationByQrOrPlate(input)
	if (!r) return { status: 'violation', reason: 'No reservation found', plate: input }
	if (r.status !== 'active') return { status: 'violation', reason: 'Not checked-in', reservationId: r.id, plate: r.plate }
	if (Date.now() > r.endTime) return { status: 'violation', reason: 'Overstay', reservationId: r.id, plate: r.plate }
	return { status: 'ok', reservationId: r.id, plate: r.plate }
}

export function operatorUpdateSpot(spotId: string, data: Partial<Spot>) {
	const d = db.read()
	const s = d.spots.find((x) => x.id === spotId)
	if (!s) throw new Error('Spot not found')
	Object.assign(s, data)
	db.write(d)
	return s
}

function round2(n: number) {
	return Math.round(n * 100) / 100
}


