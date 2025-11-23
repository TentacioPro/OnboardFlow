import React, { useMemo, useState } from 'react';
import { useParams, Outlet, NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Sparkles, CheckSquare, ShieldAlert, History } from 'lucide-react';
import { useCases } from '../context/CaseContext';
import StatusBadge from '../components/StatusBadge';
import AuditModal from '../components/AuditModal';

const CaseDetailsLayout = () => {
    const { id } = useParams();
    const { getCase } = useCases();
    const navigate = useNavigate();
    const [isAuditOpen, setIsAuditOpen] = useState(false);

    const currentCase = getCase(id || '');

    const progress = useMemo(() => {
        if (!currentCase) return 0;
        const completed = currentCase.actions.filter((a) => a.completed).length;
        return Math.round((completed / currentCase.actions.length) * 100) || 0;
    }, [currentCase]);

    if (!currentCase) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-semibold text-slate-900">Case not found</h2>
                <button
                    onClick={() => navigate('/cases')}
                    className="mt-4 text-indigo-600 hover:underline"
                >
                    Return to case list
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            {/* Case Header */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => navigate('/cases')}
                        className="flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Cases
                    </button>
                    <button
                        onClick={() => setIsAuditOpen(true)}
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-md hover:bg-slate-50"
                    >
                        <History size={16} /> View Audit Log
                    </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <img
                                src={currentCase.avatarUrl}
                                alt={currentCase.candidateName}
                                className="w-16 h-16 rounded-full border-2 border-white shadow-sm"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                    {currentCase.candidateName}
                                    <StatusBadge status={currentCase.status} />
                                </h1>
                                <p className="text-slate-500 mt-1 flex items-center gap-2">
                                    {currentCase.role} • {currentCase.department} • Start: {currentCase.startDate}
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:w-64">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-slate-700">Onboarding Progress</span>
                                <span className="font-bold text-indigo-600">{progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 text-right">
                                {currentCase.actions.filter(a => a.completed).length}/{currentCase.actions.length} tasks completed
                            </p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-1 mt-8 border-b border-slate-100">
                        <NavLink
                            to="summary"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${isActive
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`
                            }
                        >
                            <Sparkles size={16} />
                            AI Summary
                        </NavLink>
                        <NavLink
                            to="documents"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${isActive
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`
                            }
                        >
                            <FileText size={16} />
                            Documents
                            <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full text-xs">
                                {currentCase.documents.length}
                            </span>
                        </NavLink>
                        <NavLink
                            to="gaps"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${isActive
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`
                            }
                        >
                            <ShieldAlert size={16} />
                            Gaps & Compliance
                        </NavLink>
                        <NavLink
                            to="actions"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${isActive
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`
                            }
                        >
                            <CheckSquare size={16} />
                            Actions
                            {currentCase.actions.filter(a => !a.completed).length > 0 && (
                                <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-xs">
                                    {currentCase.actions.filter(a => !a.completed).length}
                                </span>
                            )}
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Child Route Content */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                <Outlet context={{ currentCase }} />
            </div>

            <AuditModal
                isOpen={isAuditOpen}
                onClose={() => setIsAuditOpen(false)}
                logs={currentCase.auditLogs || []}
            />
        </div>
    );
};

export default CaseDetailsLayout;
