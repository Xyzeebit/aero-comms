import React, { useState } from 'react';
import { Plane, Search, Plus, Clock } from 'lucide-react';
import { useCommsStore, type FlightStatus } from '../store/useCommsStore';

export const FlightPlansView: React.FC = () => {
  const { flightPlans, setNewFlightPlanModalOpen, updateFlightPlanStatus } = useCommsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredPlans = flightPlans.filter((fp) => {
    const matchesSearch = fp.callSign.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          fp.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || fp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Search & Actions Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700">
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Flight Plans Registry</h2>
            <p className="text-xs text-slate-500 font-medium">Registered tower flight clearances & IFR/VFR routes</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search callsign or route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-emerald-500 font-semibold"
          >
            <option value="ALL">All Statuses</option>
            <option value="FILED">FILED</option>
            <option value="RECEIVED">RECEIVED</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          {/* File New Flight Plan button */}
          <button
            onClick={() => setNewFlightPlanModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center justify-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>File Flight Plan</span>
          </button>
        </div>
      </div>

      {/* Flight Plans Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/70">
                <th className="py-3.5 px-4">Filing Time (UTC)</th>
                <th className="py-3.5 px-4">Call Sign</th>
                <th className="py-3.5 px-4">Aircraft Type</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Rules</th>
                <th className="py-3.5 px-4">Altitude</th>
                <th className="py-3.5 px-4">Route</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPlans.map((fp) => (
                <tr key={fp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-600 flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{fp.time}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-slate-900 text-sm">{fp.callSign}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{fp.aircraftType || 'B737'}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {fp.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-700 font-extrabold">{fp.filingType}</td>
                  <td className="py-3.5 px-4 font-mono text-amber-600 font-bold">{fp.altitude || 'FL330'}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 text-xs">{fp.route}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold ${
                      fp.status === 'FILED' 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : fp.status === 'RECEIVED'
                        ? 'bg-sky-100 text-sky-700 border border-sky-200'
                        : fp.status === 'ACTIVE'
                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {fp.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={fp.status}
                      onChange={(e) => updateFlightPlanStatus(fp.id, e.target.value as FlightStatus)}
                      className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-slate-700 focus:border-emerald-500"
                    >
                      <option value="FILED">FILED</option>
                      <option value="RECEIVED">RECEIVED</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
