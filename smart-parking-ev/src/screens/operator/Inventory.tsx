import { useState } from 'react'
import { getSpot, operatorUpdateSpot } from '../../lib/api'

export default function OperatorInventory() {
	const [spotId, setSpotId] = useState('s1')
	const spot = getSpot(spotId)
	if (!spot) return <div>No spot</div>
	return (
		<div className="stack">
			<h3>Inventory & Pricing</h3>
			<select value={spotId} onChange={(e) => setSpotId(e.target.value)}>
				<option value="s1">Central Garage L1</option>
				<option value="s2">Riverside Lot</option>
				<option value="s3">Tech Park EV Hub</option>
			</select>
			<div className="card stack">
				<label>Capacity <input value={spot.capacity} onChange={(e) => operatorUpdateSpot(spot.id, { capacity: Number(e.target.value) })} /></label>
				<label>$/hr <input value={spot.pricePerHour} onChange={(e) => operatorUpdateSpot(spot.id, { pricePerHour: Number(e.target.value) })} /></label>
				<label>$/kWh <input value={spot.energyPricePerKwh} onChange={(e) => operatorUpdateSpot(spot.id, { energyPricePerKwh: Number(e.target.value) })} /></label>
			</div>
		</div>
	)
}


