import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FiZoomIn, FiZoomOut, FiDownload } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

// Set PDF.js worker from CDN to avoid build configuration issues in Vite
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function CustomPdfViewer({ fileUrl }) {
  const { t } = useLanguage();
  const [numPages, setNumPages] = useState(null);
  // Default to a slightly smaller scale on mobile so it's not too huge, but still readable
  const [scale, setScale] = useState(typeof window !== 'undefined' && window.innerWidth < 768 ? 0.8 : 1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const zoomIn = () => setScale(prev => Math.min(prev + 0.3, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.3, 0.4));

  return (
    <div className="w-full h-full flex flex-col bg-surface relative rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-surface-2 shrink-0">
        <div className="flex items-center gap-1 md:gap-2">
          <button onClick={zoomOut} className="p-2 rounded hover:bg-surface text-text-secondary hover:text-text-primary transition-colors" title="Zoom Out">
            <FiZoomOut size={18} />
          </button>
          <span className="text-xs md:text-sm font-mono font-semibold text-text-primary w-10 md:w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button onClick={zoomIn} className="p-2 rounded hover:bg-surface text-text-secondary hover:text-text-primary transition-colors" title="Zoom In">
            <FiZoomIn size={18} />
          </button>
        </div>
        
        {numPages && (
          <div className="text-xs md:text-sm text-text-muted font-medium bg-background px-3 py-1 rounded-full border border-border">
            {t('education.pageOf').replace('{current}', '1').replace('{total}', numPages)}
          </div>
        )}

        <div className="flex items-center">
          <a 
            href={fileUrl} 
            download 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-background hover:brightness-110 shadow-lg shadow-accent/20 transition-all font-bold text-xs md:text-sm"
          >
            <FiDownload size={16} />
            <span className="hidden sm:inline">{t('education.savePdf')}</span>
          </a>
        </div>
      </div>

      {/* PDF Document Container */}
      <div 
        className="flex-1 overflow-auto custom-scrollbar bg-background p-2 md:p-8 text-center"
      >
        <div className="inline-block text-left min-w-min">
          <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
              <span className="text-text-muted text-sm animate-pulse">Loading Document...</span>
            </div>
          }
          error={
            <div className="flex items-center justify-center h-full text-red-500 font-semibold p-4 text-center">
              Failed to load PDF file. Please try downloading it directly.
            </div>
          }
        >
          <div className="bg-white rounded shadow-2xl p-2 pb-1 border border-gray-200">
             {/* Disable text and annotation layers for performance and visual parity with the raw PDF */}
            <Page 
              pageNumber={1} 
              scale={scale} 
              renderTextLayer={false} 
              renderAnnotationLayer={false}
              className="pdf-page-container"
            />
          </div>
        </Document>
        </div>
      </div>
    </div>
  );
}
