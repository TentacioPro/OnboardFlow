import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DocumentViewer from '../components/document-viewer/DocumentViewer';
import ExtractionPanel from '../components/document-viewer/ExtractionPanel';
import { MOCK_DOCUMENTS, MOCK_EXTRACTIONS, MOCK_CHECKLIST, MOCK_COMPLIANCE, MOCK_TASKS } from '../constants/document-viewer';

const DocumentAnalysisPage = () => {
    const { id, docId } = useParams();
    const navigate = useNavigate();

    // Application State
    const [documents] = useState(MOCK_DOCUMENTS);
    const [activeDocId, setActiveDocId] = useState(docId || MOCK_DOCUMENTS[0].id);
    const [currentPage, setCurrentPage] = useState(1);
    const [zoomLevel, setZoomLevel] = useState(100);

    // Data State
    const [extractions, setExtractions] = useState(MOCK_EXTRACTIONS);
    const [checklist] = useState(MOCK_CHECKLIST);
    const [compliance] = useState(MOCK_COMPLIANCE);
    const [tasks] = useState(MOCK_TASKS);

    // Interaction State
    const [activeFieldId, setActiveFieldId] = useState(null);
    const [hoveredFieldId, setHoveredFieldId] = useState(null);

    const currentDoc = documents.find(d => d.id === activeDocId) || documents[0];

    // Logic to jump to page when selecting a field
    const handleFieldSelect = (id) => {
        setActiveFieldId(id);
        const field = extractions.find(e => e.id === id);
        if (field?.source) {
            setCurrentPage(field.source.page);
        }
    };

    const handleUpdateValue = (id, newVal) => {
        setExtractions(prev => prev.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    value: newVal,
                    isVerified: true,
                    confidence: 0, // Manual override clears AI confidence
                    level: 'high' // Treated as verified high confidence
                };
            }
            return item;
        }));
    };

    const handleVerify = (id) => {
        setExtractions(prev => prev.map(item =>
            item.id === id ? { ...item, isVerified: true } : item
        ));
        setActiveFieldId(null);
    };

    return (
        <div className="flex flex-col h-screen bg-zinc-50 text-zinc-900 font-sans overflow-hidden">
            {/* Header */}
            <div className="h-14 bg-white border-b border-zinc-200 flex items-center px-4 justify-between shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/cases/${id}/documents`)}
                        className="p-2 hover:bg-zinc-100 rounded-full text-zinc-500 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-sm font-bold text-zinc-900">Document Analysis</h1>
                        <p className="text-xs text-zinc-500">{currentDoc.name}</p>
                    </div>
                </div>
                <div>
                    {/* Actions like Save or Complete could go here */}
                </div>
            </div>

            {/* Main Split View */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Pane: Document Viewer */}
                <div className="w-1/2 flex flex-col border-r border-zinc-200 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
                    <DocumentViewer
                        document={currentDoc}
                        currentPage={currentPage}
                        zoom={zoomLevel}
                        activeFieldId={activeFieldId}
                        hoveredFieldId={hoveredFieldId}
                        extractions={extractions}
                        onPageChange={setCurrentPage}
                        onZoomChange={setZoomLevel}
                        onSelectField={handleFieldSelect}
                    />
                </div>

                {/* Right Pane: Extraction Results */}
                <div className="w-1/2 flex flex-col bg-white">
                    <ExtractionPanel
                        data={extractions}
                        checklist={checklist}
                        compliance={compliance}
                        tasks={tasks}
                        activeFieldId={activeFieldId}
                        onFieldHover={setHoveredFieldId}
                        onFieldSelect={handleFieldSelect}
                        onUpdateValue={handleUpdateValue}
                        onVerify={handleVerify}
                    />
                </div>

            </div>
        </div>
    );
};

export default DocumentAnalysisPage;
