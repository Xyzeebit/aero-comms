import React, { useState } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Search, 
  Radio
} from 'lucide-react';
import { useCommsStore, type EquipmentStatus } from '../store/useCommsStore';

export const EquipmentView: React.FC = () => {
  const { equipment, toggleEquipmentStatus, setSelectedEquipmentId } = useCommsStore();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipment = equipment.filter((item) => {
    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const serviceableCount = equipment.filter(e => e.status === 'SERVICEABLE').length;
  const nonServiceableCount = equipment.filter(e => e.status === 'NOT SERVICEABLE').length;
  const maintenanceCount = equipment.filter(e => e.status === 'UNDER MAINTENANCE').length;

  const renderStatusBadge = (status: EquipmentStatus) => {
    if (status === 'SERVICEABLE') {
      return (
        <span className="flex items-center space-x-1.5 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>SERVICEABLE</span>
        </span>
      );
    }
    if (status === 'NOT SERVICEABLE') {
      return (
        <span className="flex items-center space-x-1.5 text-xs font-extrabold text-rose-700 bg-rose-50 px-3 py-1 rounded-lg border border-rose-200">
          <XCircle className="w-3.5 h-3.5 text-rose-600" />
          <span>NOT SERVICEABLE</span>
        </span>
      );
    }
    return (
      <span className="flex items-center space-x-1.5 text-xs font-extrabold text-amber-700 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
        <span>UNDER MAINTENANCE</span>
      </span>
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Serviceable */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">Serviceable Equipment</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{serviceableCount}</div>
            <div className="text-xs text-slate-500 mt-1">Operational & Ready for Tower Comms</div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-600">
            <CheckCircle2 className="w-7 h-7" />
          </div>
        </div>

        {/* Not Serviceable */}
        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-xs font-extrabold text-rose-700 uppercase tracking-wider">Not Serviceable</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{nonServiceableCount}</div>
            <div className="text-xs text-slate-500 mt-1">Faults flagged / Techs dispatched</div>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-600">
            <XCircle className="w-7 h-7" />
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">Under Maintenance</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{maintenanceCount}</div>
            <div className="text-xs text-slate-500 mt-1">Routine overhaul / Calibration</div>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-600">
            <AlertTriangle className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Telecommunication Equipment Registry</h2>
            <p className="text-xs text-slate-500">NAMA Tower transmitters, receivers, recorders, terminals & backup power</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search equipment or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-emerald-500 font-semibold"
          >
            <option value="ALL">All Statuses</option>
            <option value="SERVICEABLE">SERVICEABLE</option>
            <option value="NOT SERVICEABLE">NOT SERVICEABLE</option>
            <option value="UNDER MAINTENANCE">UNDER MAINTENANCE</option>
          </select>
        </div>
      </div>

      {/* Equipment Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedEquipmentId(item.id)}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-emerald-400 transition-all hover:scale-[1.01] cursor-pointer space-y-4 shadow-2xs group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-emerald-600 group-hover:border-emerald-400">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {item.name}
                  </h3>
                  <div className="text-[10px] text-slate-500 font-semibold">{item.location}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="text-xs font-mono font-bold text-amber-600">
                {item.frequency || 'N/A'}
              </div>
              <div>{renderStatusBadge(item.status)}</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Engineering Notes</div>
              <div className="text-slate-700 line-clamp-2">{item.notes || 'No recent operational notes logged.'}</div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Last Check: <strong className="text-slate-700">{item.lastChecked}</strong></span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEquipmentStatus(item.id);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 rounded-lg border border-slate-200 text-[10px] font-bold transition-all shadow-2xs"
              >
                Toggle Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
