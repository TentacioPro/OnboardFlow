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
        <div className="flex h-full bg-slate-100/50 flex-col relative overflow-hidden">
            {/* Header */}
            <div className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-slate-700 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-slate-400" /> Source Documents
                    </span>
                </div>
                <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
                    <button onClick={() => onZoomChange(Math.max(50, zoom - 25))} className="p-1.5 hover:bg-white rounded shadow-sm text-slate-600">
                        <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center text-xs font-mono text-slate-600">{zoom}%</span>
                    <button onClick={() => onZoomChange(Math.min(200, zoom + 25))} className="p-1.5 hover:bg-white rounded shadow-sm text-slate-600">
                        <ZoomIn className="w-4 h-4" />
                    </button>
                    <div className="w-px h-4 bg-slate-200 mx-2"></div>
                    <button onClick={() => onZoomChange(100)} className="p-1.5 hover:bg-white rounded shadow-sm text-slate-600" title="Fit Page">
                        <Maximize className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden relative">
                {/* Thumbnails Sidebar */}
                <div className={`w-[140px] bg-slate-50 border-r border-slate-200 flex flex-col p-4 overflow-y-auto custom-scroll transition-all duration-300 ${showThumbnails ? 'translate-x-0' : '-translate-x-full absolute h-full'}`}>
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
                                    className={`cursor-pointer group relative ${currentPage === p.pageNumber ? 'ring-2 ring-indigo-500 rounded-sm' : ''}`}
                                >
                                    <div className="aspect-[1/1.41] bg-white border border-slate-300 shadow-sm flex flex-col p-2 text-[4px] leading-relaxed text-slate-300 overflow-hidden hover:border-indigo-400 transition-colors">
                                        {/* Thumbnail Mock Lines */}
                                        <div className="w-3/4 h-1 bg-slate-200 mb-1"></div>
                                        <div className="w-full h-0.5 bg-slate-200 mb-0.5"></div>
                                        <div className="w-5/6 h-0.5 bg-slate-200 mb-0.5"></div>
                                        <div className="w-full h-0.5 bg-slate-200 mb-2"></div>
                                        <div className="w-1/2 h-0.5 bg-slate-200 mb-0.5"></div>
                                        <div className="w-full h-0.5 bg-slate-200"></div>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className={`text-xs font-medium ${currentPage === p.pageNumber ? 'text-indigo-600' : 'text-slate-500'}`}>Page {p.pageNumber}</span>
                                        {hasIssue ? <div className="w-2 h-2 rounded-full bg-red-500"></div> :
                                            hasWarning ? <div className="w-2 h-2 rounded-full bg-amber-500"></div> :
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Viewer Canvas */}
                <div className="flex-1 bg-slate-200/50 flex justify-center p-8 overflow-auto custom-scroll relative">

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
                        <div className="space-y-4 font-serif text-slate-900 leading-relaxed" style={{ fontSize: `${16 * (zoom / 100)}px` }}>
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
                                            <div className="absolute -top-6 left-0 bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                                                {item.label} ({item.confidence}%)
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Floating Page Nav within canvas */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800/90 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-4 backdrop-blur-sm z-20">
                        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="hover:text-indigo-400 disabled:opacity-30"><ChevronLeft className="w-5 h-5" /></button>
                        <span className="text-sm font-medium">Page {currentPage} of {document.pageCount}</span>
                        <button disabled={currentPage === document.pageCount} onClick={() => onPageChange(currentPage + 1)} className="hover:text-indigo-400 disabled:opacity-30"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>

            {/* Document Tabs */}
            <div className="h-10 bg-slate-50 border-t border-slate-200 flex items-center px-2 space-x-1 shrink-0 overflow-x-auto custom-scroll">
                <div className="flex items-center px-3 py-1.5 bg-white border border-slate-300 border-b-white rounded-t-md relative -mb-px shadow-sm">
                    <FileText className="w-3.5 h-3.5 text-indigo-600 mr-2" />
                    <span className="text-xs font-semibold text-indigo-700">Contract.pdf</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-2" />
                </div>
                <div className="flex items-center px-3 py-1.5 hover:bg-slate-100 text-slate-500 cursor-pointer rounded-t-md transition-colors">
                    <FileText className="w-3.5 h-3.5 mr-2" />
                    <span className="text-xs font-medium">CV.docx</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-2" />
                </div>
                <div className="flex items-center px-3 py-1.5 hover:bg-slate-100 text-slate-500 cursor-pointer rounded-t-md transition-colors">
                    <FileText className="w-3.5 h-3.5 mr-2" />
                    <span className="text-xs font-medium">ID_Scan.pdf</span>
                    <AlertTriangle className="w-3 h-3 text-amber-500 ml-2" />
                </div>
                <button className="ml-2 w-6 h-6 flex items-center justify-center hover:bg-slate-200 rounded text-slate-500">
                    <span className="text-lg leading-none">+</span>
                </button>
            </div>
        </div>
    );
};

export default DocumentViewer;
