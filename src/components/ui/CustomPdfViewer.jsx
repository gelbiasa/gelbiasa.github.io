import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { FiZoomIn, FiZoomOut, FiDownload, FiMaximize, FiMinimize, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

// Set PDF.js worker from CDN to avoid build configuration issues in Vite
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function CustomPdfViewer({ fileUrl }) {
  const { t } = useLanguage();
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1.0);
  const [containerWidth, setContainerWidth] = useState(0);

  const scrollContainerRef = useRef(null);
  const pageRefs = useRef({});
  const isProgrammaticScroll = useRef(false);

  // Reset state when switching PDF files
  useEffect(() => {
    setNumPages(null);
    setCurrentPage(1);
    setScale(1.0);
    pageRefs.current = {};
  }, [fileUrl]);

  // Measure container width for responsive PDF page sizing across mobile, tablet, and desktop
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const updateWidth = () => {
      if (el.clientWidth > 0) {
        setContainerWidth(el.clientWidth);
      }
    };

    updateWidth();

    let observer;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateWidth);
      observer.observe(el);
    } else {
      window.addEventListener('resize', updateWidth);
    }

    return () => {
      if (observer) observer.disconnect();
      else window.removeEventListener('resize', updateWidth);
    };
  }, [isFullscreen]);

  function onDocumentLoadSuccess({ numPages: loadedPages }) {
    setNumPages(loadedPages);
    setCurrentPage(1);
  }

  const zoomIn = () => setScale(prev => Math.min(+(prev + 0.25).toFixed(2), 2.5));
  const zoomOut = () => setScale(prev => Math.max(+(prev - 0.25).toFixed(2), 0.5));

  const scrollToPage = useCallback((targetPage) => {
    if (!numPages) return;
    const clamped = Math.max(1, Math.min(targetPage, numPages));
    setCurrentPage(clamped);

    const pageEl = pageRefs.current[clamped];
    const containerEl = scrollContainerRef.current;
    if (pageEl && containerEl) {
      isProgrammaticScroll.current = true;
      const topPos = pageEl.offsetTop - 16;
      containerEl.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 450);
    }
  }, [numPages]);

  const handleScroll = useCallback(() => {
    if (isProgrammaticScroll.current || !numPages || numPages <= 1) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const viewportCenter = container.scrollTop + container.clientHeight * 0.35;
    let detectedPage = 1;

    for (let i = 1; i <= numPages; i++) {
      const pageEl = pageRefs.current[i];
      if (pageEl && pageEl.offsetTop <= viewportCenter) {
        detectedPage = i;
      }
    }

    if (detectedPage !== currentPage) {
      setCurrentPage(detectedPage);
    }
  }, [numPages, currentPage]);

  // Responsive base width calculation so PDF fits screen width on mobile/tablet/desktop at 100%
  const fallbackWidth = typeof window !== 'undefined'
    ? (window.innerWidth < 640 ? window.innerWidth - 56 : window.innerWidth < 1024 ? window.innerWidth - 120 : 740)
    : 740;
  const horizontalPad = containerWidth < 640 ? 20 : 56;
  const maxBaseWidth = isFullscreen ? 960 : 760;
  const baseWidth = containerWidth > 0
    ? Math.min(Math.max(containerWidth - horizontalPad, 220), maxBaseWidth)
    : Math.min(Math.max(fallbackWidth, 220), maxBaseWidth);
  const renderedPageWidth = Math.round(baseWidth * scale);

  const viewerContent = (
    <div className={`w-full h-full flex flex-col bg-surface relative overflow-hidden ${isFullscreen ? 'z-[9999] h-screen w-screen rounded-none' : 'rounded-xl'}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 py-2 md:px-4 md:py-3 border-b border-border bg-surface-2 shrink-0">
        {/* Left: Zoom Controls */}
        <div className="flex items-center gap-0.5 md:gap-1.5">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="p-1.5 md:p-2 rounded hover:bg-surface text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors"
            title="Zoom Out"
          >
            <FiZoomOut size={17} />
          </button>
          <button
            onClick={() => setScale(1.0)}
            className="text-[11px] md:text-sm font-mono font-semibold text-text-primary px-1.5 py-0.5 rounded hover:bg-surface transition-colors min-w-[3rem] text-center"
            title="Reset Zoom"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            onClick={zoomIn}
            disabled={scale >= 2.5}
            className="p-1.5 md:p-2 rounded hover:bg-surface text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors"
            title="Zoom In"
          >
            <FiZoomIn size={17} />
          </button>
        </div>

        {/* Center: Page Indicator & Multi-page Navigation */}
        {numPages && (
          <div className="flex items-center gap-1 md:gap-2 bg-background px-2 md:px-3 py-1 rounded-full border border-border">
            {numPages > 1 && (
              <button
                onClick={() => scrollToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-1 rounded-full hover:bg-surface-2 text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Previous Page"
              >
                <FiChevronLeft size={15} />
              </button>
            )}

            <span className="text-[11px] md:text-xs text-text-muted font-medium px-1 whitespace-nowrap">
              {t('education.pageOf').replace('{current}', currentPage).replace('{total}', numPages)}
            </span>

            {numPages > 1 && numPages <= 6 && (
              <div className="hidden sm:flex items-center gap-1 pl-1 border-l border-border">
                {Array.from({ length: numPages }, (_, idx) => {
                  const p = idx + 1;
                  const active = p === currentPage;
                  return (
                    <button
                      key={p}
                      onClick={() => scrollToPage(p)}
                      className={`w-6 h-6 rounded-full text-[11px] font-bold transition-all ${
                        active
                          ? 'bg-accent text-background shadow-sm'
                          : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            )}

            {numPages > 1 && (
              <button
                onClick={() => scrollToPage(currentPage + 1)}
                disabled={currentPage >= numPages}
                className="p-1 rounded-full hover:bg-surface-2 text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Next Page"
              >
                <FiChevronRight size={15} />
              </button>
            )}
          </div>
        )}

        {/* Right: Fullscreen & Download Buttons */}
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1.5 px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-lg bg-surface hover:bg-surface-2 border border-border text-text-primary transition-all font-bold text-[10px] md:text-xs"
          >
            {isFullscreen ? <FiMinimize size={15} /> : <FiMaximize size={15} />}
            <span className="hidden md:inline">
              {isFullscreen ? (t('education.exitFullscreen') || 'Exit Full Screen') : (t('education.fullscreen') || 'Full Screen')}
            </span>
          </button>

          <a
            href={fileUrl}
            download
            className="flex items-center gap-1.5 px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-lg bg-accent text-background hover:brightness-110 shadow-lg shadow-accent/20 transition-all font-bold text-[10px] md:text-xs"
          >
            <FiDownload size={15} />
            <span className="hidden sm:inline">{t('education.savePdf')}</span>
          </a>

          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="md:hidden flex items-center justify-center p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 transition-colors"
            >
              <FiX size={17} />
            </button>
          )}
        </div>
      </div>

      {/* PDF Document Scroll Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-auto custom-scrollbar bg-background p-2 sm:p-4 md:p-6 text-center relative"
      >
        <div className="inline-block text-left min-w-min">
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
                <span className="text-text-muted text-sm animate-pulse">Loading Document...</span>
              </div>
            }
            error={
              <div className="flex items-center justify-center py-16 text-red-500 font-semibold p-4 text-center">
                Failed to load PDF file. Please try downloading it directly.
              </div>
            }
          >
            <div className="flex flex-col items-center gap-4 md:gap-6">
              {numPages &&
                Array.from({ length: numPages }, (_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <div
                      key={`page_${pageNumber}`}
                      ref={el => { pageRefs.current[pageNumber] = el; }}
                      className="bg-white rounded-lg shadow-2xl p-1.5 sm:p-2 border border-gray-200 relative"
                    >
                      {numPages > 1 && (
                        <div className="mb-1.5 flex items-center justify-between px-2 py-0.5 bg-slate-100 rounded text-[10px] sm:text-xs font-semibold text-slate-600">
                          <span>{t('education.pageOf').replace('{current}', pageNumber).replace('{total}', numPages)}</span>
                        </div>
                      )}
                      <Page
                        pageNumber={pageNumber}
                        width={renderedPageWidth}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="pdf-page-container"
                      />
                    </div>
                  );
                })}
            </div>
          </Document>
        </div>
      </div>
    </div>
  );

  // If fullscreen is active, render directly into document.body to break out of any parent modals/transforms
  if (isFullscreen && typeof document !== 'undefined') {
    return createPortal(
      <div className="fixed inset-0 z-[99999] bg-surface flex flex-col animate-in fade-in duration-200">
        {viewerContent}
      </div>,
      document.body
    );
  }

  return viewerContent;
}
