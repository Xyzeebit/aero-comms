import React, { useState } from 'react';
import { X, Activity, Plus } from 'lucide-react';
import { useCommsStore, type EventType } from '../../store/useCommsStore';

export const NewEventModal: React.FC = () => {
  const { isNewEventModalOpen, setNewEventModalOpen, addTrafficEvent } = useCommsStore();
  const [station, setStation] = useState<'TWR' | 'GND' | 'APP' | 'ACC' | 'EMG'>('TWR');
  const [callSign, setCallSign] = useState('');
  const [originDest, setOriginDest] = useState('');
  const [eventType, setEventType] = useState<EventType>('DEPARTURE');
  const [details, setDetails] = useState('');

  if (!isNewEventModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callSign.trim()) return;

    addTrafficEvent({
      station,
      callSign: callSign.toUpperCase(),
      originDest: originDest.toUpperCase() || 'DNMM',
      eventType,
      details: details || 'Routine air traffic communication log.'
    });

    setCallSign('');
    setOriginDest('');
    setDetails('');
    setNewEventModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-800/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 border border-emerald-200 rounded-lg">
              <Activity className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Log Air Traffic Event</h3>
              <p className="text-xs text-slate-500 font-medium">Record live movement or radio clearance event</p>
            </div>
          </div>
          <button
            onClick={() => setNewEventModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Control Station</label>
              <select
                value={station}
                onChange={(e) => setStation(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-500"
              >
                <option value="TWR">TWR (Tower)</option>
                <option value="GND">GND (Ground)</option>
                <option value="APP">APP (Approach)</option>
                <option value="ACC">ACC (Area Control)</option>
                <option value="EMG">EMG (Emergency)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Event Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value as EventType)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-500"
              >
                <option value="DEPARTURE">DEPARTURE</option>
                <option value="ARRIVAL">ARRIVAL</option>
                <option value="GROUND">GROUND</option>
                <option value="OVERFLIGHT">OVERFLIGHT</option>
                <option value="HANDOVER">HANDOVER</option>
                <option value="COMM_CHECK">COMM_CHECK</option>
                <option value="EMERGENCY">EMERGENCY</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Aircraft Call Sign</label>
              <input
                type="text"
                value={callSign}
                onChange={(e) => setCallSign(e.target.value)}
                placeholder="e.g. NGA901"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-500 uppercase"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Origin / Destination</label>
              <input
                type="text"
                value={originDest}
                onChange={(e) => setOriginDest(e.target.value)}
                placeholder="e.g. DNMM / DNAA"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-900 focus:outline-none focus:border-emerald-500 uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Event Details & Clearances</label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="e.g. Cleared for takeoff RWY 24. Contact Lagos Approach 124.700."
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 resize-none"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setNewEventModalOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center space-x-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Log Event</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
