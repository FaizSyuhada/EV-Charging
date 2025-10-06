import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'

const DriverHome = React.lazy(() => import('./screens/driver/Home'))
const DriverSearch = React.lazy(() => import('./screens/driver/Search'))
const DriverReservation = React.lazy(() => import('./screens/driver/Reservation'))
const OperatorHome = React.lazy(() => import('./screens/operator/Home'))
const OperatorInventory = React.lazy(() => import('./screens/operator/Inventory'))
const EnforcementHome = React.lazy(() => import('./screens/enforcement/Home'))
const EnforcementScan = React.lazy(() => import('./screens/enforcement/Scan'))
const AdminHome = React.lazy(() => import('./screens/admin/Home'))

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: 'driver', element: <DriverHome /> },
			{ path: 'driver/search', element: <DriverSearch /> },
			{ path: 'driver/reservation/:id', element: <DriverReservation /> },
			{ path: 'operator', element: <OperatorHome /> },
			{ path: 'operator/inventory', element: <OperatorInventory /> },
			{ path: 'enforcement', element: <EnforcementHome /> },
			{ path: 'enforcement/scan', element: <EnforcementScan /> },
			{ path: 'admin', element: <AdminHome /> },
		],
	},
])


