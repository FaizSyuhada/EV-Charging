import { Link, useNavigate, useParams } from 'react-router-dom'
import { checkIn, checkoutAndBill, getReservation, pay, startCharging, stopCharging } from '../../lib/api'

export default function ReservationScreen() {
	const { id } = useParams()
	const nav = useNavigate()
	const r = id ? getReservation(id) : undefined
	if (!r) return <div>Reservation not found</div>

	const canCheckIn = r.status === 'reserved'
	const charging = !!r.chargeStartedAt
	const canCheckout = r.status === 'active'
	const done = r.status === 'completed'

	return (
		<div className="stack">
			<h3>Reservation</h3>
			<div className="card stack">
				<div>Spot: {r.spotName}</div>
				<div>Plate: {r.plate}</div>
				<div>QR Token: {r.qrToken}</div>
				<div>Status: {r.status}</div>
			</div>

			{canCheckIn && (
				<button className="btn primary" onClick={() => { checkIn(r.id); nav(0) }}>Check-In (QR/NFC)</button>
			)}

			{r.status === 'active' && (
				<div className="card stack">
					<div>Charging: {charging ? 'In progress' : 'Stopped'} ({r.chargeKwh.toFixed(2)} kWh)</div>
					<div className="stack" style={{ gridTemplateColumns: '1fr 1fr', display: 'grid' }}>
						<button className="btn" onClick={() => { startCharging(r.id); nav(0) }}>Start</button>
						<button className="btn" onClick={() => { stopCharging(r.id); nav(0) }}>Stop</button>
					</div>
				</div>
			)}

			{canCheckout && (
				<button className="btn" onClick={() => { checkoutAndBill(r.id); nav(0) }}>Stop Session & Bill</button>
			)}

			{done && (
				<div className="card stack">
					<div>Parking: ${r.amountParking.toFixed(2)}</div>
					<div>Energy: ${r.amountEnergy.toFixed(2)}</div>
					<div>Penalty: ${r.amountPenalty.toFixed(2)}</div>
					<div style={{ fontWeight: 700 }}>Total: ${r.amountTotal.toFixed(2)}</div>
					{!r.paidAt ? (
						<button className="btn primary" onClick={async () => { await pay(r.id); nav(0) }}>Pay & Get Receipt</button>
					) : (
						<Link className="btn" to="/driver">Done</Link>
					)}
				</div>
			)}
		</div>
	)
}


