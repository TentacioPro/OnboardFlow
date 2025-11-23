import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

const DocumentViewer = ({
    document,
    currentPage,
    zoom,
    activeFieldId,
    hoveredFieldId,
    extractions,
    onPageChange,
    onZoomChange,
    onSelectField
}) => {
    const [showThumbnails, setShowThumbnails] = useState(true);

    // Filter extractions for current page
    const pageExtractions = extractions.filter(e => e.source && e.source.page === currentPage);
    const currentContent = document.pages.find(p => p.pageNumber === currentPage)?.content || [];

    const getHighlightColor = (item) => {
        const isActive = activeFieldId === item.id;
        const isHovered = hoveredFieldId === item.id;

        if (isActive) return 'bg-blue-500/30 border-blue-600 ring-2 ring-blue-400';
        if (isHovered) return 'bg-blue-200/40 border-blue-400';

        switch (item.level) {
            case 'high': return 'bg-green-300/30 border-green-500';
            case 'medium': return 'bg-yellow-300/30 border-yellow-500';
            case 'low': return 'bg-red-300/30 border-red-500';
            default: return 'bg-zinc-300/30 border-zinc-400';
        }
    };

    return (
        <div className="flex h-full bg-zinc-100/50 flex-col relative overflow-hidden">
            {/* Header */}
            <div className="h-12 bg-white border-b border-zinc-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-zinc-700 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-zinc-400" /> Source Documents
                    </span>
                </div>
                <div className="flex items-center bg-zinc-50 rounded-lg p-1 border border-zinc-200">
                    <button onClick={() => onZoomChange(Math.max(50, zoom - 25))} className="p-1.5 hover:bg-white rounded shadow-sm text-zinc-600">
                        <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center text-xs font-mono text-zinc-600">{zoom}%</span>
                    <button onClick={() => onZoomChange(Math.min(200, zoom + 25))} className="p-1.5 hover:bg-white rounded shadow-sm text-zinc-600">
                        <ZoomIn className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-zinc-200 mx-2"></div>
                    <button onClick={() => onZoomChange(100)} className="p-1.5 hover:bg-white rounded shadow-sm text-zinc-600" title="Fit Page">
                        <Maximize className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden relative">
                {/* Thumbnails Sidebar */}
                <div className={`w-[140px] bg-zinc-50 border-r border-zinc-200 flex flex-col p-4 overflow-y-auto custom-scroll transition-all duration-300 ${showThumbnails ? 'translate-x-0' : '-translate-x-full absolute h-full'}`}>
                    <div className="space-y-4">
                        {document.pages.map((p) => {
                            // Check confidence of items on this page
                            const pageItems = extractions.filter(e => e.source?.page === p.pageNumber);
                            const hasIssue = pageItems.some(i => i.level === 'low' || i.level === 'missing');
                            const hasWarning = pageItems.some(i => i.level === 'medium');

                            return (
                                <div
                                    key={p.pageNumber}
                                    onClick={() => onPageChange(p.pageNumber)}
                                    className={`cursor-pointer group relative ${currentPage === p.pageNumber ? 'ring-2 ring-blue-500 rounded-sm' : ''}`}
                                >
                                    <div className="aspect-[1/1.41] bg-white border border-zinc-300 shadow-sm flex flex-col p-2 text-[4px] leading-relaxed text-zinc-300 overflow-hidden hover:border-blue-400 transition-colors">
                                        {/* Thumbnail Mock Lines */}
                                        <div className="w-3/4 h-1 bg-zinc-200 mb-1"></div>
                                        <div className="w-full h-0.5 bg-zinc-200 mb-0.5"></div>
                                        <div className="w-5/6 h-0.5 bg-zinc-200 mb-0.5"></div>
                                        <div className="w-full h-0.5 bg-zinc-200 mb-2"></div>
                                        <div className="w-1/2 h-0.5 bg-zinc-200 mb-0.5"></div>
                                        <div className="w-full h-0.5 bg-zinc-200"></div>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className={`text-xs font-medium ${currentPage === p.pageNumber ? 'text-blue-600' : 'text-zinc-500'}`}>Page {p.pageNumber}</span>
                                        {hasIssue ? <div className="w-2 h-2 rounded-full bg-red-500"></div> :
                                            hasWarning ? <div className="w-2 h-2 rounded-full bg-yellow-500"></div> :
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Viewer Canvas */}
                <div className="flex-1 bg-zinc-200/50 flex justify-center p-8 overflow-auto custom-scroll relative">

                    {/* Document Page Mock */}
                    <div
                        className="bg-white shadow-lg transition-transform duration-200 origin-top relative"
                        style={{
                            width: `${800 * (zoom / 100)}px`,
                            minHeight: `${1132 * (zoom / 100)}px`,
                            padding: `${60 * (zoom / 100)}px`
                        }}
                    >
                        {/* Text Content Rendering */}
                        <div className="space-y-4 font-serif text-zinc-900 leading-relaxed" style={{ fontSize: `${16 * (zoom / 100)}px` }}>
                            {currentContent.map((line, idx) => (
                                <p key={idx} className={line === "" ? "h-4" : ""}>{line}</p>
                            ))}
                        </div>

                        {/* Highlights Layer */}
                        <div className="absolute inset-0 pointer-events-none">
                            {pageExtractions.map(item => {
                                if (!item.source) return null;
                                const { rect } = item.source;
                                // Mock positioning logic based on percentages stored in data
                                return (
                                    <div
                                        key={item.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectField(item.id);
                                        }}
                                        className={`absolute cursor-pointer border-b-2 transition-all duration-200 pointer-events-auto hover:opacity-80 ${getHighlightColor(item)}`}
                                        style={{
                                            left: `${rect.x}%`,
                                            top: `${rect.y}%`,
                                            width: `${rect.w}%`,
                                            height: `${rect.h}%`
                                        }}
                                    >
                                        {/* Label on hover or active */}
                                        {(activeFieldId === item.id || hoveredFieldId === item.id) && (
                                            <div className="absolute -top-6 left-0 bg-zinc-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                                                {item.label} ({item.confidence}%)
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Floating Page Nav within canvas */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-zinc-800/90 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-4 backdrop-blur-sm z-20">
                        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="hover:text-blue-400 disabled:opacity-30"><ChevronLeft className="w-5 h-5" /></button>
                        <span className="text-sm font-medium">Page {currentPage} of {document.pageCount}</span>
                        <button disabled={currentPage === document.pageCount} onClick={() => onPageChange(currentPage + 1)} className="hover:text-blue-400 disabled:opacity-30"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>

            {/* Document Tabs */}
            <div className="h-10 bg-zinc-50 border-t border-zinc-200 flex items-center px-2 space-x-1 shrink-0 overflow-x-auto custom-scroll">
                <div className="flex items-center px-3 py-1.5 bg-white border border-zinc-300 border-b-white rounded-t-md relative -mb-px shadow-sm">
                    <FileText className="w-3.5 h-3.5 text-blue-600 mr-2" />
                    <span className="text-xs font-semibold text-blue-700">Contract.pdf</span>
                    <CheckCircle2 className="w-3 h-3 text-green-500 ml-2" />
                </div>
                <div className="flex items-center px-3 py-1.5 hover:bg-zinc-100 text-zinc-500 cursor-pointer rounded-t-md transition-colors">
                    <FileText className="w-3.5 h-3.5 mr-2" />
                    <span className="text-xs font-medium">CV.docx</span>
                    <CheckCircle2 className="w-3 h-3 text-green-500 ml-2" />
                </div>
                <div className="flex items-center px-3 py-1.5 hover:bg-zinc-100 text-zinc-500 cursor-pointer rounded-t-md transition-colors">
                    <FileText className="w-3.5 h-3.5 mr-2" />
                    <span className="text-xs font-medium">ID_Scan.pdf</span>
                    <AlertTriangle className="w-3 h-3 text-yellow-500 ml-2" />
                </div>
                <button className="ml-2 w-6 h-6 flex items-center justify-center hover:bg-zinc-200 rounded text-zinc-500">
                    <span className="text-lg leading-none">+</span>
                </button>
            </div>
        </div>
    );
};

export default DocumentViewer;
