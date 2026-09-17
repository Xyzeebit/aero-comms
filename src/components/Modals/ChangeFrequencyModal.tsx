import React, { useState } from 'react';
import { X, SlidersHorizontal, Radio, Check } from 'lucide-react';
import { useCommsStore } from '../../store/useCommsStore';

export const ChangeFrequencyModal: React.FC = () => {
  const { frequencies, setFrequency, isChangeFreqModalOpen, setChangeFreqModalOpen } = useCommsStore();
  const [rx, setRx] = useState(frequencies.twrRx);
  const [tx, setTx] = useState(frequencies.twrTx);
  const [app, setApp] = useState(frequencies.appRx);
  const [gnd, setGnd] = useState(frequencies.gndRx);

  if (!isChangeFreqModalOpen) return null;

  const presets = [
    { label: 'Tower Main (118.700)', rx: '118.700', tx: '118.100' },
    { label: 'Approach Control (124.700)', rx: '124.700', tx: '124.700' },
    { label: 'Ground Control (121.900)', rx: '121.900', tx: '121.900' },
    { label: 'Emergency Guard (121.500)', rx: '121.500', tx: '121.500' },
    { label: 'ATIS Broadcast (127.400)', rx: '127.400', tx: '127.400' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFrequency('twrRx', rx);
    setFrequency('twrTx', tx);
    setFrequency('appRx', app);
    setFrequency('gndRx', gnd);
    setChangeFreqModalOpen(false);
  };

  const applyPreset = (presetRx: string, presetTx: string) => {
    setRx(presetRx);
    setTx(presetTx);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 border border-emerald-200 rounded-lg text-emerald-800">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Change Operational Frequencies</h3>
              <p className="text-xs font-semibold text-slate-500">Tune VHF/HF radio channels for TWR, GND & APP</p>
            </div>
          </div>
          <button 
            onClick={() => setChangeFreqModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Aviation Band Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyPreset(p.rx, p.tx)}
                  className="px-3 py-2 bg-slate-50 hover:bg-emerald-50 text-left rounded-lg border border-slate-200 hover:border-emerald-300 transition-all text-xs font-semibold text-slate-800 flex items-center justify-between"
                >
                  <span className="truncate">{p.label}</span>
                  <Radio className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* TWR RX */}
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-1">
                TWR FREQ (RX) [MHz]
              </label>
              <input
                type="text"
                value={rx}
                onChange={(e) => setRx(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                placeholder="118.700"
                required
              />
            </div>

            {/* TWR TX */}
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-1">
                TWR FREQ (TX) [MHz]
              </label>
              <input
                type="text"
                value={tx}
                onChange={(e) => setTx(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
                placeholder="118.100"
                required
              />
            </div>

            {/* APP RX */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                APPROACH FREQ [MHz]
              </label>
              <input
                type="text"
                value={app}
                onChange={(e) => setApp(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-500"
                placeholder="124.700"
              />
            </div>

            {/* GND RX */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                GROUND FREQ [MHz]
              </label>
              <input
                type="text"
                value={gnd}
                onChange={(e) => setGnd(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-500"
                placeholder="121.900"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setChangeFreqModalOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Apply Frequencies</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
