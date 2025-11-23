import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Filter, ArrowUpDown } from 'lucide-react';
import { useCases } from '../context/CaseContext';
import StatusBadge from '../components/StatusBadge';

const CaseList = () => {
    const { cases, searchQuery } = useCases();
    const navigate = useNavigate();
    const [filterActionRequired, setFilterActionRequired] = useState(false);
    const [sortReadiness, setSortReadiness] = useState(null);

    const filteredCases = useMemo(() => {
        let result = cases;

        // Search Filter
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(
                (c) =>
                    c.candidateName.toLowerCase().includes(lowerQuery) ||
                    c.role.toLowerCase().includes(lowerQuery) ||
                    c.department.toLowerCase().includes(lowerQuery)
            );
        }

        // Action Required Filter
        if (filterActionRequired) {
            result = result.filter((c) => c.status === 'Action Required');
        }

        // Sorting
        if (sortReadiness) {
            result = [...result].sort((a, b) => {
                return sortReadiness === 'asc'
                    ? a.readinessScore - b.readinessScore
                    : b.readinessScore - a.readinessScore;
            });
        }

        return result;
    }, [cases, searchQuery, filterActionRequired, sortReadiness]);

    const toggleSort = () => {
        if (sortReadiness === null) setSortReadiness('desc');
        else if (sortReadiness === 'desc') setSortReadiness('asc');
        else setSortReadiness(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Active Onboarding Cases</h1>
                    <p className="text-slate-500 mt-1">Manage and track candidate progress.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setFilterActionRequired(!filterActionRequired)}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium transition-colors ${filterActionRequired
                                ? 'bg-red-50 border-red-200 text-red-700'
                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        <Filter size={16} />
                        Action Required
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors">
                        <ArrowUpRight size={16} />
                        New Case
                    </button>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="px-6 py-4">Candidate</th>
                                <th className="px-6 py-4">Role & Dept</th>
                                <th className="px-6 py-4">Start Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">
                                    <button
                                        onClick={toggleSort}
                                        className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                                    >
                                        Readiness
                                        <ArrowUpDown size={14} className={sortReadiness ? 'text-indigo-600' : ''} />
                                    </button>
                                </th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredCases.map((c) => (
                                <tr
                                    key={c.id}
                                    onClick={() => navigate(`/cases/${c.id}`)}
                                    className="hover:bg-slate-50 cursor-pointer transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={c.avatarUrl}
                                                alt=""
                                                className="w-10 h-10 rounded-full object-cover border border-slate-200"
                                            />
                                            <span className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                {c.candidateName}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-900">{c.role}</span>
                                            <span className="text-xs text-slate-500">{c.department}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{c.startDate}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={c.status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${c.readinessScore >= 90
                                                            ? 'bg-emerald-500'
                                                            : c.readinessScore >= 50
                                                                ? 'bg-blue-500'
                                                                : 'bg-amber-500'
                                                        }`}
                                                    style={{ width: `${c.readinessScore}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-medium text-slate-700">{c.readinessScore}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <ChevronRight size={20} className="text-slate-400 inline-block" />
                                    </td>
                                </tr>
                            ))}
                            {filteredCases.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        No cases found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CaseList;
