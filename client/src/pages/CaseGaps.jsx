import React, { useState } from 'react';
import { AlertOctagon, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import { MOCK_GAPS } from '../constants/gaps';

const CaseGaps = () => {
    const [gaps, setGaps] = useState(MOCK_GAPS);

    const onResolve = (id) => {
        setGaps(prev => prev.filter(g => g.id !== id));
    };

    const criticalGaps = gaps.filter(g => g.priority === 'High' && g.status === 'Open');

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                    <h3 className="text-base font-bold text-slate-800">Compliance Gap Analysis</h3>
                </div>
                <div className="flex gap-2">
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100">{gaps.length} Active Gaps</span>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">Severity: High</span>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {criticalGaps.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                        <div className="flex items-start gap-3">
                            <AlertOctagon className="w-5 h-5 text-red-600 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-red-800 uppercase tracking-wide">Critical Compliance Gaps Detected</h4>
                                <p className="text-sm text-red-700 mt-1">The following items must be resolved before onboarding can proceed.</p>
                            </div>
                        </div>
                    </div>
                )}

                {gaps.map((gap) => (
                    <div key={gap.id} className={`border rounded-lg overflow-hidden ${gap.priority === 'High' ? 'border-red-200 shadow-sm' : 'border-slate-200'}`}>
                        <div className={`px-4 py-2 border-b flex justify-between items-center ${gap.priority === 'High' ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${gap.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                    }`}>
                                    {gap.priority} Priority
                                </span>
                                <span className="font-semibold text-sm text-slate-800">{gap.title}</span>
                            </div>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Due: {gap.dueDate}
                            </span>
                        </div>
                        <div className="p-4 bg-white">
                            <div className="text-sm text-slate-600 mb-4">
                                <p className="font-medium text-slate-900 mb-1">Compliance Requirement:</p>
                                {gap.description}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border-t border-slate-100 pt-3">
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="text-slate-500">Assigned To:</span>
                                    <select className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-none focus:border-indigo-600">
                                        <option>{gap.assignedTo}</option>
                                        <option>Legal Dept</option>
                                        <option>Hiring Manager</option>
                                    </select>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button className="flex-1 sm:flex-none text-xs bg-white hover:bg-slate-50 text-slate-600 border border-slate-300 px-3 py-1.5 rounded transition-colors">
                                        Escalate
                                    </button>
                                    <button
                                        onClick={() => onResolve(gap.id)}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded transition-colors shadow-sm"
                                    >
                                        <CheckCircle2 className="w-3 h-3" />
                                        Mark Resolved
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {gaps.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                        <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-200 mb-3" />
                        <p>No active compliance gaps found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CaseGaps;
