import React, { useState } from 'react';
import { FileText, Plus, Download, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useCommsStore } from '../store/useCommsStore';

export const ReportsView: React.FC = () => {
  const { reports, setNewReportModalOpen, resolveReport } = useCommsStore();
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filteredReports = reports.filter((rep) => {
    return priorityFilter === 'ALL' || rep.priority === priorityFilter;
  });

  const handleExportCSV = () => {
    const csvRows = [
      ['ID', 'Title', 'Timestamp', 'Priority', 'Category', 'Status', 'Filed By', 'Details'],
      ...reports.map((r) => [
        r.id,
        `"${r.title}"`,
        `"${r.timestamp}"`,
        r.priority,
        `"${r.category}"`,
        r.status,
        `"${r.filedBy}"`,
        `"${r.details.replace(/"/g, '""')}"`
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NAMA_COMMS_Report_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Operational Telecommunication Reports</h2>
            <p className="text-xs text-slate-500 font-medium">NAMA Official Logbook, Incident Reports & Shift Verification</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-emerald-500 font-semibold"
          >
            <option value="ALL">All Priorities</option>
            <option value="HIGH">HIGH Priority</option>
            <option value="MEDIUM">MEDIUM Priority</option>
            <option value="LOW">LOW Priority</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-all flex items-center space-x-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setNewReportModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Report</span>
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReports.map((rep) => (
          <div
            key={rep.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 space-y-4 shadow-2xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">{rep.category}</span>
                  <h3 className="font-extrabold text-base text-slate-900 mt-0.5">{rep.title}</h3>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                  rep.priority === 'HIGH'
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : rep.priority === 'MEDIUM'
                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                    : 'bg-sky-100 text-sky-700 border border-sky-200'
                }`}>
                  {rep.priority}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-xs text-slate-500">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{rep.timestamp}</span>
                </span>
                <span className="text-slate-700 font-semibold">{rep.filedBy}</span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                {rep.details}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-xs font-bold flex items-center space-x-1.5 ${
                rep.status === 'RESOLVED' ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {rep.status === 'RESOLVED' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>RESOLVED</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>PENDING REVIEW</span>
                  </>
                )}
              </span>

              {rep.status !== 'RESOLVED' && (
                <button
                  onClick={() => resolveReport(rep.id)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all shadow-2xs"
                >
                  Mark Resolved
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
