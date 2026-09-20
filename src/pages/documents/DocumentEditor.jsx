import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { 
  ChevronLeft, 
  Type, 
  Hash, 
  User, 
  PenTool, 
  Mail, 
  Calendar 
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import { TableRowSkeleton } from "../../components/common/Skeleton";

import styles from "./DocumentEditor.module.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Default sizes when dropping a new widget
const DEFAULT_WIDGET_SIZES = {
  text: { width: 140, height: 32 },
  number: { width: 100, height: 32 },
  name: { width: 160, height: 32 },
  signature: { width: 160, height: 48 },
  email: { width: 180, height: 32 },
  date: { width: 120, height: 32 },
};

export default function DocumentEditor({title, file ,signers,currentSigners,expiresIn}) {
  const navigate = useNavigate();
   const location = useLocation();
   const sendingRef = useRef(false);
    const activeTab =
      location.pathname

  // PDF State
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Widget State
  const [widgets, setWidgets] = useState([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [resizingId, setResizingId] = useState(null);

  // Form State
  const [roleInput, setRoleInput] = useState("");
  const [roles, setRoles] = useState([]);

  // Refs for Drag & Drop Math
  const canvasRef = useRef(null);
  const pdfWrapperRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const applicants =
  activeTab === "/sign-yourself"
    ? [
        {
          name: currentSigners?.name || "",
          email: currentSigners?.email || "",
        },
      ]
    : signers;

  // 1. Load PDF from File Prop (or fetch by ID if modifying existing logic)
  useEffect(() => {
    if (!file) return;

    async function loadPdf() {
      setLoading(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const doc = await loadingTask.promise;
        
        setPdfDoc(doc);
        setPages(Array.from({ length: doc.numPages }, (_, i) => i + 1));
        setActivePage(1);
      } catch (error) {
        console.error("Failed to load PDF", error);
        toast.error("Could not read PDF file.");
        toast.error(
    error.response?.data?.message ||
    "Something Went Wrong"
  );
      } finally {
        setLoading(false);
      }
    }
    loadPdf();
  }, [file]);

  // 2. Render Active PDF Page at Fixed Scale
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    async function renderPage() {
      const page = await pdfDoc.getPage(activePage);
      // FIXED SCALE 1.2: This ensures the coordinates saved to DB 
      // perfectly match what the SignViewer expects.
      const viewport = page.getViewport({ scale: 1.2 });
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      // Update wrapper size to perfectly match canvas
      if (pdfWrapperRef.current) {
        pdfWrapperRef.current.style.width = `${viewport.width}px`;
        pdfWrapperRef.current.style.height = `${viewport.height}px`;
      }

      await page.render({ canvasContext: ctx, viewport }).promise;
    }
    renderPage();
  }, [pdfDoc, activePage]);

  // --- Widget Management Methods ---

  const handleAddWidget = (type) => {
    const size = DEFAULT_WIDGET_SIZES[type];
    const newWidget = {
      id: `${type}-${Date.now()}`,
      widgetname: type,
      page: activePage,
      x: 50, // Default drop position
      y: 50,
      width: size.width,
      height: size.height,
    };
    setWidgets((prev) => [...prev, newWidget]);
    setSelectedWidgetId(newWidget.id);
  };

  const handleDeleteWidget = (id) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
    setSelectedWidgetId(null);
  };

  const handleAddRole = () => {
    if (!roleInput.trim()) return;
    setRoles([...roles, roleInput.trim()]);
    setRoleInput("");
  };

  // --- Drag & Drop Logic ---

  const handlePointerDown = (e, widget) => {
    e.stopPropagation();
    setSelectedWidgetId(widget.id);
    
    const wrapperBox = pdfWrapperRef.current.getBoundingClientRect();
    dragOffsetRef.current = {
      x: e.clientX - wrapperBox.left - widget.x,
      y: e.clientY - wrapperBox.top - widget.y,
    };
    setDraggingId(widget.id);
  };

  useEffect(() => {
    if (!draggingId) return;

    const handlePointerMove = (e) => {
      const wrapperBox = pdfWrapperRef.current.getBoundingClientRect();
      let newX = e.clientX - wrapperBox.left - dragOffsetRef.current.x;
      let newY = e.clientY - wrapperBox.top - dragOffsetRef.current.y;

      setWidgets((prev) =>
        prev.map((w) => {
          if (w.id === draggingId) {
            // Constrain to canvas bounds
            return {
              ...w,
              x: Math.max(0, Math.min(newX, wrapperBox.width - w.width)),
              y: Math.max(0, Math.min(newY, wrapperBox.height - w.height)),
            };
          }
          return w;
        })
      );
    };

    const handlePointerUp = () => setDraggingId(null);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [draggingId]);

  // --- Resize Logic ---

  const handleResizeDown = (e, widget) => {
    e.stopPropagation();
    setSelectedWidgetId(widget.id);
    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: widget.width,
      startHeight: widget.height,
    };
    setResizingId(widget.id);
  };

  useEffect(() => {
    if (!resizingId) return;

    const handlePointerMove = (e) => {
      const dx = e.clientX - resizeStartRef.current.startX;
      const dy = e.clientY - resizeStartRef.current.startY;

      setWidgets((prev) =>
        prev.map((w) => {
          if (w.id === resizingId) {
            return {
              ...w,
              width: Math.max(60, resizeStartRef.current.startWidth + dx),
              height: Math.max(30, resizeStartRef.current.startHeight + dy),
            };
          }
          return w;
        })
      );
    };

    const handlePointerUp = () => setResizingId(null);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [resizingId]);

  // --- Submit to Backend ---

      async function getClientIPs() {
  const [ipv4Res, ipv6Res] = await Promise.allSettled([
    fetch("https://api.ipify.org?format=json"),
    fetch("https://api6.ipify.org?format=json"),
  ]);

  const ipv4 =
    ipv4Res.status === "fulfilled"
      ? (await ipv4Res.value.json()).ip
      : null;

  const ipv6 =
    ipv6Res.status === "fulfilled"
      ? (await ipv6Res.value.json()).ip
      : null;

  return { ipv4, ipv6 };
}

  const handleSend = async () => {
     if (sendingRef.current) return;

  sendingRef.current = true;
    try {
       const { ipv4, ipv6 } = await getClientIPs();

     const formData = new FormData();

     if(activeTab === "/sign-yourself"){
      formData.append("file", file);
      formData.append("title", title);
      formData.append("senderip", ipv4);
      formData.append("pathname",activeTab)
      formData.append(
  "documentwidgets",
  JSON.stringify(
    widgets.map((w) => ({
      widgetname: w.widgetname,
      page: w.page,
      x: w.x,
      y: w.y,
      width: w.width,
      height: w.height,
    }))
  )
);
    formData.append("applicants", JSON.stringify(applicants));
     }else{
      formData.append("file", file);
      formData.append("pathname",activeTab)
      formData.append("title", title);
      formData.append("senderip", ipv4);
      formData.append("expiry", expiresIn);
      formData.append(
  "documentwidgets",
  JSON.stringify(
    widgets.map((w) => ({
      widgetname: w.widgetname,
      page: w.page,
      x: w.x,
      y: w.y,
      width: w.width,
      height: w.height,
    }))
  )
);
    formData.append("applicants", JSON.stringify(applicants));
     }
    
        console.log("Submitting FormData:", {
      title,
      file,
      documentwidgets: widgets,
      applicants: signers,
      senderip: ipv4,
      expiry: expiresIn,
    });
      const response = await axios.post(`${API_URL}document/create`, formData, { withCredentials: true });
      
      toast.success("Document and fields saved successfully!");
      if(activeTab === "/sign-yourself"){
        navigate(`/document/${response.data.message}`);
      }else{
        navigate("/documents");
      }
      
    } catch (error) {
      console.error(error);
       toast.error(
      error?.response?.data?.message || "Failed to send document.")
    } finally {
       sendingRef.current = false;
    setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* HEADER */}
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ChevronLeft size={24} strokeWidth={2.5} />
          {title}
        </button>
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
        <main 
          className={styles.centerCanvasArea} 
          onPointerDown={() => setSelectedWidgetId(null)}
        >
          <div className={styles.pdfWrapper} ref={pdfWrapperRef}>
            <canvas ref={canvasRef} className={styles.pdfCanvas} />

            {/* Render Widgets */}
            {widgets
              .filter((w) => w.page === activePage)
              .map((w) => (
                <div
                  key={w.id}
                  className={`${styles.placedWidget} ${selectedWidgetId === w.id ? styles.placedWidgetSelected : ""}`}
                  style={{
                    left: `${w.x}px`,
                    top: `${w.y}px`,
                    width: `${w.width}px`,
                    height: `${w.height}px`,
                  }}
                  onPointerDown={(e) => handlePointerDown(e, w)}
                >
                  <span className={styles.widgetLabel}>
                    {w.widgetname.charAt(0).toUpperCase() + w.widgetname.slice(1)}
                  </span>

                  {selectedWidgetId === w.id && (
                    <>
                      <div className={styles.widgetToolbar} onPointerDown={(e) => e.stopPropagation()}>
                        <button className={styles.deleteBtn} onClick={() => handleDeleteWidget(w.id)}>
                          Delete
                        </button>
                      </div>
                      <div 
                        className={styles.resizeHandle} 
                        onPointerDown={(e) => handleResizeDown(e, w)} 
                      />
                    </>
                  )}
                </div>
              ))}
          </div>
        </main>

        {/* RIGHT SIDEBAR: Tools */}
        <aside className={styles.rightSidebar}>
          {/* <div>
            <div className={styles.sectionLabel}>Roles</div>
            <input 
              type="text" 
              className={styles.roleInput} 
              placeholder="Name" 
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
            />
            <button className={styles.addRoleBtn} onClick={handleAddRole}>
              Add Role
            </button>
          </div> */}

          <div>
            <div className={styles.sectionLabel}>Widgets</div>
            <div className={styles.widgetsGrid}>
              <button className={styles.widgetBtn} onClick={() => handleAddWidget("text")}>
                <Type size={22} strokeWidth={1.5} />
                <span className={styles.widgetBtnText}>Text</span>
              </button>
              <button className={styles.widgetBtn} onClick={() => handleAddWidget("number")}>
                <Hash size={22} strokeWidth={1.5} />
                <span className={styles.widgetBtnText}>Number</span>
              </button>
              <button className={styles.widgetBtn} onClick={() => handleAddWidget("name")}>
                <User size={22} strokeWidth={1.5} />
                <span className={styles.widgetBtnText}>Name</span>
              </button>
              <button className={styles.widgetBtn} onClick={() => handleAddWidget("signature")}>
                <PenTool size={22} strokeWidth={1.5} />
                <span className={styles.widgetBtnText}>Signature</span>
              </button>
              <button className={styles.widgetBtn} onClick={() => handleAddWidget("email")}>
                <Mail size={22} strokeWidth={1.5} />
                <span className={styles.widgetBtnText}>Email</span>
              </button>
              <button className={styles.widgetBtn} onClick={() => handleAddWidget("date")}>
                <Calendar size={22} strokeWidth={1.5} />
                <span className={styles.widgetBtnText}>Date</span>
              </button>
            </div>
          </div>

          <button 
              className={styles.sendBtn} 
              onClick={handleSend}
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
            {loading ? "Saving..." : activeTab === "/sign-yourself" ? "Save" : "Send"}
          </button>
        </aside>
      </div>


    </div>
  );
}

// Helper to render thumbnails
function ThumbnailRenderer({ pdfDoc, pageNum }) {
  const thumbRef = useRef(null);

  useEffect(() => {
    if (!pdfDoc || !thumbRef.current) return;
    async function renderThumb() {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 0.25 });
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