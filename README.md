# Smart Parking & EV Charging Reservation System

Mobile-first web app built with **Vite + React + TypeScript**.

## Features

- **Driver**: Search & reserve parking spots, check-in via QR/NFC simulation, start/stop EV charging, pay & receive receipt
- **Operator**: Manage inventory, adjust dynamic pricing and energy rates
- **Enforcement**: Scan plate/QR to check for violations and unauthorized parking
- **Admin**: View analytics (reservations, utilization, revenue)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser (mobile viewport recommended).

## How It Works

All data is stored in **localStorage** (key: `smart_parking_ev_db_v1`). The app seeds 3 parking spots on first load.

### Use Cases Covered

1. **Search & Reserve Spot** – Filter by location, EV capability, price; reserve a slot
2. **Check-In with QR/NFC** – Validate reservation and simulate gate/barrier access
3. **Start/Stop Charging (EV)** – Track kWh consumed (simulated at 7 kW)
4. **Pay & Get Receipt** – Consolidated billing (parking + energy + penalties)
5. **Enforce Occupancy** – Scan to detect overstays or unauthorized use
6. **Operator Inventory & Pricing** – Adjust capacity, rates, and blackout windows

## Tech Stack

- React 18 + React Router
- TypeScript
- Vite (dev server & build)
- CSS (custom mobile-first styles)

## Notes

- Payment gateway is simulated with a short delay
- Charging power rate: 7 kW
- Penalties apply for overstays beyond reserved time

