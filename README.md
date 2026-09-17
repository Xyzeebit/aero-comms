# AeroComms 📡✈️

**AeroComms** is an Aeronautical Communications and Air Traffic Operations Management Dashboard built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Zustand**.

Designed for air traffic service stations, flight dispatchers, and tower communications teams, AeroComms provides real-time situational awareness, frequency management, flight plan tracking, event logging, and equipment serviceability monitoring in an intuitive, high-density interface.

---

## 🌟 Key Features

### 1. 📊 Central Operations Dashboard
- **Real-Time Station Overview**: Live operational metrics including active frequencies, active flights, critical equipment health scores, and urgent pending reports.
- **Quick Status Indicators**: Instant visibility into primary radio channels (Tower RX/TX, Ground, Approach, Emergency Guard `121.500 MHz`, and ATIS).
- **Recent Traffic & Event Feed**: Quick audit feed of latest air traffic events and communications checks.

### 2. 📻 Communications & Frequency Management
- **Frequency Control**: Monitor and adjust operational VHF frequencies for Tower (TWR), Ground (GND), Approach (APP), ATIS, and Guard.
- **Frequency Switch Modal**: Interactive frequency selector modal to adjust assigned channels with instant store synchronization.
- **Channel Health**: Real-time signal and transceiver operational status indicators.

### 3. 📋 Flight Plans Registry
- **Flight Plan Lifecycle**: Track flight plans across statuses (`FILED`, `RECEIVED`, `ACTIVE`, `CLOSED`, `DELAYED`).
- **IFR & VFR Support**: Clear visual badges for flight rules and route designations (DEP / ARR / OVER).
- **Search & Filtering**: Instant search across callsigns, routes, and operational statuses.
- **Filing Clearance**: File new flight plans directly via the interactive flight plan modal.

### 4. 🛩️ Air Traffic Events & Logbook
- **Station Event Logging**: Detailed chronological logging across stations (`TWR`, `GND`, `APP`, `ACC`, `EMG`).
- **Categorized Event Types**: Support for `DEPARTURE`, `ARRIVAL`, `GROUND`, `OVERFLIGHT`, `HANDOVER`, `COMM_CHECK`, and `EMERGENCY`.
- **Fast Event Entry**: Streamlined modal to log aircraft contact, squawk codes, handoffs, or safety incidents with exact UTC timestamps.

### 5. 🛠️ Equipment & Transceiver Monitoring
- **Serviceability Tracking**: Real-time statuses (`SERVICEABLE`, `UNDER MAINTENANCE`, `NOT SERVICEABLE`).
- **Health Scoring**: Visual health bars and diagnostic scores for transmitters, receivers, recorders, data terminals, and backup power units.
- **Equipment Detail Modal**: View technical specifications, serial numbers, last inspection dates, locations, and maintenance history.

### 6. 📝 Shift & Incident Reports
- **Incident & Shift Handover Reports**: Log priority-based operational notes (`HIGH`, `MEDIUM`, `LOW`).
- **Resolution & Status**: Track report lifecycle from open alerts to resolved/reviewed handovers.
- **New Report Entry**: Modal for generating maintenance requests, shift debriefs, and weather/runway notices.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Bundler & Dev Server** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Linter** | [Oxlint](https://oxc.rs/) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/aero-comms.git
   cd aero-comms
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles TypeScript and builds production assets to `dist/` |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Runs [Oxlint](https://oxc.rs/) for rapid static analysis |

---

## 📂 Project Structure

```text
aero-comms/
├── public/                 # Static assets (favicons, icons)
├── src/
│   ├── assets/             # Images and branding assets
│   ├── components/         # Core application views and layouts
│   │   ├── Modals/         # Interactive modals (Flight Plan, Event, Frequency, etc.)
│   │   ├── AirTrafficEventsView.tsx
│   │   ├── CommunicationsView.tsx
│   │   ├── DashboardView.tsx
│   │   ├── EquipmentView.tsx
│   │   ├── FlightPlansView.tsx
│   │   ├── Header.tsx
│   │   ├── ReportsView.tsx
│   │   └── Sidebar.tsx
│   ├── store/
│   │   └── useCommsStore.ts # Central Zustand store & operational data models
│   ├── App.tsx             # Root layout and view switcher
│   ├── index.css           # Global Tailwind and font styles
│   └── main.tsx            # Application entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🛡️ License

This project is licensed under the MIT License.
