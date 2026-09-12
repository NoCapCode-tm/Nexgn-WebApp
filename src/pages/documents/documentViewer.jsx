import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
// import SignatureCanvas from "react-signature-canvas";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

import styles from "./SignViewer.module.css";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function DocumentViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Core Data State
  const [request, setRequest] = useState(null);
  const [documentDetails, setDocumentDetails] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const [values, setValues] = useState({});

  // PDF Rendering State
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [baseDimensions, setBaseDimensions] = useState({ width: 1, height: 1 });

  // UI State
  const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

  const canvasRef = useRef(null);
//   const sigCanvasRefs = useRef({});
//   const [signatureModalOpen, setSignatureModalOpen] = useState(false);
// const [activeSignatureWidget, setActiveSignatureWidget] = useState(null);

// const [signatureTab, setSignatureTab] = useState("draw");

// const [typedName, setTypedName] = useState("");
// const [selectedSignatureFont, setSelectedSignatureFont] = useState(
//   "cursive"
// );

// const [tempSignature, setTempSignature] = useState(null);

// const modalSignatureCanvasRef = useRef(null);
// const uploadInputRef = useRef(null);

  // 1. Fetch Document and Signature Request Data
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Fetch the signature request
        const reqRes = await axios.get(`${API_URL}sign/getrequests`, {
          withCredentials: true,
        });
        const reqData = reqRes.data.message.filter((s)=>s?.documentId === id);
        setRequest(reqData);

        // if (reqData.status === "completed") {
        //   toast.info("This document is already completed.");
        // }

        // Fetch the document and its placed widgets
        const widgetRes = await axios.get(`${API_URL}document/widgets/${id}`, {
          withCredentials: true,
        });
        
        const widgetData = widgetRes.data.message;
        setDocumentDetails(widgetData.document);
        setWidgets(widgetData.widgets || []);
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
        pdfUrl = `${API_URL}document/${documentDetails._id}/pdf`;
      } else if (documentDetails.templateId?.file) {
        pdfUrl =
          `${API_URL}template/template/${documentDetails.templateId._id}/pdf`;
      } else {
        console.error("No PDF source:", documentDetails);
        return;
      }

      console.log("PDF URL:", pdfUrl);

      const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
        withCredentials: true,
      });

      const pdf = await loadingTask.promise;

      console.log("PDF successfully loaded:", pdf);

      setPdfDoc(pdf);
      setPages(
        Array.from(
          { length: pdf.numPages },
          (_, i) => i + 1
        )
      );

    } catch (err) {
      console.error("PDF Loading Error:", err);
      toast.error("Failed to load PDF.");
    }
  }

  loadPdf();
}, [documentDetails]);
 
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    async function renderPage() {
      const page = await pdfDoc.getPage(activePage);
      
      // Calculate based on the original scale (1.2) used in TemplateEditor
      const originalViewport = page.getViewport({ scale: 1.2 });
      
      // Save these original dimensions to calculate percentages later
      setBaseDimensions({
        width: originalViewport.width,
        height: originalViewport.height,
      });

      // Render the actual canvas at a high resolution for crispness
      // CSS will scale it down to fit the screen
      const viewport = page.getViewport({ scale: 1.5 }); 
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      await page.render({ canvasContext: ctx, viewport }).promise;
    }
    renderPage();
  }, [pdfDoc, activePage]);

  // Value Handlers
//   const handleInputChange = (index, val) => {
//     setValues((prev) => ({ ...prev, [index]: val }));
//   };

//   const handleSignatureEnd = (index) => {
//     const canvas = sigCanvasRefs.current[index];
//     if (!canvas || canvas.isEmpty()) return;
//     setValues((prev) => ({ ...prev, [index]: canvas.toDataURL("image/png") }));
//   };
//   const signatureStyles = [
//   {
//     id: "style-1",
//     fontFamily: "cursive",
//     fontStyle: "italic",
//     fontWeight: "500",
//   },
//   {
//     id: "style-2",
//     fontFamily: "'Brush Script MT', cursive",
//     fontStyle: "italic",
//     fontWeight: "400",
//   },
//   {
//     id: "style-3",
//     fontFamily: "'Lucida Handwriting', cursive",
//     fontStyle: "italic",
//     fontWeight: "400",
//   },
//   {
//     id: "style-4",
//     fontFamily: "'Segoe Script', cursive",
//     fontStyle: "italic",
//     fontWeight: "500",
//   },
// ];
// const generateTypedSignature = (style) => {
//   if (!typedName.trim()) {
//     toast.error("Please enter your name first.");
//     return;
//   }

//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   canvas.width = 900;
//   canvas.height = 250;

//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   ctx.fillStyle = "#111";
//   ctx.textAlign = "center";
//   ctx.textBaseline = "middle";

//   ctx.font = `${style.fontStyle || "normal"} ${style.fontWeight || "400"} 82px ${
//     style.fontFamily
//   }`;

//   ctx.fillText(
//     typedName.trim(),
//     canvas.width / 2,
//     canvas.height / 2
//   );

//   setSelectedSignatureFont(style.fontFamily);
//   setTempSignature(canvas.toDataURL("image/png"));
// };
//   const openSignatureModal = (widgetIndex) => {
//   const existingValue = values[widgetIndex] || "";

//   setActiveSignatureWidget(widgetIndex);
//   setTempSignature(existingValue || null);

//   setSignatureTab("draw");
//   setTypedName("");
//   setSelectedSignatureFont("cursive");

//   setSignatureModalOpen(true);
// };

// const closeSignatureModal = () => {
//   setSignatureModalOpen(false);
//   setActiveSignatureWidget(null);
//   setTempSignature(null);
// };

// const clearDrawSignature = () => {
//   modalSignatureCanvasRef.current?.clear();
//   setTempSignature(null);
// };

// const saveDrawSignature = () => {
//   const canvas = modalSignatureCanvasRef.current;

//   if (!canvas || canvas.isEmpty()) {
//     setTempSignature(null);
//     return;
//   }

//   const dataUrl = canvas.toDataURL("image/png");
//   setTempSignature(dataUrl);
// };

// const handleSignatureUpload = (e) => {
//   const file = e.target.files?.[0];

//   if (!file) return;

//   if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
//     toast.error("Please upload a PNG or JPG signature.");
//     return;
//   }

//   const reader = new FileReader();

//   reader.onload = () => {
//     const img = new Image();

//     img.onload = () => {
//       const canvas = document.createElement("canvas");

//       canvas.width = img.width;
//       canvas.height = img.height;

//       const ctx = canvas.getContext("2d");

//       ctx.clearRect(
//         0,
//         0,
//         canvas.width,
//         canvas.height
//       );

//       ctx.drawImage(
//         img,
//         0,
//         0,
//         img.width,
//         img.height
//       );

//       // ALWAYS convert uploaded signatures to PNG
//       const pngDataUrl = canvas.toDataURL("image/png");

//       setTempSignature(pngDataUrl);
//     };

//     img.onerror = () => {
//       toast.error("Unable to read signature image.");
//     };

//     img.src = reader.result;
//   };

//   reader.readAsDataURL(file);
// };

  // Submit Handler
//   const handleSubmit = async () => {
//     setSubmitting(true);
//     try {
//       const filledWidgets = widgets.map((w, i) => ({
//         index: i,
//         widgetname: w.widgetname,
//         page: w.page,
//         x: w.x,
//         y: w.y,
//         width: w.width,
//         height: w.height,
//         value: values[i] || "",
//       }));

//       // In production, fetch actual IP. Mocking here to satisfy schema requirements
//       await axios.post(
//         `${API_URL}sign/requestsubmit`,
//         {
//           sign: id,
//           widget: filledWidgets,
//           ipv4: "192.168.1.1",
//           ipv6: "::1",
//         },
//         { withCredentials: true }
//       );

//       toast.success("Document Signed & Submitted!");
//       navigate("/documents");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to submit document.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

  if (loading) {
    return (
      <div className={styles.pageWrapper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#6b7280' }}>
        <h3>Loading Document...</h3>
      </div>
    );
  }

  // Mocks for Sidebar data (Map this to actual `request.recipient` data in production)
  const signees = documentDetails?.assignedto || [];
  const senderName = documentDetails?.createdBy?.name || "System Admin";

  return (
    <>
    <div className={styles.pageWrapper}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>{documentDetails?.title || "Document"}</h1>
        <p className={styles.headerSubtitle}>Sign your pending document</p>
      </header>

      <div className={styles.mainContent}>
        {/* Left Sidebar: Thumbnails */}
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

        {/* Center: Active PDF Canvas */}
        <main className={styles.centerCanvasArea}>
          <div className={styles.pdfWrapper}>
            <canvas ref={canvasRef} className={styles.pdfCanvas} />

            {/* Render Widgets dynamically over the PDF using Percentages */}
            {widgets
              .map((w, index) => ({ ...w, index }))
              .filter((w) => w.page === activePage)
              .map((w) => {
                // FLUID MATH: Convert raw X/Y pixels to CSS percentages based on original canvas
                const leftPercent = (w.x / baseDimensions.width) * 100;
                const topPercent = (w.y / baseDimensions.height) * 100;
                const widthPercent = (w.width / baseDimensions.width) * 100;
                const heightPercent = (w.height / baseDimensions.height) * 100;

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
    className={styles.signatureWidgetPreview1}
  >
    {/* {values[w.index] ? (
      <img
        src={values[w.index]}
        alt="Signature"
        className={styles.signaturePreviewImage}
      />
    ) : (
      <span className={styles.signaturePlaceholder}>
        Click to sign
      </span>
    )} */}
  </div>
) : (
                      <input
                        className={styles.widgetInput}
                        type={w.widgetname === "date" ? "date" : "text"}
                        placeholder={w.widgetname}
                        value={values[w.index] || ""}
                        // onChange={(e) => handleInputChange(w.index, e.target.value)}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </main>

        {/* Right Sidebar: Actions */}
        <aside className={styles.rightSidebar}>
          <div>
            <div className={styles.sectionLabel}>Raised by</div>
            <input 
              type="text" 
              className={styles.raisedByInput} 
              value={senderName} 
              readOnly 
            />
          </div>

          <div>
            <div className={styles.sectionLabel}>Signee</div>
            <div className={styles.signeeList}>
              {request.map((signee, idx) => (
                <div key={idx} className={styles.signeeCard}>
                  <div className={styles.signeeAvatar} />
                  <div className={styles.signeeInfo}>
                    <h4 className={styles.signeeName}>{signee?.recipient?.userId?.name}</h4>
                    <p className={styles.signeeEmail}>{signee?.recipient?.userId?.email}</p>
                  </div>
                  <span className={`${styles.statusBadge} ${signee?.overallStatus === 'completed' ? styles.statusCompleted : styles.statusPending}`}>
                    {signee?.overallStatus}-{signee?.viewcount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.actionButtons}>
            {/* <button 
              className={styles.btnPrimary} 
            //   onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Sign & Submit"}
            </button> */}
            <button 
              className={styles.btnOutline}
              onClick={() => navigate("/documents")}
            >
              Back
            </button>
          </div>
        </aside>
      </div>
    </div>
    </>

    
  );
}

// Helper Component to render thumbnails efficiently
function ThumbnailRenderer({ pdfDoc, pageNum }) {
  const thumbRef = useRef(null);

  useEffect(() => {
    if (!pdfDoc || !thumbRef.current) return;
    async function renderThumb() {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 0.3 }); // Small scale for thumbnail
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