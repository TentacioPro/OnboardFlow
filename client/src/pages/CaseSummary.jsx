import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Check, X, AlertCircle, Edit2, Sparkles } from 'lucide-react';
import { useCases } from '../context/CaseContext';

const CaseSummary = () => {
    const { currentCase } = useOutletContext();
    const { updateSummaryStatus } = useCases();
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const handleReject = (id, currentValue) => {
        setEditingId(id);
        setEditValue(currentValue);
    };

    const submitRejection = (id) => {
        updateSummaryStatus(currentCase.id, id, 'rejected', editValue);
        setEditingId(null);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="bg-indigo-100 p-2 rounded-full text-indigo-600">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-indigo-900">AI Analysis</h3>
                            <p className="text-sm text-indigo-700/80">
                                Data extracted from uploaded documents. Please review and verify.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {currentCase.summary.map((item) => (
                            <div
                                key={item.id}
                                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-md border transition-all ${item.status === 'pending'
                                        ? 'bg-white border-slate-200'
                                        : item.status === 'accepted'
                                            ? 'bg-green-50 border-green-200'
                                            : 'bg-red-50 border-red-200'
                                    }`}
                            >
                                <div className="mb-3 sm:mb-0">
                                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                                        {item.field}
                                    </span>
                                    {editingId === item.id ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="px-2 py-1 text-sm border border-slate-300 rounded focus:border-indigo-500 focus:outline-none"
                                            />
                                            <button
                                                onClick={() => submitRejection(item.id)}
                                                className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={`text-base font-medium ${item.status === 'accepted' ? 'text-green-800' :
                                                item.status === 'rejected' ? 'text-red-800 line-through decoration-red-400' : 'text-slate-900'
                                            }`}>
                                            {item.value}
                                            {item.status === 'rejected' && (
                                                <span className="ml-2 text-sm text-red-600 no-underline font-normal italic">
                                                    (Revised: {item.value})
                                                </span>
                                            )}
                                        </span>
                                    )}
                                </div>

                                {item.status === 'pending' && !editingId && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateSummaryStatus(currentCase.id, item.id, 'accepted')}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded text-sm font-medium transition-colors"
                                        >
                                            <Check size={14} /> Accept
                                        </button>
                                        <button
                                            onClick={() => handleReject(item.id, item.value)}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded text-sm font-medium transition-colors"
                                        >
                                            <X size={14} /> Reject
                                        </button>
                                    </div>
                                )}

                                {item.status !== 'pending' && !editingId && (
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        {item.status === 'accepted' ? (
                                            <span className="flex items-center gap-1 text-green-600">
                                                <Check size={16} /> Verified
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-red-600">
                                                <Edit2 size={16} /> Manually Edited
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm sticky top-6">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                        Confidence Score
                    </h4>
                    <div className="flex items-center justify-center py-6 relative">
                        <svg className="w-32 h-32 transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-slate-100"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={351.86}
                                strokeDashoffset={351.86 - (351.86 * 92) / 100}
                                className="text-indigo-600"
                            />
                        </svg>
                        <span className="absolute text-2xl font-bold text-slate-800">92%</span>
                    </div>
                    <p className="text-sm text-center text-slate-500 mb-6">
                        The AI is highly confident in the data extracted from the Offer Letter.
                    </p>

                    <div className="bg-amber-50 border border-amber-200 rounded p-3 flex items-start gap-3">
                        <AlertCircle size={18} className="text-amber-600 mt-0.5" />
                        <div className="text-xs text-amber-800">
                            <span className="font-semibold">Missing Context:</span> Visa expiry date was not found in the provided documents. Please request an upload.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseSummary;
