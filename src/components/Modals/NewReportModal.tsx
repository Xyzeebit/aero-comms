import React, { useState } from 'react';
import { X, FileText, Plus } from 'lucide-react';
import { useCommsStore, type ReportPriority } from '../../store/useCommsStore';

export const NewReportModal: React.FC = () => {
  const { isNewReportModalOpen, setNewReportModalOpen, addReport } = useCommsStore();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Radio Communication');
  const [priority, setPriority] = useState<ReportPriority>('MEDIUM');
  const [details, setDetails] = useState('');
  const [filedBy, setFiledBy] = useState('COMMS Officer Okon (NAMA)');

  if (!isNewReportModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addReport({ title, category, priority, details: details || 'Routine operational telecommunication report.', filedBy });

    setTitle('');
    setDetails('');
    setNewReportModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-800/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-100 border border-amber-200 rounded-lg">
              <FileText className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Create Operational Report</h3>
              <p className="text-xs text-slate-500 font-medium">Log equipment outage, comms failure, or daily summary</p>
            </div>
          </div>
          <button
            onClick={() => setNewReportModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Report Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Communication Report - VHF 118.7 Interference"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-500"
              >
                <option value="Radio Communication">Radio Communication</option>
                <option value="Equipment Status">Equipment Status</option>
                <option value="Shift Handover">Shift Handover</option>
                <option value="Emergency Incident">Emergency Incident</option>
                <option value="Radar Data Link">Radar Data Link</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ReportPriority)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-500"
              >
                <option value="HIGH">HIGH (Urgent Fault)</option>
                <option value="MEDIUM">MEDIUM (Maintenance)</option>
                <option value="LOW">LOW (Routine)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Reporting Officer / Engineer</label>
            <input
              type="text"
              value={filedBy}
              onChange={(e) => setFiledBy(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Findings & Observations</label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe the incident, affected frequencies or equipment, actions taken..."
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 resize-none"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setNewReportModalOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl shadow-sm flex items-center space-x-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
