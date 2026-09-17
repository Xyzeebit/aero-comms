import React, { useState } from 'react';
import { 
  Radio, 
  Wifi, 
  Volume2, 
  Mic, 
  SlidersHorizontal, 
  Play, 
  Zap
} from 'lucide-react';
import { useCommsStore } from '../store/useCommsStore';

export const CommunicationsView: React.FC = () => {
  const { frequencies, setChangeFreqModalOpen } = useCommsStore();
  const [squelch, setSquelch] = useState<number>(4);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [atisMessage, setAtisMessage] = useState<string>(
    'Lagos Tower Information Alpha. Time 1430 UTC. Wind 240 degrees 12 knots. Visibility 10km. Temperature 28, Dew point 22. QNH 1013 hPa. Expect ILS Runway 24 approach. Advise controller on initial contact you have Information Alpha.'
  );
  const [isAtisBroadcasting, setIsAtisBroadcasting] = useState<boolean>(true);

  const channels = [
    { name: 'VHF Tower Main (RX)', freq: frequencies.twrRx, status: 'Active', power: '50W RF', signal: '100%' },
    { name: 'VHF Tower Backup (TX)', freq: frequencies.twrTx, status: 'Active', power: '50W RF', signal: '98%' },
    { name: 'VHF Approach Control', freq: frequencies.appRx, status: 'Active', power: '100W RF', signal: '95%' },
    { name: 'VHF Ground Control', freq: frequencies.gndRx, status: 'Active', power: '25W RF', signal: '99%' },
    { name: 'VHF Guard / Emergency', freq: frequencies.emerg, status: 'Monitoring', power: '100W RF', signal: '100%' },
    { name: 'ATIS Broadcast Feed', freq: frequencies.atis, status: 'Broadcasting', power: '25W RF', signal: '90%' },
    { name: 'HF Ocean Route North', freq: '8.879 MHz', status: 'Active', power: '400W Peak', signal: '88%' },
    { name: 'HF Ocean Route South', freq: '5.649 MHz', status: 'Standby', power: '400W Peak', signal: '82%' },
  ];

  const handlePttClick = () => {
    setIsTransmitting(true);
    setTimeout(() => setIsTransmitting(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700">
            <Radio className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">VHF & HF Communications Console</h2>
            <p className="text-xs text-slate-500 font-medium">NAMA Aeronautical Frequency Monitoring & Voice Communications System (VCS)</p>
          </div>
        </div>
        <button
          onClick={() => setChangeFreqModalOpen(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center space-x-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Tune Channels</span>
        </button>
      </div>

      {/* Grid: Channels Matrix & Interactive Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Span): Active Channel Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <h3 className="font-extrabold text-base text-slate-900 mb-4 flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-emerald-600" />
              <span>Aeronautical Channel Status Matrix</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {channels.map((ch, i) => (
                <div key={i} className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{ch.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {ch.status}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-lg font-extrabold text-slate-900 tracking-wider">
                      {ch.freq} <span className="text-xs text-slate-500 font-normal">MHz</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{ch.power}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                    <span>Signal Strength: <strong className="text-emerald-700">{ch.signal}</strong></span>
                    <span className="flex space-x-0.5 items-end h-3">
                      <span className="w-0.5 h-1.5 bg-emerald-500 rounded-sm"></span>
                      <span className="w-0.5 h-2 bg-emerald-500 rounded-sm"></span>
                      <span className="w-0.5 h-2.5 bg-emerald-500 rounded-sm"></span>
                      <span className="w-0.5 h-3 bg-emerald-500 rounded-sm"></span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Span): Push-To-Talk Simulator & ATIS Generator */}
        <div className="space-y-6">
          {/* PTT Voice Check Tester */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <h3 className="font-extrabold text-base text-slate-900 mb-3 flex items-center space-x-2">
              <Mic className="w-4 h-4 text-emerald-600" />
              <span>Tower PTT Communications Tester</span>
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Selected Transmitter</div>
                <div className="font-mono text-sm font-bold text-slate-900">TWR TX {frequencies.twrTx} MHz</div>

                <button
                  onClick={handlePttClick}
                  className={`w-full py-4 rounded-xl font-extrabold text-sm tracking-wider shadow-md transition-all flex items-center justify-center space-x-2 ${
                    isTransmitting
                      ? 'bg-rose-600 text-white animate-pulse shadow-[0_0_20px_#f43f5e]'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Zap className="w-5 h-5" />
                  <span>{isTransmitting ? 'TRANSMITTING (PTT ACTIVE)...' : 'PUSH TO TALK (TEST)'}</span>
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Receiver Squelch Threshold</span>
                  <span className="text-emerald-700 font-mono">Level {squelch} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={squelch}
                  onChange={(e) => setSquelch(Number(e.target.value))}
                  className="w-full accent-emerald-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* ATIS Voice Broadcast */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>ATIS Voice Broadcast (127.400)</span>
              </h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                isAtisBroadcasting ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-500'
              }`}>
                {isAtisBroadcasting ? 'BROADCASTING' : 'OFFLINE'}
              </span>
            </div>

            <div className="space-y-3">
              <textarea
                rows={4}
                value={atisMessage}
                onChange={(e) => setAtisMessage(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:border-emerald-500 focus:outline-none"
              ></textarea>

              <div className="flex space-x-2">
                <button
                  onClick={() => setIsAtisBroadcasting(!isAtisBroadcasting)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                    isAtisBroadcasting ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-600 text-white'
                  }`}
                >
                  {isAtisBroadcasting ? 'Stop Broadcast' : 'Start Broadcast'}
                </button>
                <button
                  onClick={() => alert('Synthesizing speech broadcast on 127.400 MHz...')}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200"
                >
                  <Play className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
