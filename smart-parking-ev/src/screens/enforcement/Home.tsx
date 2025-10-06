import { Link } from 'react-router-dom'

export default function EnforcementHome() {
	return (
		<div className="stack">
			<h2>Enforcement</h2>
			<div className="card stack">
				<Link to="/enforcement/scan" className="btn primary">Scan Plate / QR</Link>
			</div>
		</div>
	)
}


