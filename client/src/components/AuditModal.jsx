import React from 'react';
import { X, Download, Search } from 'lucide-react';

const AuditModal = ({ isOpen, onClose, logs }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-[80vh] flex flex-col">
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <div>
                        <h2 className="text-xl font-bold text-indigo-600 font-sans">System Audit Log</h2>
                        <p className="text-sm text-slate-500">Immutable record of all case activities</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-300 rounded transition-colors">
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-4 bg-slate-50 border-b border-slate-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by user, action, or field..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-0">
                    <table className="w-full text-left text-sm font-mono">
                        <thead className="bg-slate-100 text-slate-600 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 font-semibold border-b">Timestamp</th>
                                <th className="px-6 py-3 font-semibold border-b">User</th>
                                <th className="px-6 py-3 font-semibold border-b">Action</th>
                                <th className="px-6 py-3 font-semibold border-b">Field/Item</th>
                                <th className="px-6 py-3 font-semibold border-b">Change</th>
                                <th className="px-6 py-3 font-semibold border-b">Source</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-blue-50/50">
                                    <td className="px-6 py-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                                    <td className="px-6 py-3 font-medium text-slate-700">{log.user}</td>
                                    <td className="px-6 py-3 text-indigo-600">{log.action}</td>
                                    <td className="px-6 py-3 text-slate-600">{log.field}</td>
                                    <td className="px-6 py-3 text-xs">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-red-700 line-through opacity-70">{log.oldValue}</span>
                                            <span className="text-emerald-700 font-semibold">{log.newValue}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-slate-500">{log.source}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-400 text-center">
                    Log Integrity ID: #SHA-256-88a92-valid
                </div>
            </div>
        </div>
    );
};

export default AuditModal;
