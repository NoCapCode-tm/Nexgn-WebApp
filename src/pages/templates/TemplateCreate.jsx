import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import {
  Type,
  Hash,
  User,
  PenTool,
  Mail,
  Calendar,
  X
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import LoadingScreen from "../../components/Layout/LoadingScreen";

import styles from "./TemplateCreate.module.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const DEFAULT_WIDGET_SIZES = {
  text: { width: 140, height: 32 },
  number: { width: 100, height: 32 },
  name: { width: 160, height: 32 },
  signature: { width: 160, height: 48 },
  email: { width: 180, height: 32 },
  date: { width: 120, height: 32 },
};

export default function TemplateCreate({ templateName, templateFile, onBack }) {
  const navigate = useNavigate();

  // PDF & Page State
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Widget & Role State
  const [widgets, setWidgets] = useState([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [resizingId, setResizingId] = useState(null);
  const [roleInput, setRoleInput] = useState("");
  const [roles, setRoles] = useState([]);

  // Math & Render Refs
  const canvasRef = useRef(null);
  const pdfWrapperRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ startX: 0, startY: 0, startWidth: 0, startHeight: 0 });

  // 1. Load PDF Binary File
  useEffect(() => {
    if (!templateFile) return;

    let cancelled = false;
    async function loadPdf() {
      setLoading(true);
      try {
        const arrayBuffer = await templateFile.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const doc = await loadingTask.promise;

        if (cancelled) return;
        setPdfDoc(doc);
        setPages(Array.from({ length: doc.numPages }, (_, i) => i + 1));
        setActivePage(1);
      } catch (err) {
        console.error("PDF Parsing error:", err);
        toast.error("Failed to load PDF document.");
      } finally {
        setLoading(false);
      }
    }

    loadPdf();
    return () => {
      cancelled = true;
    };
  }, [templateFile]);

  // 2. Render Page with fixed scale (1.2) for cross-platform coordinate alignment
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let cancelled = false;
    async function renderPage() {
      const page = await pdfDoc.getPage(activePage);
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

  // --- Widget Creation & Modification Handlers ---

  const handleAddWidget = (type) => {
    const size = DEFAULT_WIDGET_SIZES[type];
    const newWidget = {
      id: `${type}-${Date.now()}`,
      widgetname: type,
      page: activePage,
      x: 40,
      y: 40,
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
    const trimmed = roleInput.trim();
    if (trimmed && !roles.includes(trimmed)) {
      setRoles((prev) => [...prev, trimmed]);
      setRoleInput("");
    }
  };

  const handleRemoveRole = (roleToRemove) => {
    setRoles((prev) => prev.filter((r) => r !== roleToRemove));
  };

  // --- Pointer & Drag Handlers ---

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
      const newX = e.clientX - wrapperBox.left - dragOffsetRef.current.x;
      const newY = e.clientY - wrapperBox.top - dragOffsetRef.current.y;

      setWidgets((prev) =>
        prev.map((w) => {
          if (w.id === draggingId) {
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

  // --- Resize Handlers ---

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
              height: Math.max(28, resizeStartRef.current.startHeight + dy),
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

  // --- Create / Save Template ---

  const handleSaveTemplate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", templateName || "Untitled Template");
      formData.append("role", roles.length > 0 ? roles.join(", ") : "Signer");

      const formattedWidgets = widgets.map(
        ({ widgetname, page, x, y, width, height }) => ({
          widgetname,
          page,
          x,
          y,
          width,
          height,
        })
      );
      formData.append("widget", JSON.stringify(formattedWidgets));

      if (templateFile) {
        formData.append("file", templateFile);
      }

      await axios.post(`${API_URL}template/create`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Template created successfully!");
      if (onBack) {
        onBack();
      } else {
        navigate("/templates");
      }
    } catch (error) {
      console.error("Template creation failed:", error);
      toast.error(error.response?.data?.message || "Failed to create template.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <h1 className={styles.headerTitle}>{templateName || "Title"}</h1>
          <p className={styles.headerSubtitle}>Sign your pending document</p>
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
        <main
          className={styles.centerCanvasArea}
          onPointerDown={() => setSelectedWidgetId(null)}
        >
          <div className={styles.pdfWrapper} ref={pdfWrapperRef}>
            <canvas ref={canvasRef} className={styles.pdfCanvas} />

            {/* Placed Widgets on Active Page */}
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
                      <div
                        className={styles.widgetToolbar}
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDeleteWidget(w.id)}
                        >
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

        {/* RIGHT SIDEBAR: Roles and Widgets */}
        <aside className={styles.rightSidebar}>
          <div>
            <div className={styles.sectionLabel}>Roles</div>
            {roles.length > 0 && (
              <div className={styles.roleBadges}>
                {roles.map((r, i) => (
                  <span key={i} className={styles.roleBadge}>
                    {r}
                    <button
                      className={styles.removeRoleBtn}
                      onClick={() => handleRemoveRole(r)}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <input
              type="text"
              className={styles.roleInput}
              placeholder="Name"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddRole()}
            />
            <button className={styles.addRoleBtn} onClick={handleAddRole}>
              Add Role
            </button>
          </div>

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

          <button className={styles.sendBtn} onClick={handleSaveTemplate}>
            Send
          </button>
        </aside>
      </div>

      {loading && <LoadingScreen message="Processing Template..." />}
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