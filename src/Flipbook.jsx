import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import screenfull from "screenfull";
import { Document, Page, pdfjs } from "react-pdf";
import { Maximize, Minimize, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, BookOpenCheck } from "lucide-react";


import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function Flipbook( { src } ) {
  const bookRef = useRef(null);
  const outerRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [isFs, setIsFs] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    function onChange() {
      setIsFs(screenfull.isFullscreen);
    }
    if (screenfull.isEnabled) {
      screenfull.on("change", onChange);
      return () => screenfull.off("change", onChange);
    }
  }, []);

  useEffect(() => {
  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  }
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);

  const canPrev = current > 0;
  const canNext = current < Math.max(0, (numPages || 1) - 1);

  function goPrev() {
    if (bookRef.current) bookRef.current.pageFlip().flipPrev();
  }
  function goNext() {
    if (bookRef.current) bookRef.current.pageFlip().flipNext();
  }
  function toggleFullscreen() {
    if (!screenfull.isEnabled) return;
    if (screenfull.isFullscreen) screenfull.exit();
    else screenfull.request(outerRef.current);
  }

  return (
    <div className="viewer-wrap">
      <div className="toolbar">
        <span className="badge">
          <BookOpenCheck size={16} /> {current + 1}/{numPages || "?"} pages
        </span>
        <span className="badge">Zoom: {(zoom * 100).toFixed(0)}%</span>
        <div className="spacer" />
        <button onClick={() => setZoom(z => Math.max(0.6, +(z - 0.1).toFixed(2)))}><ZoomOut size={18} /></button>
        <button onClick={() => setZoom(z => Math.min(3, +(z + 0.1).toFixed(2)))}><ZoomIn size={18} /></button>
        <button onClick={goPrev} disabled={!canPrev}><ChevronLeft size={18} /></button>
        <button onClick={goNext} disabled={!canNext}><ChevronRight size={18} /></button>
        <button onClick={toggleFullscreen}>{isFs ? <Minimize size={18} /> : <Maximize size={18} />}</button>
      </div>

      <div className="stage">
        <div ref={outerRef} style={{ transform: `scale(${zoom})` }}>
          <Document
            file= {src}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <HTMLFlipBook
              width={420}
              height={600}
              size="fixed"
              minWidth={315}
              maxWidth={1800}
              maxHeight={2500}
              showCover={false}
              mobileScrollSupport={true}
              onFlip={(e) => setCurrent(e.data)}
              ref={bookRef}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`}>
                  <Page pageNumber={index + 1} width={435} height={580}/>
                </div>
              ))}
            </HTMLFlipBook>
          </Document>
        </div>
      </div>
    </div>
  );
}
