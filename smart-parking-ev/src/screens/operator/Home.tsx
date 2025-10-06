import { Link } from 'react-router-dom'

export default function OperatorHome() {
	return (
		<div className="stack">
			<h2>Operator</h2>
			<div className="card stack">
				<Link to="/operator/inventory" className="btn">Manage Inventory & Pricing</Link>
			</div>
		</div>
	)
}


