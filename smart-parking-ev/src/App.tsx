import { Link, Outlet } from 'react-router-dom'
import React from 'react'

export default function App() {
	return (
		<div className="app-shell">
			<header className="app-header">Smart Parking & EV</header>
			<main className="app-main">
				<nav className="role-nav">
					<Link to="/driver">Driver</Link>
					<Link to="/operator">Operator</Link>
					<Link to="/enforcement">Enforcement</Link>
					<Link to="/admin">Admin</Link>
				</nav>

				<React.Suspense fallback={<div>Loading…</div>}>
					<Outlet />
				</React.Suspense>
			</main>
		</div>
	)
}


