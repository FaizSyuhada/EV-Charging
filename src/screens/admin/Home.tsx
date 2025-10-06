import { db } from '../../lib/db'

export default function AdminHome() {
	const d = db.read()
	const total = d.reservations.length
	const revenue = d.reservations.reduce((sum, r) => sum + (r.paidAt ? r.amountTotal : 0), 0)
	const utilization = Math.min(100, Math.round((total / (d.spots.length * 50)) * 100))
	return (
		<div className="stack">
			<h2>Admin</h2>
			<div className="card stack">
				<div>Total Reservations: {total}</div>
				<div>Utilization: {utilization}%</div>
				<div>Revenue (to date): ${revenue.toFixed(2)}</div>
			</div>
		</div>
	)
}


