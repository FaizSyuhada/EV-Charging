import { useState } from 'react'
import { enforcementCheck } from '../../lib/api'

export default function EnforcementScan() {
	const [value, setValue] = useState('')
	const [out, setOut] = useState<string | null>(null)
	return (
		<div className="stack">
			<h3>Scan Plate / QR</h3>
			<input placeholder="Plate or QR token" value={value} onChange={(e) => setValue(e.target.value)} />
			<button className="btn primary" onClick={() => {
				const r = enforcementCheck(value)
				setOut(r.status === 'ok' ? `OK: reservation ${r.reservationId}` : `Violation: ${r.reason}`)
			}}>Check</button>
			{out && <div className="card">{out}</div>}
		</div>
	)
}


