import React, { useState } from 'react';
import {
    CheckCircle, AlertTriangle, XCircle, ChevronDown,
    Edit3, Eye, Copy, CheckSquare, Square, ExternalLink
} from 'lucide-react';

const ExtractionPanel = ({
    data,
    checklist,
    compliance,
    tasks,
    activeFieldId,
    onFieldHover,
    onFieldSelect,
    onUpdateValue,
    onVerify
}) => {
    const [activeSection, setActiveSection] = useState('summary');
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const summaryData = data.filter(d => d.section === 'summary');

    const handleEditStart = (item) => {
        setEditingId(item.id);
        setEditValue(item.value);
        onFieldSelect(item.id);
    };

    const handleSave = (id) => {
        onUpdateValue(id, editValue);
        setEditingId(null);
    };

    const getConfidenceColor = (level) => {
        switch (level) {
            case 'high': return 'bg-green-100 text-green-700';
            case 'medium': return 'bg-yellow-100 text-yellow-700';
            case 'low': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const getConfidenceIcon = (level) => {
        switch (level) {
            case 'high': return <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />;
            case 'medium': return <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" />;
            case 'low': return <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />;
            default: return <XCircle className="w-3 h-3 text-red-400 mr-2" />;
        }
    };

    const scrollToSection = (id) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="h-full bg-white flex flex-col">
            {/* Header */}
            <div className="h-12 border-b border-slate-200 flex items-center justify-between px-6 bg-white shrink-0 z-10">
                <h2 className="font-semibold text-slate-800">Extracted Data</h2>
                <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
                    {['Summary', 'Access', 'Gaps', 'Message'].map(s => (
                        <button
                            key={s}
                            onClick={() => scrollToSection(s.toLowerCase())}
                            className={`px-3 py-1 rounded-md transition-all ${activeSection === s.toLowerCase() ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scroll p-6 space-y-8 bg-slate-50/50">

                {/* SUMMARY SECTION */}
                <section id="summary" className="space-y-4 scroll-mt-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
                            <ChevronDown className="w-4 h-4 mr-2" /> Employment Summary
                        </h3>
                        <button className="text-slate-400 hover:text-slate-600"><Copy className="w-4 h-4" /></button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {summaryData.map(item => (
                            <div
                                key={item.id}
                                onMouseEnter={() => onFieldHover(item.id)}
                                onMouseLeave={() => onFieldHover(null)}
                                className={`bg-white rounded-lg border transition-all duration-200 p-4 shadow-sm relative group ${activeFieldId === item.id ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-indigo-100' : 'border-slate-200 hover:border-indigo-300'}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">{item.label}</label>
                                    <div className={`flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${getConfidenceColor(item.level)}`}>
                                        {getConfidenceIcon(item.level)}
                                        {item.confidence > 0 ? `${item.confidence}%` : 'MISSING'}
                                    </div>
                                </div>

                                {editingId === item.id ? (
                                    <div className="mt-1">
                                        <input
                                            autoFocus
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            className="w-full text-sm font-medium border border-indigo-300 rounded p-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-200 mb-2"
                                        />
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleSave(item.id)} className="flex-1 bg-indigo-600 text-white text-xs py-1 rounded hover:bg-indigo-700">Save</button>
                                            <button onClick={() => setEditingId(null)} className="flex-1 bg-slate-100 text-slate-600 text-xs py-1 rounded hover:bg-slate-200">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className={`text-base font-medium mb-3 truncate ${item.value ? 'text-slate-900' : 'text-red-500 italic'}`}>
                                            {item.value || 'Not found'}
                                        </div>

                                        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="text-[10px] text-slate-400">
                                                {item.source ? `Page ${item.source.page}` : 'No source'}
                                            </div>
                                            <div className="flex space-x-1">
                                                <button
                                                    onClick={() => onFieldSelect(item.id)}
                                                    className="p-1 hover:bg-indigo-50 text-indigo-600 rounded"
                                                    title="View Source"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleEditStart(item)}
                                                    className="p-1 hover:bg-slate-100 text-slate-500 rounded"
                                                    title="Edit"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </button>
                                                {!item.isVerified && item.value && (
                                                    <button
                                                        onClick={() => onVerify(item.id)}
                                                        className="p-1 hover:bg-green-50 text-green-600 rounded"
                                                        title="Verify"
                                                    >
                                                        <CheckCircle className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {item.isVerified && (
                                    <div className="absolute top-2 right-2 text-green-500 bg-white rounded-full">
                                        <CheckCircle className="w-4 h-4 fill-green-100" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Add Manual Field Card */}
                        <div className="bg-slate-50 rounded-lg border border-dashed border-slate-300 p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 hover:border-slate-400 transition-colors">
                            <span className="text-2xl text-slate-400 mb-1">+</span>
                            <span className="text-xs font-medium text-slate-500">Add Field</span>
                        </div>
                    </div>
                </section>

                {/* ACCESS SECTION */}
                <section id="access" className="space-y-4 pt-4 border-t border-slate-200 scroll-mt-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
                        <ChevronDown className="w-4 h-4 mr-2" /> Access & Equipment
                    </h3>
                    <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100 shadow-sm">
                        {checklist.map(item => (
                            <div key={item.id} className="p-4 flex items-start group hover:bg-slate-50 transition-colors">
                                <button className={`mt-0.5 mr-3 flex-shrink-0 ${item.status === 'ordered' || item.status === 'provisioned' ? 'text-green-500' : 'text-slate-300'}`}>
                                    {item.status === 'ordered' || item.status === 'provisioned' ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                </button>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h4 className="text-sm font-semibold text-slate-800">{item.label}</h4>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.status === 'provisioned' ? 'bg-green-100 text-green-700' :
                                            item.status === 'ordered' ? 'bg-blue-100 text-blue-700' :
                                                'bg-slate-100 text-slate-500'
                                            }`}>
                                            {item.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                                    <div className="mt-2 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] text-green-600 flex items-center bg-green-50 px-1.5 py-0.5 rounded">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                                            {item.confidence}% Match
                                        </span>
                                        <button className="text-[10px] text-indigo-600 hover:underline">View Source</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* GAPS / COMPLIANCE */}
                <section id="gaps" className="space-y-4 pt-4 border-t border-slate-200 scroll-mt-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
                            <ChevronDown className="w-4 h-4 mr-2" /> Missing Items
                        </h3>
                        <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-medium">1 Action Required</span>
                    </div>

                    <div className="space-y-3">
                        {compliance.map(item => (
                            <div key={item.id} className={`rounded-lg border p-4 flex items-start shadow-sm ${item.status === 'missing' ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
                                <div className={`mt-0.5 mr-3 p-1 rounded-full ${item.status === 'missing' ? 'bg-amber-200 text-amber-700' : 'bg-green-100 text-green-600'}`}>
                                    {item.status === 'missing' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className={`text-sm font-semibold ${item.status === 'missing' ? 'text-amber-900' : 'text-slate-800'}`}>{item.title}</h4>
                                        <span className="text-[10px] text-slate-400 uppercase font-bold">{item.priority} Priority</span>
                                    </div>
                                    <p className={`text-xs mt-1 ${item.status === 'missing' ? 'text-amber-800' : 'text-slate-500'}`}>{item.description}</p>

                                    {item.status === 'missing' && (
                                        <div className="mt-3 flex space-x-2">
                                            <button className="bg-white border border-amber-300 text-amber-800 text-xs px-3 py-1.5 rounded-md hover:bg-amber-50 font-medium">Request Document</button>
                                            <button className="text-slate-500 text-xs px-3 py-1.5 hover:text-slate-800">Dismiss</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* MESSAGE EDITOR */}
                <section id="message" className="space-y-4 pt-4 border-t border-slate-200 scroll-mt-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
                        <ChevronDown className="w-4 h-4 mr-2" /> Welcome Message
                    </h3>
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center space-x-2">
                            <div className="flex space-x-1">
                                <button className="px-2 py-1 text-xs bg-white border border-slate-200 rounded shadow-sm text-slate-700 hover:text-indigo-600">+ Name</button>
                                <button className="px-2 py-1 text-xs bg-white border border-slate-200 rounded shadow-sm text-slate-700 hover:text-indigo-600">+ Title</button>
                                <button className="px-2 py-1 text-xs bg-white border border-slate-200 rounded shadow-sm text-slate-700 hover:text-indigo-600">+ Date</button>
                            </div>
                            <div className="flex-1"></div>
                            <span className="text-[10px] text-slate-400">Preview Mode</span>
                        </div>
                        <div className="p-4 bg-white text-sm text-slate-700 leading-relaxed font-serif">
                            <p className="mb-4">Dear <span className="bg-blue-50 text-blue-700 font-medium px-1 rounded">John Smith</span>,</p>
                            <p className="mb-4">Welcome to <span className="font-semibold">TechCorp Solutions Inc.</span>! We are thrilled to have you join our team as <span className="bg-blue-50 text-blue-700 font-medium px-1 rounded">Senior Software Engineer</span>.</p>
                            <p className="mb-4">Your first day is scheduled for <span className="bg-yellow-50 text-yellow-700 font-medium px-1 rounded">15 January 2025</span>. Please report to the London Headquarters at 09:30 AM.</p>
                            <p>Best regards,<br />The HR Team</p>
                        </div>
                        <div className="bg-slate-50 border-t border-slate-200 px-3 py-2 flex justify-between items-center">
                            <span className="text-xs text-slate-400">245 / 500 chars</span>
                            <button className="text-xs flex items-center text-slate-600 font-medium hover:text-indigo-600">
                                <ExternalLink className="w-3 h-3 mr-1" /> Open in Email Client
                            </button>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default ExtractionPanel;
