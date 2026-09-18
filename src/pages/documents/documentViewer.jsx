import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import { DocumentViewerSkeleton } from "../../components/common/Skeleton";

import styles from "./SignViewer.module.css";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function DocumentViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [documentDetails, setDocumentDetails] = useState(null);
  const [widgets, setWidgets] = useState([]);
  
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const reqRes = await axios.get(`${API_URL}sign/getrequests`, {
          withCredentials: true,
        });
        const reqData = reqRes.data.message.filter((s) => s?.documentId._id === id);
        setRequest(reqData);

        const widgetRes = await axios.get(`${API_URL}document/internal/widgets/${id}`, {
          withCredentials: true,
        });
        
        const widgetData = widgetRes.data.message;
        setDocumentDetails(widgetData.document);
        setWidgets((widgetData.widgets || []).map((w, index) => ({ ...w, index })));
      } catch (err) {
        console.error("Failed to load document:", err);
        toast.error("Failed to load document details.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  useEffect(() => {
    if (!documentDetails) return;
    
    async function loadPdf() {
      try {
        let pdfUrl;
        if (documentDetails.driveFileId) {
          pdfUrl = `${API_URL}document/internal/${documentDetails._id}/pdf`;
        } else if (documentDetails.templateId?.file) {
          pdfUrl = `${API_URL}template/template/${documentDetails.templateId._id}/pdf`;
        } else {
          return;
        }

        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          withCredentials: true,
        });

        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setPages(Array.from({ length: pdf.numPages }, (_, i) => i + 1));
      } catch (err) {
        console.error("PDF Loading Error:", err);
        toast.error("Failed to load PDF.");
      }
    }
    loadPdf();
  }, [documentDetails]);

  if (loading) return <DocumentViewerSkeleton />;

  return (
    <>
      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>{documentDetails?.title || "Document"}</h1>
          <p className={styles.headerSubtitle}>View your document</p>
        </header>

        <div className={styles.mainContent}>
          <aside className={styles.leftSidebar}>
            <div className={styles.sidebarTitle}>Preview</div>
            {pages.map((pageNum) => (
              <div
                key={pageNum}
                className={styles.thumbnailCard}
                onClick={() => document.getElementById(`page-${pageNum}`)?.scrollIntoView({ behavior: 'smooth' })}
              >
                <ThumbnailRenderer pdfDoc={pdfDoc} pageNum={pageNum} />
                <span className={styles.thumbnailLabel}>Page {pageNum}</span>
              </div>
            ))}
          </aside>

          <main className={styles.centerCanvasArea}>
            {pages.map((pageNum) => (
              <PdfPageReadOnly 
                key={pageNum}
                pdfDoc={pdfDoc}
                pageNum={pageNum}
                widgets={widgets.filter((w) => w.page === pageNum)}
              />
            ))}
          </main>

          <aside className={styles.rightSidebar}>
            <div>
              <div className={styles.sectionLabel}>Raised by</div>
              <input type="text" className={styles.raisedByInput} value={request?.[0]?.senderId?.name || "System Admin"} readOnly />
            </div>

            <div>
              <div className={styles.sectionLabel}>Signees</div>
              <div className={styles.signeeList}>
                {request?.map((signee, idx) => (
                  <div key={idx} className={styles.signeeCard}>
                    <div className={styles.signeeAvatar} />
                    <div className={styles.signeeInfo}>
                      <h4 className={styles.signeeName}>{signee?.recipient?.userId?.name}</h4>
                      <p className={styles.signeeEmail}>{signee?.recipient?.userId?.email}</p>
                    </div>
                    <span className={`${styles.statusBadge} ${signee?.overallStatus === 'completed' ? styles.statusCompleted : styles.statusPending}`}>
                      {signee?.overallStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.btnOutline} onClick={() => navigate("/documents")}>
                Back
              </button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function PdfPageReadOnly({ pdfDoc, pageNum, widgets }) {
  const canvasRef = useRef(null);
  const [baseDim, setBaseDim] = useState({ width: 1, height: 1 });

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    async function renderPage() {
      const page = await pdfDoc.getPage(pageNum);
      const originalViewport = page.getViewport({ scale: 1.2 });
      setBaseDim({ width: originalViewport.width, height: originalViewport.height });

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: ctx, viewport }).promise;
    }
    renderPage();
  }, [pdfDoc, pageNum]);

  return (
    <div id={`page-${pageNum}`} className={styles.pdfWrapper}>
      <canvas ref={canvasRef} className={styles.pdfCanvas} />
      {widgets.map((w) => {
        const leftPercent = (w.x / baseDim.width) * 100;
        const topPercent = (w.y / baseDim.height) * 100;
        const widthPercent = (w.width / baseDim.width) * 100;
        const heightPercent = (w.height / baseDim.height) * 100;

        return (
          <div
            key={w.index}
            className={styles.widgetOverlay}
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              width: `${widthPercent}%`,
              height: `${heightPercent}%`,
            }}
          >
            {w.widgetname === "signature" ? (
              <div className={styles.signatureWidgetPreview1}>
                {w.value && <img src={w.value} alt="Signature" className={styles.signaturePreviewImage} />}
              </div>
            ) : (
              <input
                className={styles.widgetInput}
                type="text"
                value={w.value || ""}
                readOnly
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ThumbnailRenderer({ pdfDoc, pageNum }) {
  const thumbRef = useRef(null);
  useEffect(() => {
    if (!pdfDoc || !thumbRef.current) return;
    async function renderThumb() {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 0.3 });
      const canvas = thumbRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: ctx, viewport }).promise;
    }
    renderThumb();
  }, [pdfDoc, pageNum]);
  return <canvas ref={thumbRef} className={styles.thumbnailCanvas} />;
}