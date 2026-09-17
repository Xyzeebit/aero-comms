import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CommunicationsView } from './components/CommunicationsView';
import { FlightPlansView } from './components/FlightPlansView';
import { AirTrafficEventsView } from './components/AirTrafficEventsView';
import { EquipmentView } from './components/EquipmentView';
import { ReportsView } from './components/ReportsView';
import { ChangeFrequencyModal } from './components/Modals/ChangeFrequencyModal';
import { NewEventModal } from './components/Modals/NewEventModal';
import { NewReportModal } from './components/Modals/NewReportModal';
import { NewFlightPlanModal } from './components/Modals/NewFlightPlanModal';
import { EquipmentDetailModal } from './components/Modals/EquipmentDetailModal';
import { useCommsStore } from './store/useCommsStore';

export function App() {
  const { activeTab } = useCommsStore();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':      return <DashboardView />;
      case 'communications': return <CommunicationsView />;
      case 'flight-plans':   return <FlightPlansView />;
      case 'events':         return <AirTrafficEventsView />;
      case 'equipment':      return <EquipmentView />;
      case 'reports':        return <ReportsView />;
      default:               return <DashboardView />;
    }
  };

  return (
    /* Root: full viewport, no overflow, no gradients */
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      {/* Fixed-width forest-green sidebar */}
      <Sidebar />

      {/* Right side: header + scrollable content — takes remaining width */}
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        <Header />

        {/* Scrollable main area — grows to fill available height */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 p-5">
          {renderActiveTab()}
        </main>
      </div>

      {/* Global Modals */}
      <ChangeFrequencyModal />
      <NewEventModal />
      <NewReportModal />
      <NewFlightPlanModal />
      <EquipmentDetailModal />
    </div>
  );
}

export default App;
