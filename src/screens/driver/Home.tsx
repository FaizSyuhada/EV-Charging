import { Link } from 'react-router-dom'

export default function DriverHome() {
	return (
		<div className="stack">
			<h2>Driver</h2>
			<div className="card stack">
				<Link to="/driver/search" className="btn primary">Search & Reserve Spot</Link>
			</div>
		</div>
	)
}


