import React, { useState } from 'react';
import { Activity, Plus, Search, Clock } from 'lucide-react';
import { useCommsStore } from '../store/useCommsStore';

export const AirTrafficEventsView: React.FC = () => {
  const { events, setNewEventModalOpen } = useCommsStore();
  const [stationFilter, setStationFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter((evt) => {
    const matchesStation = stationFilter === 'ALL' || evt.station === stationFilter;
    const matchesSearch = evt.callSign.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          evt.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStation && matchesSearch;
  });

  const renderEventTypeBadge = (type: string) => {
    switch (type) {
      case 'DEPARTURE':
        return <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-sky-100 text-sky-700 border border-sky-200">DEPARTURE</span>;
      case 'ARRIVAL':
        return <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-emerald-100 text-emerald-700 border border-emerald-200">ARRIVAL</span>;
      case 'GROUND':
        return <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-amber-100 text-amber-700 border border-amber-200">GROUND</span>;
      case 'OVERFLIGHT':
        return <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-purple-100 text-purple-700 border border-purple-200">OVERFLIGHT</span>;
      case 'HANDOVER':
        return <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-200">HANDOVER</span>;
      case 'EMERGENCY':
        return <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-rose-100 text-rose-700 border border-rose-200 animate-pulse">EMERGENCY</span>;
      default:
        return <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-emerald-100 text-emerald-700 border border-emerald-200">COMM CHECK</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-sky-600">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Air Traffic Events – Live Operational Log</h2>
            <p className="text-xs text-slate-500 font-medium">Continuous radio communications log, clearances & emergency events</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search callsign or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          <select
            value={stationFilter}
            onChange={(e) => setStationFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-emerald-500 font-semibold"
          >
            <option value="ALL">All Stations</option>
            <option value="TWR">TWR (Tower)</option>
            <option value="GND">GND (Ground)</option>
            <option value="APP">APP (Approach)</option>
            <option value="ACC">ACC (Area Control)</option>
            <option value="EMG">EMG (Emergency)</option>
          </select>

          <button
            onClick={() => setNewEventModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center justify-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Log Event</span>
          </button>
        </div>
      </div>

      {/* Events Stream Feed */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/70">
                <th className="py-3.5 px-4">Time (UTC)</th>
                <th className="py-3.5 px-4">Station</th>
                <th className="py-3.5 px-4">Call Sign</th>
                <th className="py-3.5 px-4">Origin / Dest</th>
                <th className="py-3.5 px-4">Event Type</th>
                <th className="py-3.5 px-4">Communication & Action Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-600 flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evt.time}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800 font-mono text-sm">{evt.station}</td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-slate-900 text-sm">{evt.callSign}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">{evt.originDest}</td>
                  <td className="py-3.5 px-4">{renderEventTypeBadge(evt.eventType)}</td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{evt.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
