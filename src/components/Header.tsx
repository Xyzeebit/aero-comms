import React, { useState, useEffect } from 'react';
import { Clock, User, ShieldAlert, Radio, CheckCircle2, AlertTriangle, ChevronDown } from 'lucide-react';
import { useCommsStore } from '../store/useCommsStore';

export const Header: React.FC = () => {
  const { activeTab, triggerEmergencyAlert, equipment } = useCommsStore();
  const [utcTime, setUtcTime] = useState<string>('');
  const [utcDate, setUtcDate] = useState<string>('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${h}:${m}:${s} UTC`);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      setUtcDate(`${now.getUTCDate()} ${months[now.getUTCMonth()]} ${now.getUTCFullYear()}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const nonServiceableCount = equipment.filter(e => e.status === 'NOT SERVICEABLE').length;
  const serviceableCount = equipment.filter(e => e.status === 'SERVICEABLE').length;

  const tabTitles: Record<string, { title: string; subtitle: string }> = {
    'dashboard':      { title: 'Dashboard', subtitle: 'AERONAUTICAL TELECOMMUNICATIONS SERVICE' },
    'communications': { title: 'Communications & Frequency Management', subtitle: 'TOWER VHF & HF CHANNELS MONITORING' },
    'flight-plans':   { title: 'Flight Plans & Routes Registry', subtitle: 'TOWER AIR TRAFFIC MOVEMENTS & FILINGS' },
    'events':         { title: 'Air Traffic Events – Live Operational Log', subtitle: 'REAL-TIME COMMS & HANDOVER INCIDENTS' },
    'equipment':      { title: 'Telecommunications Equipment Registry', subtitle: 'HARDWARE SERVICEABILITY & CALIBRATION STATUS' },
    'reports':        { title: 'Operational Reports & Shift Handover Logs', subtitle: 'INCIDENT LOGBOOK & COMPLIANCE RECORDS' },
  };

  const currentTabInfo = tabTitles[activeTab] || tabTitles['dashboard'];

  const handleSimulateEmergency = () => {
    const callsign = prompt('Enter Aircraft Call Sign declaring Emergency:', 'NGA911');
    if (callsign) {
      triggerEmergencyAlert(callsign.toUpperCase(), 'TWR', 'Declared low fuel emergency on 118.700 MHz. Requested priority vector RWY 24.');
      alert(`Emergency alert dispatched for ${callsign.toUpperCase()}! Check live log & reports.`);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-5 flex items-center justify-between shrink-0 z-10 shadow-xs">
      {/* Left: Page Title */}
      <div>
        <h2 className="text-base font-extrabold text-slate-900 leading-tight">{currentTabInfo.title}</h2>
        <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{currentTabInfo.subtitle}</p>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* System Status */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200 text-xs font-semibold text-slate-600">
          <span>Status:</span>
          {nonServiceableCount === 0 ? (
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Serviceable ({serviceableCount}/{equipment.length})</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-700 font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{nonServiceableCount} Unserviceable</span>
            </span>
          )}
        </div>

        {/* Emergency Button */}
        <button
          onClick={handleSimulateEmergency}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold transition-all"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Emergency</span>
        </button>

        {/* UTC Clock */}
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <div className="p-1 bg-emerald-100 rounded text-emerald-700">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-mono text-xs font-extrabold text-slate-900 tracking-wider leading-none">
              {utcTime || '14:32:15 UTC'}
            </div>
            <div className="text-[9px] font-semibold text-slate-500 leading-tight">
              {utcDate || '21 May 2024'}
            </div>
          </div>
        </div>

        {/* Operator Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 py-1.5 px-3 rounded-xl border border-slate-200 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-none flex items-center gap-1">
                COMMS OPS <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-[10px] font-semibold text-sky-700 mt-0.5">Tower Operator</div>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                <div className="text-xs font-bold text-slate-900">Console Shift #2</div>
                <div className="text-[10px] text-slate-500">Watch Supervisor: Adebayo</div>
                <div className="text-[10px] text-emerald-700 font-mono mt-0.5">TWR-CONSOLE-01</div>
              </div>
              <div className="py-1 text-xs text-slate-700">
                <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Radio Console Settings</span>
                </div>
                <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Shift Handover</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
