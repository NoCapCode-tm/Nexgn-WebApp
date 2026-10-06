import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { Rnd } from "react-rnd";
import { 
  ChevronLeft, Type, Hash, User, PenTool, Mail, Calendar,
  Trash2, Copy, ZoomIn, ZoomOut, RotateCw, X
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

import styles from "./DocumentEditor.module.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const DEFAULT_WIDGET_SIZES = {
  text: { width: 140, height: 32 },
  number: { width: 100, height: 32 },
  name: { width: 160, height: 32 },
  signature: { width: 160, height: 48 },
  email: { width: 180, height: 32 },
  date: { width: 120, height: 32 },
};

export default function DocumentEditor({ title, file, signers, currentSigners, expiresIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const sendingRef = useRef(false);
  const activeTab = location.pathname;

  // PDF & View State
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Widget State
  const [widgets, setWidgets] = useState([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);

  // Modal State
  const [duplicateModalWidget, setDuplicateModalWidget] = useState(null);
  const [duplicateOption, setDuplicateOption] = useState("all");

  const canvasRef = useRef(null);
  const pdfWrapperRef = useRef(null);

  const applicants = activeTab === "/sign-yourself"
    ? [{ name: currentSigners?.name || "", email: currentSigners?.email || "" }]
    : signers;

  // 1. Load PDF Document
  useEffect(() => {
    if (!file) return;
    async function loadPdf() {
      setLoading(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        setPdfDoc(doc);
        setPages(Array.from({ length: doc.numPages }, (_, i) => i + 1));
        setActivePage(1);
      } catch (error) {
        toast.error("Could not read PDF file.");
      } finally {
        setLoading(false);
      }
    }
    loadPdf();
  }, [file]);

  // 2. Render PDF Page
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    async function renderPage() {
      const page = await pdfDoc.getPage(activePage);
      const viewport = page.getViewport({ scale: 1.2, rotation });
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      if (pdfWrapperRef.current) {
        pdfWrapperRef.current.style.width = `${viewport.width}px`;
        pdfWrapperRef.current.style.height = `${viewport.height}px`;
      }
      await page.render({ canvasContext: ctx, viewport }).promise;
    }
    renderPage();
  }, [pdfDoc, activePage, rotation]);

  // --- HTML5 Drag & Drop Logistics ---
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("widgetType", type);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("widgetType");
    if (!type || !DEFAULT_WIDGET_SIZES[type]) return;

    // Calculate drop coordinates relative to the PDF wrapper, adjusting for zoom
    const wrapperRect = pdfWrapperRef.current.getBoundingClientRect();
    const x = (e.clientX - wrapperRect.left) / zoom;
    const y = (e.clientY - wrapperRect.top) / zoom;

    const size = DEFAULT_WIDGET_SIZES[type];
    
    // Center the widget on the mouse drop point
    const newWidget = {
      id: `${type}-${Date.now()}`,
      widgetname: type,
      page: activePage,
      x: Math.max(0, x - size.width / 2),
      y: Math.max(0, y - size.height / 2),
      width: size.width,
      height: size.height,
    };
    
    setWidgets((prev) => [...prev, newWidget]);
    setSelectedWidgetId(newWidget.id);
  };

  // Fallback for just clicking the sidebar buttons instead of dragging
  const handleAddWidgetClick = (type) => {
    const size = DEFAULT_WIDGET_SIZES[type];
    const newWidget = {
      id: `${type}-${Date.now()}`,
      widgetname: type,
      page: activePage,
      x: 100, 
      y: 100,
      width: size.width,
      height: size.height,
    };
    setWidgets((prev) => [...prev, newWidget]);
    setSelectedWidgetId(newWidget.id);
  };

  const updateWidget = (id, newProps) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, ...newProps } : w));
  };

  const handleDeleteWidget = (idToRemove) => {
    setWidgets((prev) => prev.filter((w) => w.id !== idToRemove));
    setSelectedWidgetId(null);
  };

  // --- Duplication Logic ---
  const handleDuplicate = () => {
    const sourceWidget = widgets.find(w => w.id === duplicateModalWidget);
    if (!sourceWidget) return;

    let targetPages = [];
    if (duplicateOption === "all") targetPages = pages;
    if (duplicateOption === "all-but-last") targetPages = pages.slice(0, -1);
    if (duplicateOption === "all-but-first") targetPages = pages.slice(1);
    if (duplicateOption === "next") targetPages = [Math.min(pages.length, sourceWidget.page + 1)];

    const newWidgets = targetPages
      .filter(p => p !== sourceWidget.page)
      .map(p => ({
        ...sourceWidget,
        id: `${sourceWidget.widgetname}-${Date.now()}-${p}`,
        page: p
      }));
    
    setWidgets([...widgets, ...newWidgets]);
    setDuplicateModalWidget(null);
    toast.success(`Widget copied to ${newWidgets.length} page(s)`);
  };

  // --- Network Submission ---
  async function getClientIPs() {
    const [ipv4Res, ipv6Res] = await Promise.allSettled([
      fetch("https://api.ipify.org?format=json"),
      fetch("https://api6.ipify.org?format=json"),
    ]);

    const ipv4 = ipv4Res.status === "fulfilled" ? (await ipv4Res.value.json()).ip : null;
    const ipv6 = ipv6Res.status === "fulfilled" ? (await ipv6Res.value.json()).ip : null;
    return { ipv4, ipv6 };
  }

  const handleSend = async () => {
    if (sendingRef.current) return;
    sendingRef.current = true;
    setLoading(true);
    
    try {
      const { ipv4 } = await getClientIPs();
      const formData = new FormData();
      
      formData.append("file", file);
      formData.append("title", title);
      formData.append("senderip", ipv4);
      formData.append("pathname", activeTab);
      formData.append("documentwidgets", JSON.stringify(widgets));
      formData.append("applicants", JSON.stringify(applicants));
      
      if(activeTab !== "/sign-yourself") formData.append("expiry", expiresIn);

      const response = await axios.post(`${API_URL}document/create`, formData, { withCredentials: true });
      toast.success("Document saved successfully!");
      navigate(activeTab === "/sign-yourself" ? `/document/${response.data.message}` : "/documents");
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send document.");
    } finally {
      sendingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ChevronLeft size={24} strokeWidth={2.5} />
          {title}
        </button>
      </header>

      <div className={styles.mainContent}>
        
        {/* LEFT SIDEBAR: Thumbnails */}
        <aside className={styles.leftSidebar}>
          <div className={styles.sidebarTitle}>Pages</div>
          {pages.map((pageNum) => (
            <div
              key={pageNum}
              className={`${styles.thumbnailCard} ${activePage === pageNum ? styles.thumbnailCardActive : ""}`}
              onClick={() => setActivePage(pageNum)}
            >
              <ThumbnailRenderer pdfDoc={pdfDoc} pageNum={pageNum} />
              <span className={styles.thumbnailLabel}>{pageNum} of {pages.length}</span>
            </div>
          ))}
        </aside>

        {/* CENTER: Canvas & Toolbars */}
        <main className={styles.centerCanvasArea} onPointerDown={() => setSelectedWidgetId(null)}>
          
          {/* FLOATING ACTION TOOLBAR (Zoom & Rotate) */}
          <div className={styles.floatingToolbar}>
            <button title="Zoom In" onClick={() => setZoom(z => Math.min(2, z + 0.1))}>
              <ZoomIn size={20} />
            </button>
            <button title="Zoom Out" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}>
              <ZoomOut size={20} />
            </button>
            <div className={styles.toolbarDivider} />
            <button title="Rotate Page" onClick={() => setRotation(r => (r + 90) % 360)}>
              <RotateCw size={20} />
            </button>
          </div>

          <div 
            className={styles.pdfZoomWrapper} 
            style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
          >
            <div 
              className={styles.pdfWrapper} 
              ref={pdfWrapperRef}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <canvas ref={canvasRef} className={styles.pdfCanvas} />

              {/* RND WIDGETS */}
              {widgets.filter((w) => w.page === activePage).map((w) => (
                <Rnd
                  key={w.id}
                  scale={zoom}
                  size={{ width: w.width, height: w.height }}
                  position={{ x: w.x, y: w.y }}
                  onDragStart={(e) => { e.stopPropagation(); setSelectedWidgetId(w.id); }}
                  onDragStop={(e, d) => updateWidget(w.id, { x: d.x, y: d.y })}
                  onResizeStart={(e) => { e.stopPropagation(); setSelectedWidgetId(w.id); }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    updateWidget(w.id, {
                      width: parseInt(ref.style.width, 10),
                      height: parseInt(ref.style.height, 10),
                      ...position,
                    });
                  }}
                  bounds="parent"
                  className={`${styles.placedWidget} ${selectedWidgetId === w.id ? styles.placedWidgetSelected : ""}`}
                >
                  <span className={styles.widgetLabel}>
                    {w.widgetname.charAt(0).toUpperCase() + w.widgetname.slice(1)}
                  </span>

                  {/* WIDGET MINI-TOOLBAR (Visible only when selected) */}
                  {selectedWidgetId === w.id && (
                    <div 
                      className={styles.widgetMiniToolbar} 
                      onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when clicking buttons
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <button 
                        title="Duplicate Widget" 
                        onClick={() => setDuplicateModalWidget(w.id)}
                      >
                        <Copy size={14} />
                      </button>
                      <button 
                        className={styles.deleteBtn} 
                        title="Delete Widget" 
                        onClick={() => handleDeleteWidget(w.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </Rnd>
              ))}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR: Tools */}
        <aside className={styles.rightSidebar}>
          <div>
            <div className={styles.sectionLabel}>Widgets</div>
            <p style={{fontSize: '12px', color: '#6B7280', margin: '0 0 16px 0'}}>Drag and drop onto the document</p>
            
            <div className={styles.widgetsGrid}>
              <div draggable onDragStart={(e) => handleDragStart(e, "signature")} className={styles.widgetBtn} onClick={() => handleAddWidgetClick("signature")}><PenTool size={22} /><span className={styles.widgetBtnText}>Signature</span></div>
              <div draggable onDragStart={(e) => handleDragStart(e, "text")} className={styles.widgetBtn} onClick={() => handleAddWidgetClick("text")}><Type size={22} /><span className={styles.widgetBtnText}>Text</span></div>
              <div draggable onDragStart={(e) => handleDragStart(e, "name")} className={styles.widgetBtn} onClick={() => handleAddWidgetClick("name")}><User size={22} /><span className={styles.widgetBtnText}>Name</span></div>
              <div draggable onDragStart={(e) => handleDragStart(e, "email")} className={styles.widgetBtn} onClick={() => handleAddWidgetClick("email")}><Mail size={22} /><span className={styles.widgetBtnText}>Email</span></div>
              <div draggable onDragStart={(e) => handleDragStart(e, "date")} className={styles.widgetBtn} onClick={() => handleAddWidgetClick("date")}><Calendar size={22} /><span className={styles.widgetBtnText}>Date</span></div>
              <div draggable onDragStart={(e) => handleDragStart(e, "number")} className={styles.widgetBtn} onClick={() => handleAddWidgetClick("number")}><Hash size={22} /><span className={styles.widgetBtnText}>Number</span></div>
            </div>
          </div>

          <button className={styles.sendBtn} onClick={handleSend} disabled={loading}>
            {loading ? "Saving..." : activeTab === "/sign-yourself" ? "Save" : "Send"}
          </button>
        </aside>
      </div>

      {/* DUPLICATE MODAL */}
      {duplicateModalWidget && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Copy widget to</h3>
              <button onClick={() => setDuplicateModalWidget(null)}><X size={20} /></button>
            </div>
            <div className={styles.modalBody}>
              <label className={styles.radioLabel}>
                <input type="radio" name="duplicate" checked={duplicateOption === "all"} onChange={() => setDuplicateOption("all")} /> All pages
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="duplicate" checked={duplicateOption === "all-but-last"} onChange={() => setDuplicateOption("all-but-last")} /> All pages but last
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="duplicate" checked={duplicateOption === "all-but-first"} onChange={() => setDuplicateOption("all-but-first")} /> All pages but first
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="duplicate" checked={duplicateOption === "next"} onChange={() => setDuplicateOption("next")} /> Next to current widget
              </label>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnPrimary} onClick={handleDuplicate}>Apply</button>
              <button className={styles.btnGhost} onClick={() => setDuplicateModalWidget(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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