import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCases } from '../context/CaseContext';
import { ArrowLeft } from 'lucide-react';
import DocumentViewer from '../components/document-viewer/DocumentViewer';
import ExtractionPanel from '../components/document-viewer/ExtractionPanel';
import { MOCK_DOCUMENTS, MOCK_EXTRACTIONS, MOCK_CHECKLIST, MOCK_COMPLIANCE, MOCK_TASKS } from '../constants/document-viewer';

const DocumentAnalysisPage = () => {
    const { id, docId } = useParams();
    const navigate = useNavigate();
    const { getCase } = useCases(); // Get access to global state
    // 1. Find the real document from Context
    const currentCase = getCase(id);
    const currentDoc = currentCase?.documents?.find(d => d.id === docId);

    // Application State
    const [documents] = useState([]);
    const [activeDocId, setActiveDocId] = useState(docId);
    const [currentPage, setCurrentPage] = useState(1);
    const [zoomLevel, setZoomLevel] = useState(100);

    // Data State
    const [extractions, setExtractions] = useState([]);
    const [checklist] = useState([]);
    const [compliance] = useState([]);
    const [tasks] = useState([]);

    useEffect(() => {
        if (currentDoc?.analysis?.extracted) {
            // Map the Python simple dict to the UI's expected Array format
            const mappedExtractions = Object.entries(currentDoc.analysis.extracted).map(([key, val], idx) => ({
                id: `field-${idx}`,
                label: key.replace(/_/g, ' '),
                value: val,
                confidence: 0.85, // Mock confidence if Python doesn't send it yet
                isVerified: false,
                source: { page: 1 } // Default to page 1 for now
            }));
            setExtractions(mappedExtractions);
        }
    }, [currentDoc]);

    if (!currentCase || !currentDoc) return <div>Loading...</div>;

    // Interaction State
    const [activeFieldId, setActiveFieldId] = useState(null);
    const [hoveredFieldId, setHoveredFieldId] = useState(null);

    // const currentDoc = documents.find(d => d.id === activeDocId) || documents[0];

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
                        extractions={extractions}
                        currentPage={currentPage}
                        zoom={zoomLevel}
                        activeFieldId={activeFieldId}
                        hoveredFieldId={hoveredFieldId}
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
