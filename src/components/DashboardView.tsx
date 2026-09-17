import React from 'react';
import { 
  Radio, 
  FileText, 
  Activity, 
  Plus, 
  ArrowRight, 
  Wrench, 
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useCommsStore, type EquipmentItem } from '../store/useCommsStore';

export const DashboardView: React.FC = () => {
  const { 
    events, 
    flightPlans, 
    equipment, 
    reports, 
    setActiveTab, 
    setNewEventModalOpen, 
    setNewReportModalOpen,
    setNewFlightPlanModalOpen,
    setSelectedEquipmentId,
    toggleEquipmentStatus
  } = useCommsStore();

  const serviceableCount = equipment.filter(e => e.status === 'SERVICEABLE').length;

  const renderEventTypeBadge = (type: string) => {
    switch (type) {
      case 'DEPARTURE':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-sky-100 text-sky-700 border border-sky-200/80">DEPARTURE</span>;
      case 'ARRIVAL':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-700 border border-emerald-200/80">ARRIVAL</span>;
      case 'GROUND':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-700 border border-amber-200/80">GROUND</span>;
      case 'OVERFLIGHT':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-purple-100 text-purple-700 border border-purple-200/80">OVERFLIGHT</span>;
      case 'HANDOVER':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200/80">HANDOVER</span>;
      case 'EMERGENCY':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-700 border border-rose-200/80 animate-pulse">EMERGENCY</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-700 border border-emerald-200/80">COMM CHECK</span>;
    }
  };

  const renderStatusBadge = (status: EquipmentItem['status']) => {
    if (status === 'SERVICEABLE') {
      return (
        <span className="flex items-center space-x-1.5 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>SERVICEABLE</span>
        </span>
      );
    }
    if (status === 'NOT SERVICEABLE') {
      return (
        <span className="flex items-center space-x-1.5 text-[11px] font-extrabold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          <span>NOT SERVICEABLE</span>
        </span>
      );
    }
    return (
      <span className="flex items-center space-x-1.5 text-[11px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        <span>MAINTENANCE</span>
      </span>
    );
  };

  return (
    <div className="space-y-5">
      {/* Top Metric Cards Row (Reference light style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Frequencies */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex items-center justify-between group">
          <div>
            <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Active Frequencies</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-1 group-hover:text-sky-600 transition-colors">6</div>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-600 mt-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All systems normal</span>
            </div>
          </div>
          <div className="p-3.5 bg-sky-50 rounded-2xl text-sky-600 group-hover:scale-110 transition-transform">
            <Radio className="w-6 h-6" />
          </div>
        </div>

        {/* Flight Plans Today */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex items-center justify-between group">
          <div>
            <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Flight Plans (Today)</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-1 group-hover:text-emerald-600 transition-colors">28</div>
            <div className="text-xs text-slate-500 mt-1 font-semibold flex items-center space-x-1">
              <span className="text-emerald-600 font-bold">28</span>
              <span>Filed / Received</span>
            </div>
          </div>
          <div className="p-3.5 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Air Traffic Events */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex items-center justify-between group">
          <div>
            <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Air Traffic Events</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-1 group-hover:text-purple-600 transition-colors">152</div>
            <div className="text-xs text-slate-500 mt-1 font-semibold">
              Recorded today
            </div>
          </div>
          <div className="p-3.5 bg-purple-50 rounded-2xl text-purple-600 group-hover:scale-110 transition-transform">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        {/* Equipment Health Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex items-center justify-between group">
          <div>
            <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Equipment Health</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">
              {serviceableCount} / {equipment.length}
            </div>
            <div className="text-xs text-emerald-600 mt-1 font-semibold">
              {Math.round((serviceableCount / equipment.length) * 100)}% Serviceability Index
            </div>
          </div>
          <div className="p-3.5 bg-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Span): Air Traffic Events & Recent Flight Plans */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Air Traffic Events – Live Log */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-200/80 flex items-center justify-between bg-white">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                <h3 className="font-extrabold text-base text-slate-900">Air Traffic Events – Live Log</h3>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setNewEventModalOpen(true)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all flex items-center space-x-1 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Event</span>
                </button>
                <button 
                  onClick={() => setActiveTab('events')}
                  className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/70">
                    <th className="py-3 px-4">Time (UTC)</th>
                    <th className="py-3 px-4">Station</th>
                    <th className="py-3 px-4">Call Sign</th>
                    <th className="py-3 px-4">Origin / Dest</th>
                    <th className="py-3 px-4">Event Type</th>
                    <th className="py-3 px-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {events.slice(0, 5).map((evt) => (
                    <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-600 flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{evt.time}</span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{evt.station}</td>
                      <td className="py-3.5 px-4 font-mono font-extrabold text-slate-900">{evt.callSign}</td>
                      <td className="py-3.5 px-4 text-slate-600 font-mono">{evt.originDest}</td>
                      <td className="py-3.5 px-4">{renderEventTypeBadge(evt.eventType)}</td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium truncate max-w-xs">{evt.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 bg-slate-50/60 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 px-4">
              <span>Showing 1 to {Math.min(5, events.length)} of {events.length} events</span>
              <button 
                onClick={() => setActiveTab('events')}
                className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-200 transition-colors text-xs shadow-2xs"
              >
                View All Events
              </button>
            </div>
          </div>

          {/* Section 2: Recent Flight Plans */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-200/80 flex items-center justify-between bg-white">
              <h3 className="font-extrabold text-base text-slate-900">Recent Flight Plans</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setNewFlightPlanModalOpen(true)}
                  className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition-all flex items-center space-x-1 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>File Plan</span>
                </button>
                <button 
                  onClick={() => setActiveTab('flight-plans')}
                  className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/70">
                    <th className="py-3 px-4">Time (UTC)</th>
                    <th className="py-3 px-4">Call Sign</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Rules</th>
                    <th className="py-3 px-4">Route</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {flightPlans.slice(0, 5).map((fp) => (
                    <tr key={fp.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">{fp.time}</td>
                      <td className="py-3.5 px-4 font-mono font-extrabold text-slate-900">{fp.callSign}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {fp.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-emerald-700 font-bold">{fp.filingType}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-600 text-xs truncate max-w-xs">{fp.route}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold ${
                          fp.status === 'FILED' 
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                            : 'bg-sky-100 text-sky-700 border border-sky-200'
                        }`}>
                          {fp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (1 Span): Equipment Status & Pending Reports */}
        <div className="space-y-6">
          {/* Equipment Status Widget (Requirements #3: SERVICEABLE vs NOT SERVICEABLE) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
                <Wrench className="w-4 h-4 text-emerald-600" />
                <span>Equipment Status</span>
              </h3>
              <button 
                onClick={() => setActiveTab('equipment')}
                className="text-xs font-bold text-sky-600 hover:text-sky-700"
              >
                View All
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {equipment.slice(0, 7).map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedEquipmentId(item.id)}
                  className="p-3 bg-slate-50/80 hover:bg-slate-100 rounded-xl border border-slate-200/80 flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="p-1.5 rounded-lg bg-white text-slate-600 border border-slate-200 shadow-2xs">
                      <Radio className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">{item.name}</div>
                      {item.frequency && (
                        <div className="text-[10px] font-mono text-slate-500">{item.frequency}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {renderStatusBadge(item.status)}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleEquipmentStatus(item.id);
                      }}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200"
                      title="Quick toggle status"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend as in attached reference image */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 px-1 font-semibold">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Serviceable</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Maintenance</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Not Serviceable</span>
              </span>
            </div>
          </div>

          {/* Pending Reports Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Pending Reports</span>
              </h3>
              <button 
                onClick={() => setActiveTab('reports')}
                className="text-xs font-bold text-sky-600 hover:text-sky-700"
              >
                View All
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {reports.slice(0, 3).map((rep) => (
                <div key={rep.id} className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-900">{rep.title}</div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                      rep.priority === 'HIGH'
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : rep.priority === 'MEDIUM'
                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                        : 'bg-sky-100 text-sky-700 border border-sky-200'
                    }`}>
                      {rep.priority}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">{rep.timestamp}</div>
                  <div className="text-[11px] text-slate-600 line-clamp-2">{rep.details}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setNewReportModalOpen(true)}
              className="mt-4 w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-sky-600 border border-sky-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-2xs"
            >
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Create New Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
