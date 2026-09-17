import React, { useState, useEffect } from 'react';
import { X, Wrench, CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';
import { useCommsStore, type EquipmentStatus } from '../../store/useCommsStore';

export const EquipmentDetailModal: React.FC = () => {
  const { equipment, selectedEquipmentId, setSelectedEquipmentId, updateEquipmentStatus } = useCommsStore();
  const item = equipment.find((e) => e.id === selectedEquipmentId);

  const [status, setStatus] = useState<EquipmentStatus>('SERVICEABLE');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (item) {
      setStatus(item.status);
      setNotes(item.notes || '');
    }
  }, [item]);

  if (!item || !selectedEquipmentId) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateEquipmentStatus(item.id, status, notes);
    setSelectedEquipmentId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-800/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 border border-emerald-200 rounded-lg">
              <Wrench className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">{item.name}</h3>
              <p className="text-xs text-slate-500 font-medium">Location: {item.location}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedEquipmentId(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Frequency</div>
              <div className="font-mono text-xs font-bold text-amber-600 mt-0.5">{item.frequency || 'N/A'}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Health Rating</div>
              <div className="font-mono text-xs font-bold text-emerald-700 mt-0.5">{item.healthScore}%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Last Inspection</div>
              <div className="text-[10px] font-bold text-slate-700 mt-0.5 truncate">{item.lastChecked}</div>
            </div>
          </div>

          {/* Status Selection Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Update Equipment Serviceability Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('SERVICEABLE')}
                className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 ${
                  status === 'SERVICEABLE'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-1 ring-emerald-300'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${status === 'SERVICEABLE' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>SERVICEABLE</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('NOT SERVICEABLE')}
                className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 ${
                  status === 'NOT SERVICEABLE'
                    ? 'bg-rose-50 border-rose-400 text-rose-800 ring-1 ring-rose-300'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <XCircle className={`w-4 h-4 ${status === 'NOT SERVICEABLE' ? 'text-rose-600' : 'text-slate-400'}`} />
                <span>NOT SERVICEABLE</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('UNDER MAINTENANCE')}
                className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 ${
                  status === 'UNDER MAINTENANCE'
                    ? 'bg-amber-50 border-amber-400 text-amber-800 ring-1 ring-amber-300'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <AlertTriangle className={`w-4 h-4 ${status === 'UNDER MAINTENANCE' ? 'text-amber-600' : 'text-slate-400'}`} />
                <span>MAINTENANCE</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Engineering Notes & Diagnostics</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter technical observations, RF signal calibration details..."
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 resize-none"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setSelectedEquipmentId(null)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center space-x-1.5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
