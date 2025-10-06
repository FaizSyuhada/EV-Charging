import { useMemo, useState } from 'react'
import { listSpots, reserveSpot } from '../../lib/api'
import { useNavigate } from 'react-router-dom'

export default function DriverSearch() {
	const [query, setQuery] = useState('')
	const [evOnly, setEvOnly] = useState(false)
	const [price, setPrice] = useState<number | ''>('')
	const [plate, setPlate] = useState('')
	const [duration, setDuration] = useState(60)
	const navigate = useNavigate()

	const spots = useMemo(() => listSpots({ evOnly, maxPricePerHour: price === '' ? undefined : Number(price) }), [evOnly, price])

	return (
		<div className="stack">
			<h3>Search & Reserve</h3>
			<input placeholder="Location (mock)" value={query} onChange={(e) => setQuery(e.target.value)} />
				<div className="stack" style={{ gridTemplateColumns: '1fr 1fr', display: 'grid' }}>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<input type="checkbox" checked={evOnly} onChange={(e) => setEvOnly(e.target.checked)} /> EV only
				</label>
				<input placeholder="Max $/hr" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))} />
			</div>
			<input placeholder="Plate" value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} />
			<select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
				<option value={30}>30 min</option>
				<option value={60}>1 hour</option>
				<option value={120}>2 hours</option>
			</select>

			<div className="stack">
				{spots.map((s) => (
					<div className="card" key={s.id}>
						<div style={{ fontWeight: 700 }}>{s.name}</div>
						<div style={{ color: '#a8b3bf' }}>{s.address}</div>
						<div style={{ display: 'flex', gap: 10, fontSize: 12, color: '#a8b3bf' }}>
							<div>{s.evCapable ? 'EV ✔' : 'EV ✖'}</div>
							<div>${s.pricePerHour}/hr</div>
						</div>
						<button
							className="btn primary block"
							onClick={() => {
								if (!plate) return alert('Enter plate')
								const start = Date.now()
								const end = start + duration * 60000
								const r = reserveSpot({ spotId: s.id, plate, startTime: start, endTime: end })
								navigate(`/driver/reservation/${r.id}`)
							}}
						>
							Reserve
						</button>
					</div>
				))}
			</div>
		</div>
	)
}


