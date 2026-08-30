import React, { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";

import { API_URL } from "../../config";
import LoadingScreen from "../../components/Layout/LoadingScreen";

import styles from "./TemplateView.module.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function TemplateView({ template, onBack, onEdit }) {
  // PDF Rendering State
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Math & Render Refs
  const canvasRef = useRef(null);
  const pdfWrapperRef = useRef(null);

  // Extract template data safely based on provided schema structure
  const templateId = template?.templateid?._id;
  const templateName = template?.templateid?.name || "Untitled Template";
  const creatorName = template?.templateid?.createdby?.name || "System Admin";
  
  // Roles are saved as a String in the TemplateWidget schema, split if multiple
  const rawRole = template?.role || "Signer";
  const roles = rawRole.split(",").map(r => r.trim()).filter(Boolean);
  
  const widgets = template?.widget || [];
  const hasFile = Boolean(template?.templateid?.file?.fileId);

  // 1. Load the PDF Document from API
  useEffect(() => {
    if (!templateId || !hasFile) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function loadPdf() {
      setLoading(true);
      try {
        const loadingTask = pdfjsLib.getDocument(`${API_URL}template/template/${templateId}/pdf`);
        const doc = await loadingTask.promise;

        if (cancelled) return;
        setPdfDoc(doc);
        setPages(Array.from({ length: doc.numPages }, (_, i) => i + 1));
        setActivePage(1);
      } catch (err) {
        console.error("PDF Loading error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPdf();
    return () => {
      cancelled = true;
    };
  }, [templateId, hasFile]);

  // 2. Render Page at Fixed Scale (1.2) for strict coordinate alignment
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let cancelled = false;
    async function renderPage() {
      const page = await pdfDoc.getPage(activePage);
      
      // Fixed scale 1.2 matches the Editor precisely
      const viewport = page.getViewport({ scale: 1.2 });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      if (pdfWrapperRef.current) {
        pdfWrapperRef.current.style.width = `${viewport.width}px`;
        pdfWrapperRef.current.style.height = `${viewport.height}px`;
      }

      if (cancelled) return;
      await page.render({ canvasContext: ctx, viewport }).promise;
    }

    renderPage();
    return () => {
      cancelled = true;
    };
  }, [pdfDoc, activePage]);

  return (
    <div className={styles.pageWrapper}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.navGroup}>
          <button className={styles.iconButton} onClick={onBack} aria-label="Go Back">
            <ChevronLeft size={24} strokeWidth={2} />
          </button>
          <button className={styles.iconButton} aria-label="Next">
            <ChevronRight size={24} strokeWidth={2} />
          </button>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* LEFT SIDEBAR: Thumbnails */}
        <aside className={styles.leftSidebar}>
          <div className={styles.sidebarTitle}>Preview</div>
          {pages.map((pageNum) => (
            <div
              key={pageNum}
              className={`${styles.thumbnailCard} ${activePage === pageNum ? styles.thumbnailCardActive : ""}`}
              onClick={() => setActivePage(pageNum)}
            >
              <ThumbnailRenderer pdfDoc={pdfDoc} pageNum={pageNum} />
              <span className={styles.thumbnailLabel}>Page {pageNum}</span>
            </div>
          ))}
        </aside>

        {/* CENTER: Document Canvas */}
        <main className={styles.centerCanvasArea}>
          <div className={styles.pdfWrapper} ref={pdfWrapperRef}>
            {hasFile ? (
              <>
                <canvas ref={canvasRef} className={styles.pdfCanvas} />

                {/* Render Read-Only Widgets exactly where they were placed */}
                {widgets
                  .filter((w) => w.page === activePage)
                  .map((w, idx) => (
                    <div
                      key={idx}
                      className={styles.placedWidget}
                      style={{
                        left: `${w.x}px`,
                        top: `${w.y}px`,
                        width: `${w.width}px`,
                        height: `${w.height}px`,
                      }}
                    >
                      <span className={styles.widgetLabel}>
                        {w.widgetname.charAt(0).toUpperCase() + w.widgetname.slice(1)}
                      </span>
                    </div>
                  ))}
              </>
            ) : (
              // Fallback for HTML Content Templates
              <div style={{ padding: "40px", width: "800px", minHeight: "1000px" }}>
                <ReactQuill
                  value={template?.templateid?.htmlcontent || ""}
                  readOnly
                  theme="bubble"
                />
              </div>
            )}
          </div>
        </main>

        {/* RIGHT SIDEBAR: Details */}
        <aside className={styles.rightSidebar}>
          <div>
            <div className={styles.sectionLabel}>Raised by</div>
            <input 
              type="text" 
              className={styles.readOnlyInput} 
              value={creatorName} 
              readOnly 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div className={styles.sectionLabel}>Signee</div>
            <div className={styles.signeeList}>
              {roles.map((roleName, idx) => (
                <div key={idx} className={styles.signeeCard}>
                  <div className={styles.signeeAvatar}>
                    <User size={16} />
                  </div>
                  <h4 className={styles.signeeRole}>{roleName}</h4>
                </div>
              ))}
            </div>

            {/* Actions */}
            <button 
              className={styles.editBtn} 
              onClick={() => onEdit && onEdit(template)}
            >
              Edit
            </button>
          </div>
        </aside>
      </div>

      {loading && <LoadingScreen message="Loading Template View..." />}
    </div>
  );
}

// Helper to render thumbnails efficiently
function ThumbnailRenderer({ pdfDoc, pageNum }) {
  const thumbRef = useRef(null);

  useEffect(() => {
    if (!pdfDoc || !thumbRef.current) return;
    
    let cancelled = false;
    async function renderThumb() {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 0.25 });
      const canvas = thumbRef.current;
      const ctx = canvas.getContext("2d");
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      if (cancelled) return;
      await page.render({ canvasContext: ctx, viewport }).promise;
    }
    renderThumb();
    
    return () => { cancelled = true; };
  }, [pdfDoc, pageNum]);

  return <canvas ref={thumbRef} className={styles.thumbnailCanvas} />;
}