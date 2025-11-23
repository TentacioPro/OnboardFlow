import React from 'react';

const Settings = () => {
    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Settings</h1>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-100">
                <div className="p-6">
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Notifications</h3>
                    <p className="text-sm text-slate-500 mb-4">Manage how you receive updates about cases.</p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Email Alerts on New Cases</span>
                        <div className="w-11 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Integration</h3>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-blue-700 font-bold text-xs">WD</div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">Workday</p>
                                <p className="text-xs text-green-600">Connected</p>
                            </div>
                        </div>
                        <button className="text-sm text-slate-500 border border-slate-300 px-3 py-1 rounded hover:bg-slate-50">Configure</button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-sky-100 rounded flex items-center justify-center text-sky-700 font-bold text-xs">SF</div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">Salesforce</p>
                                <p className="text-xs text-slate-500">Not Connected</p>
                            </div>
                        </div>
                        <button className="text-sm text-indigo-600 border border-indigo-200 bg-indigo-50 px-3 py-1 rounded hover:bg-indigo-100">Connect</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
