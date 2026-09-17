import React from 'react';
import {
  LayoutDashboard,
  Radio,
  Plane,
  Activity,
  Wrench,
  FileText,
  RadioTower,
  SlidersHorizontal,
  Wifi,
  ChevronRight
} from 'lucide-react';
import { useCommsStore, type ActiveTab } from '../store/useCommsStore';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, frequencies, setChangeFreqModalOpen } = useCommsStore();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard',      label: 'Dashboard',           icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'communications', label: 'Communications',      icon: <Radio className="w-5 h-5" /> },
    { id: 'flight-plans',   label: 'Flight Plans',        icon: <Plane className="w-5 h-5" /> },
    { id: 'events',         label: 'Air Traffic Events',  icon: <Activity className="w-5 h-5" /> },
    { id: 'equipment',      label: 'Equipment',           icon: <Wrench className="w-5 h-5" /> },
    { id: 'reports',        label: 'Reports',             icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <aside
      className="w-64 shrink-0 flex flex-col h-full select-none z-20"
      style={{ background: '#1a1e26', borderRight: '1px solid #2a2f3d' }}
    >
      {/* ── Branding Header ──────────────────────────────────── */}
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ background: '#13161d', borderBottom: '1px solid #2a2f3d' }}
      >
        <div
          className="relative p-2.5 rounded-xl"
          style={{ background: '#f59e0b' }}
        >
          <RadioTower className="w-6 h-6 text-gray-950" />
          {/* Live pulse dot */}
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#f59e0b' }}></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: '#fbbf24' }}></span>
          </span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-extrabold text-base tracking-widest text-white leading-none">AERO COMMS</h1>
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded leading-none"
              style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}
            >
              NAMA
            </span>
          </div>
          <p className="text-[10px] font-medium mt-0.5 uppercase tracking-tight leading-none" style={{ color: '#8b93a8' }}>
            Aeronautical Telecomms Service
          </p>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────────────── */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[9px] font-bold uppercase tracking-widest" style={{ color: '#4b5268' }}>
          Main Navigation
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 group"
              style={
                isActive
                  ? {
                      background: 'rgba(245,158,11,0.1)',
                      color: '#fbbf24',
                      borderLeft: '3px solid #f59e0b',
                      paddingLeft: '9px', // compensate for border
                    }
                  : {
                      color: '#a0a8bc',
                      borderLeft: '3px solid transparent',
                      paddingLeft: '9px',
                    }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#d1d5e0';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = '#a0a8bc';
                }
              }}
            >
              <div className="flex items-center gap-3">
                <span style={{ color: isActive ? '#f59e0b' : '#6b7280' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#f59e0b' }}></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Frequency Widget ─────────────────────────────────── */}
      <div
        className="mx-3 mb-3 rounded-xl p-4"
        style={{ background: '#13161d', border: '1px solid #2a2f3d' }}
      >
        {/* Widget Header */}
        <div className="flex items-center justify-between pb-2.5 mb-3" style={{ borderBottom: '1px solid #2a2f3d' }}>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 animate-pulse" style={{ color: '#6ee7b7' }} />
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#a0a8bc' }}>
              Tower Frequencies
            </span>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#34d399' }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#10b981' }}></span>
          </span>
        </div>

        {/* TWR RX */}
        <div className="rounded-lg p-2.5 mb-2" style={{ background: '#1a1e26', border: '1px solid #2a2f3d' }}>
          <div className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#6b7280' }}>TWR FREQ (RX)</div>
          <div className="flex items-center justify-between">
            <div className="font-mono text-base font-bold tracking-wide" style={{ color: '#fbbf24' }}>
              {frequencies.twrRx}
              <span className="text-xs font-normal ml-1" style={{ color: '#6b7280' }}>MHz</span>
            </div>
            {/* Signal bars */}
            <div className="flex items-end gap-px h-4">
              <span className="w-1 h-1.5 rounded-sm" style={{ background: '#10b981' }}></span>
              <span className="w-1 h-2.5 rounded-sm" style={{ background: '#10b981' }}></span>
              <span className="w-1 h-3.5 rounded-sm" style={{ background: '#10b981' }}></span>
              <span className="w-1 h-4 rounded-sm animate-pulse" style={{ background: '#f59e0b' }}></span>
            </div>
          </div>
        </div>

        {/* TWR TX */}
        <div className="rounded-lg p-2.5 mb-3" style={{ background: '#1a1e26', border: '1px solid #2a2f3d' }}>
          <div className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#6b7280' }}>TWR FREQ (TX)</div>
          <div className="flex items-center justify-between">
            <div className="font-mono text-base font-bold tracking-wide" style={{ color: '#e2e8f0' }}>
              {frequencies.twrTx}
              <span className="text-xs font-normal ml-1" style={{ color: '#6b7280' }}>MHz</span>
            </div>
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded"
              style={{ background: '#1f2937', color: '#10b981', border: '1px solid #374151' }}
            >
              ACTIVE
            </span>
          </div>
        </div>

        {/* Change Frequency Button */}
        <button
          onClick={() => setChangeFreqModalOpen(true)}
          className="w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
          style={{ background: '#f59e0b', color: '#111827' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#fbbf24')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#f59e0b')}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Change Frequency</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <div
        className="px-4 py-2.5 text-center text-[9px]"
        style={{ borderTop: '1px solid #2a2f3d', color: '#4b5268' }}
      >
        © 2026 NAMA Aeronautical Telecommunications
      </div>
    </aside>
  );
};
