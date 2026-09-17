import React, { useState } from 'react';
import { X, Plane, Plus } from 'lucide-react';
import { useCommsStore, type FlightType, type FilingType } from '../../store/useCommsStore';

export const NewFlightPlanModal: React.FC = () => {
  const { isNewFlightPlanModalOpen, setNewFlightPlanModalOpen, addFlightPlan } = useCommsStore();
  const [callSign, setCallSign] = useState('');
  const [type, setType] = useState<FlightType>('DEP');
  const [filingType, setFilingType] = useState<FilingType>('IFR');
  const [route, setRoute] = useState('');
  const [aircraftType, setAircraftType] = useState('B737-800');
  const [altitude, setAltitude] = useState('FL330');

  if (!isNewFlightPlanModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callSign.trim()) return;

    addFlightPlan({
      callSign: callSign.toUpperCase(),
      type,
      filingType,
      route: route.toUpperCase() || 'DNMM SID LUZON5',
      status: 'FILED',
      aircraftType,
      altitude
    });

    setCallSign('');
    setRoute('');
    setNewFlightPlanModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-800/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 border border-emerald-200 rounded-lg">
              <Plane className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">File Flight Plan</h3>
              <p className="text-xs text-slate-500 font-medium">Register flight clearance, call sign & route waypoints</p>
            </div>
          </div>
          <button
            onClick={() => setNewFlightPlanModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Aircraft Call Sign</label>
              <input
                type="text"
                value={callSign}
                onChange={(e) => setCallSign(e.target.value)}
                placeholder="e.g. NGA702"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-500 uppercase"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Aircraft Type</label>
              <input
                type="text"
                value={aircraftType}
                onChange={(e) => setAircraftType(e.target.value)}
                placeholder="e.g. B737-800"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900 focus:outline-none focus:border-emerald-500 uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Flight Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as FlightType)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-500"
              >
                <option value="DEP">DEP (Departure)</option>
                <option value="ARR">ARR (Arrival)</option>
                <option value="OVER">OVER (Overflight)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Flight Rules</label>
              <select
                value={filingType}
                onChange={(e) => setFilingType(e.target.value as FilingType)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-500"
              >
                <option value="IFR">IFR (Instrument)</option>
                <option value="VFR">VFR (Visual)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Altitude</label>
              <input
                type="text"
                value={altitude}
                onChange={(e) => setAltitude(e.target.value)}
                placeholder="FL330"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900 focus:outline-none focus:border-emerald-500 uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Route Waypoints</label>
            <input
              type="text"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              placeholder="e.g. DNMM SID LUZON5 STAR MABAL"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900 focus:outline-none focus:border-emerald-500 uppercase"
              required
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setNewFlightPlanModalOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center space-x-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>File Plan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
