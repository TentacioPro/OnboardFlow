import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { CheckSquare, Square, Clock } from 'lucide-react';
import { useCases } from '../context/CaseContext';

const CaseActions = () => {
    const { currentCase } = useOutletContext();
    const { toggleAction } = useCases();

    return (
        <div className="max-w-4xl pb-6">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Onboarding Checklist</h2>
                <p className="text-sm text-slate-500">Tasks generated based on role '{currentCase.role}'.</p>
            </div>

            <div className="space-y-3">
                {currentCase.actions.map((action) => (
                    <div
                        key={action.id}
                        onClick={() => toggleAction(currentCase.id, action.id)}
                        className={`group flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${action.completed
                                ? 'bg-slate-50 border-slate-200 opacity-75'
                                : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
                            }`}
                    >
                        <div
                            className={`flex-shrink-0 mr-4 transition-colors ${action.completed ? 'text-indigo-600' : 'text-slate-300 group-hover:text-indigo-400'
                                }`}
                        >
                            {action.completed ? <CheckSquare size={24} /> : <Square size={24} />}
                        </div>

                        <div className="flex-1">
                            <p
                                className={`text-sm font-medium transition-all ${action.completed ? 'text-slate-500 line-through' : 'text-slate-900'
                                    }`}
                            >
                                {action.text}
                            </p>
                        </div>

                        {action.completed && (
                            <div className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                                Completed
                            </div>
                        )}

                        {!action.completed && (
                            <div className="flex items-center gap-1 text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded">
                                <Clock size={12} /> Pending
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {currentCase.actions.length === 0 && (
                <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
                    <p className="text-slate-500">No actions generated for this case.</p>
                </div>
            )}
        </div>
    );
};

export default CaseActions;
