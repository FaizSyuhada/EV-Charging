export type Role = 'driver' | 'operator' | 'enforcement' | 'admin'

export interface Spot {
	id: string
	name: string
	address: string
	evCapable: boolean
	maxHeightMeters: number
	pricePerHour: number
	energyPricePerKwh: number
	capacity: number
	operatorId: string
}

export interface Reservation {
	id: string
	spotId: string
	spotName: string
	plate: string
	startTime: number // epoch ms
	endTime: number // epoch ms
	status: 'reserved' | 'active' | 'completed' | 'cancelled'
	checkInAt?: number
	checkOutAt?: number
	qrToken: string
	// Charging
	chargeStartedAt?: number
	chargeKwh: number
	// Billing
	parkingMinutes: number
	amountParking: number
	amountEnergy: number
	amountPenalty: number
	amountTotal: number
	paidAt?: number
}

export interface EnforcementResult {
	reservationId?: string
	plate?: string
	status: 'ok' | 'violation'
	reason?: string
}


