import React, { useRef, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { FileText, Trash2, Upload, CloudUpload, Loader2 } from 'lucide-react';
import { useCases } from '../context/CaseContext';

const CaseDocuments = () => {
    const { currentCase } = useOutletContext();
    const { deleteDocument, addDocument } = useCases();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setIsUploading(true);
            const file = e.target.files[0];

            // Simulate network delay
            try {
                await addDocument(currentCase.id, file);
                if (fileInputRef.current) fileInputRef.current.value = '';
            } catch (error) {
                console.error("Upload failed:", error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <div className="space-y-6 pb-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-900">Documents</h2>
                <div className="relative">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium shadow-sm cursor-pointer transition-all ${isUploading
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                    >
                        {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        {isUploading ? 'Uploading...' : 'Upload Document'}
                    </label>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                {currentCase.documents.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center text-slate-500">
                        <CloudUpload size={48} className="mb-4 text-slate-300" />
                        <p className="text-lg font-medium">No documents yet</p>
                        <p className="text-sm mt-1">Upload necessary files to start the analysis.</p>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Size</th>
                                <th className="px-6 py-3">Upload Date</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentCase.documents.map((doc) => (
                                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-50 p-2 rounded text-blue-600">
                                                <FileText size={18} />
                                            </div>
                                            <span className="text-sm font-medium text-slate-900">{doc.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 capitalize">
                                        {doc.type.split('/')[1] || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{doc.size}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{doc.uploadDate}</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button
                                            onClick={() => navigate(`/cases/${currentCase.id}/documents/${doc.id}`)}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                                            title="Analyze"
                                        >
                                            <FileText size={18} />
                                        </button>
                                        <button
                                            onClick={() => deleteDocument(currentCase.id, doc.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CaseDocuments;
