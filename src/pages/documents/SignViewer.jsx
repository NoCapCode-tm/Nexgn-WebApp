import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import { DocumentViewerSkeleton } from "../../components/common/Skeleton";

// 1. Import the new overlays
import SignerConsentOverlay from "../../components/overlays/SignerConsentOverlay";
import AlreadySignedOverlay from "../../components/overlays/AlreadySignedOverlay";
import RevokedOverlay from "../../components/overlays/RevokedOverlay";

import styles from "./SignViewer.module.css";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function SignViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [documentDetails, setDocumentDetails] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const [values, setValues] = useState({});

  const [pdfDoc, setPdfDoc] = useState(null);
  const [pages, setPages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  const [activeSignatureWidget, setActiveSignatureWidget] = useState(null);
  const [signatureTab, setSignatureTab] = useState("draw");
  const [typedName, setTypedName] = useState("");
  const [selectedSignatureFont, setSelectedSignatureFont] = useState("cursive");
  const [tempSignature, setTempSignature] = useState(null);

  // 2. Overlay State
  const [consentGiven, setConsentGiven] = useState(false);
  const [overlayType, setOverlayType] = useState(null);

  const modalSignatureCanvasRef = useRef(null);
  const uploadInputRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const reqRes = await axios.get(`${API_URL}sign/getrequest/${id}`, {
          withCredentials: true,
        });
        const reqData = reqRes?.data?.message;
        setRequest(reqData);

        // 3. Logic to determine which overlay to show
        if (reqData.overallStatus === "cancelled" || reqData.overallStatus === "revoked") {
          setOverlayType("revoked");
        } else if (reqData.overallStatus === "completed") {
          setOverlayType("signed");
          toast.info("This document is already completed.");
        } else if (!consentGiven) {
          setOverlayType("consent");
        }

        const widgetRes = await axios.get(`${API_URL}document/widgets/${id}`, {
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
  }, [id, consentGiven]); // Added consentGiven to dependencies

  useEffect(() => {
    if (!documentDetails) return;

    async function loadPdf() {
      try {
        let pdfUrl;
        if (documentDetails.driveFileId) {
          pdfUrl = `${API_URL}document/external/${id}/pdf`;
        } else if (documentDetails.templateId?.file) {
          pdfUrl = `${API_URL}template/external/${id}/pdf`;
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

  const handleInputChange = (index, val) => {
    setValues((prev) => ({ ...prev, [index]: val }));
  };

  const signatureStyles = [
    { id: "style-1", fontFamily: "cursive", fontStyle: "italic", fontWeight: "500" },
    { id: "style-2", fontFamily: "'Brush Script MT', cursive", fontStyle: "italic", fontWeight: "400" },
    { id: "style-3", fontFamily: "'Lucida Handwriting', cursive", fontStyle: "italic", fontWeight: "400" },
    { id: "style-4", fontFamily: "'Segoe Script', cursive", fontStyle: "italic", fontWeight: "500" },
  ];

  const generateTypedSignature = (style) => {
    if (!typedName.trim()) {
      toast.error("Please enter your name first.");
      return;
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 900;
    canvas.height = 250;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#111";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${style.fontStyle || "normal"} ${style.fontWeight || "400"} 82px ${style.fontFamily}`;
    ctx.fillText(typedName.trim(), canvas.width / 2, canvas.height / 2);
    setSelectedSignatureFont(style.fontFamily);
    setTempSignature(canvas.toDataURL("image/png"));
  };

  const openSignatureModal = (widgetIndex) => {
    setActiveSignatureWidget(widgetIndex);
    setTempSignature(values[widgetIndex] || null);
    setSignatureTab("draw");
    setTypedName("");
    setSelectedSignatureFont("cursive");
    setSignatureModalOpen(true);
  };

  const closeSignatureModal = () => {
    setSignatureModalOpen(false);
    setActiveSignatureWidget(null);
    setTempSignature(null);
  };

  const clearDrawSignature = () => {
    modalSignatureCanvasRef.current?.clear();
    setTempSignature(null);
  };

  const saveDrawSignature = () => {
    const canvas = modalSignatureCanvasRef.current;
    if (!canvas || canvas.isEmpty()) {
      setTempSignature(null);
      return;
    }
    setTempSignature(canvas.toDataURL("image/png"));
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      toast.error("Please upload a PNG or JPG signature.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        setTempSignature(canvas.toDataURL("image/png"));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const filledWidgets = widgets.map((w) => ({
        index: w.index,
        widgetname: w.widgetname,
        page: w.page,
        x: w.x,
        y: w.y,
        width: w.width,
        height: w.height,
        value: values[w.index] || "",
      }));

      await axios.post(
        `${API_URL}sign/requestsubmit`,
        {
          sign: id,
          widget: filledWidgets,
          ipv4: "192.168.1.1",
          ipv6: "::1",
        },
        { withCredentials: true }
      );

      toast.success("Document Signed & Submitted!");
      navigate("/documents");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit document.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <DocumentViewerSkeleton />;

  const signees = request?.documentId?.assignedto || [];
  const senderName = request?.senderId?.name || "System Admin";

  return (
    <>
      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>{documentDetails?.title || "Document"}</h1>
          <p className={styles.headerSubtitle}>Sign your pending document</p>
        </header>

        <div className={styles.mainContent}>
          <aside className={styles.leftSidebar}>
            <div className={styles.sidebarTitle}>Preview</div>
            {pages.map((pageNum) => (
              <div
                key={pageNum}
                className={styles.thumbnailCard}
                onClick={() => {
                  document.getElementById(`page-${pageNum}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <ThumbnailRenderer pdfDoc={pdfDoc} pageNum={pageNum} />
                <span className={styles.thumbnailLabel}>Page {pageNum}</span>
              </div>
            ))}
          </aside>

          <main className={styles.centerCanvasArea}>
            {pages.map((pageNum) => (
              <PdfPage 
                key={pageNum}
                pdfDoc={pdfDoc}
                pageNum={pageNum}
                widgets={widgets.filter((w) => w.page === pageNum)}
                values={values}
                handleInputChange={handleInputChange}
                openSignatureModal={openSignatureModal}
              />
            ))}
          </main>

          <aside className={styles.rightSidebar}>
            <div>
              <div className={styles.sectionLabel}>Raised by</div>
              <input type="text" className={styles.raisedByInput} value={senderName} readOnly />
            </div>

            <div>
              <div className={styles.sectionLabel}>Signee</div>
              <div className={styles.signeeList}>
                {signees.map((signee, idx) => (
                  <div key={idx} className={styles.signeeCard}>
                    <div className={styles.signeeAvatar} />
                    <div className={styles.signeeInfo}>
                      <h4 className={styles.signeeName}>{signee.name}</h4>
                      <p className={styles.signeeEmail}>{signee.email}</p>
                    </div>
                    <span className={`${styles.statusBadge} ${request?.overallStatus === 'completed' ? styles.statusCompleted : styles.statusPending}`}>
                      {request?.overallStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.btnPrimary} onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Submitting..." : "Sign & Submit"}
              </button>
              <button className={styles.btnOutline} onClick={() => navigate("/documents")}>
                Deny
              </button>
            </div>
          </aside>
        </div>
      </div>
      
      {signatureModalOpen && (
        <div
          className={styles.signatureModalOverlay}
          onMouseDown={(e) => { if (e.target === e.currentTarget) closeSignatureModal(); }}
        >
          <div className={styles.signatureModal}>
            <div className={styles.signatureModalHeader}>
              <h2>Sign Document</h2>
            </div>
            <div className={styles.signatureTabs}>
              <button className={`${styles.signatureTab} ${signatureTab === "draw" ? styles.signatureTabActive : ""}`} onClick={() => setSignatureTab("draw")}>Draw</button>
              <button className={`${styles.signatureTab} ${signatureTab === "type" ? styles.signatureTabActive : ""}`} onClick={() => setSignatureTab("type")}>Type</button>
              <button className={`${styles.signatureTab} ${signatureTab === "upload" ? styles.signatureTabActive : ""}`} onClick={() => setSignatureTab("upload")}>Upload</button>
            </div>
            <div className={styles.signatureModalContent}>
              {signatureTab === "draw" && (
                <div className={styles.drawSignatureArea}>
                  <SignatureCanvas ref={modalSignatureCanvasRef} penColor="black" canvasProps={{ className: styles.drawCanvas }} onEnd={saveDrawSignature} />
                  <div className={styles.drawHint}>Draw your signature above</div>
                </div>
              )}
              {signatureTab === "type" && (
                <div className={styles.typeSignatureArea}>
                  <input type="text" value={typedName} onChange={(e) => setTypedName(e.target.value)} placeholder="Enter your name" className={styles.signatureNameInput} />
                  <div className={styles.signatureSuggestions}>
                    {signatureStyles.map((style) => (
                      <button key={style.id} className={styles.signatureSuggestion} onClick={() => generateTypedSignature(style)}>
                        <span style={{ fontFamily: style.fontFamily, fontStyle: style.fontStyle, fontWeight: style.fontWeight }}>
                          {typedName || "Your Name"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {signatureTab === "upload" && (
                <div className={styles.uploadSignatureArea} onClick={() => uploadInputRef.current?.click()}>
                  <input ref={uploadInputRef} type="file" accept="image/png,image/jpeg" hidden onChange={handleSignatureUpload} />
                  {tempSignature ? (
                    <img src={tempSignature} alt="Uploaded" className={styles.uploadedSignaturePreview} />
                  ) : (
                    <>
                      <div className={styles.uploadIcon}>↑</div>
                      <div className={styles.uploadText}>Click to upload signature</div>
                      <div className={styles.uploadSubtext}>PNG or JPG</div>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className={styles.signatureModalFooter}>
              <button className={styles.signatureClearButton} onClick={() => { if (signatureTab === "draw") clearDrawSignature(); else setTempSignature(null); }}>Clear</button>
              <button className={styles.signatureApplyButton} disabled={!tempSignature} onClick={() => {
                if (!tempSignature) return toast.error("Please create or upload a signature.");
                setValues((prev) => ({ ...prev, [activeSignatureWidget]: tempSignature }));
                closeSignatureModal();
              }}>Apply Signature</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Render the appropriate overlay based on the state */}
      {overlayType === "consent" && (
        <SignerConsentOverlay 
          onAccept={() => {
            setConsentGiven(true);
            setOverlayType(null);
          }} 
          onDecline={() => navigate("/")} 
        />
      )}
      
      {overlayType === "signed" && (
        <AlreadySignedOverlay 
          onViewDocument={() => setOverlayType(null)} 
          onReturnHome={() => navigate("/")} 
        />
      )}
      
      {overlayType === "revoked" && (
        <RevokedOverlay 
          onReturnHome={() => navigate("/")} 
        />
      )}

    </>
  );
}

// ---------------------------------------------------------
// Sub-Component: Individual PDF Page for Continuous Scroll
// ---------------------------------------------------------
function PdfPage({ pdfDoc, pageNum, widgets, values, handleInputChange, openSignatureModal }) {
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
              <div
                className={styles.signatureWidgetPreview}
                onClick={(e) => { e.stopPropagation(); openSignatureModal(w.index); }}
              >
                {values[w.index] ? (
                  <img src={values[w.index]} alt="Signature" className={styles.signaturePreviewImage} />
                ) : (
                  <span className={styles.signaturePlaceholder}>Click to sign</span>
                )}
              </div>
            ) : (
              <input
                className={styles.widgetInput}
                type={w.widgetname === "date" ? "date" : "text"}
                placeholder={w.widgetname}
                value={values[w.index] || ""}
                onChange={(e) => handleInputChange(w.index, e.target.value)}
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