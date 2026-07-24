import { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../css/BaseLayout.css";
import "../css/TemplateEditor.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Register custom font + size formats once at module load
// (matches the classes styled in TemplateEditor.css: ql-font-inter, ql-font-outfit, etc.)
const Font = Quill.import("formats/font");
Font.whitelist = ["inter", "outfit", "serif", "monospace"];
Quill.register(Font, true);

const Size = Quill.import("formats/size");
Size.whitelist = ["small", "normal", "large", "huge"];
Quill.register(Size, true);

const WIDGETS = [
  { id: "text", label: "Text", icon: "Aa" },
  { id: "number", label: "Number", icon: "123" },
  { id: "name", label: "Name", icon: "ID" },
  { id: "signature", label: "Signature", icon: "sig" },
  { id: "email", label: "Email", icon: "@" },
  { id: "date", label: "Date", icon: "date" },
];

const TEXT_ICON_SVG = (
  <svg
    width="26"
    height="14"
    viewBox="28 22 30 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30.793 35.6668L35.5051 24.3618C35.5494 24.2555 35.6242 24.1647 35.72 24.1009C35.8158 24.037 35.9284 24.0029 36.0436 24.0029C36.1587 24.0029 36.2713 24.037 36.3671 24.1009C36.4629 24.1647 36.5377 24.2555 36.582 24.3618L41.293 35.6668"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M54.1289 27.5V35.6667"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32.3164 32.1665H39.7737"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M50.0443 35.6667C52.2994 35.6667 54.1276 33.8385 54.1276 31.5833C54.1276 29.3282 52.2994 27.5 50.0443 27.5C47.7891 27.5 45.9609 29.3282 45.9609 31.5833C45.9609 33.8385 47.7891 35.6667 50.0443 35.6667Z"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NUMBER_ICON_SVG = (
  <svg
    width="26"
    height="18"
    viewBox="19 21 46 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M41.3242 24.2759H52.9909"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M41.3242 32.4424H52.9909"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M41.3242 40.6089H52.9909"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33.1602 23.1089H34.3268V28.9422"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33.1602 28.9424H35.4935"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M36.0737 41.7759H32.457C32.457 40.6093 35.4904 39.5301 35.4904 37.6926C35.4904 37.3408 35.3844 36.9972 35.1863 36.7066C34.9881 36.4159 34.707 36.1917 34.3795 36.0633C34.052 35.9348 33.6934 35.908 33.3505 35.9864C33.0075 36.0647 32.6962 36.2446 32.457 36.5026"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NAME_ICON_SVG = (
  <svg
    width="26"
    height="18"
    viewBox="28 20 27 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44.2422 27.7759H40.7422"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M45.9909 20.7759L44.8242 23.1092H48.3242C48.9431 23.1092 49.5365 23.355 49.9741 23.7926C50.4117 24.2302 50.6576 24.8237 50.6576 25.4425V41.7759C50.6576 42.3947 50.4117 42.9882 49.9741 43.4258C49.5365 43.8634 48.9431 44.1092 48.3242 44.1092H36.6576C36.0387 44.1092 35.4452 43.8634 35.0076 43.4258C34.5701 42.9882 34.3242 42.3947 34.3242 41.7759V25.4425C34.3242 24.8237 34.5701 24.2302 35.0076 23.7926C35.4452 23.355 36.0387 23.1092 36.6576 23.1092H40.1576"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M48.2095 44.1091C47.9412 42.7911 47.2256 41.6062 46.1839 40.7553C45.1423 39.9043 43.8385 39.4395 42.4934 39.4395C41.1483 39.4395 39.8446 39.9043 38.8029 40.7553C37.7613 41.6062 37.0457 42.7911 36.7773 44.1091"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38.9922 20.7759L42.4922 27.7759"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M42.4922 39.4424C44.4252 39.4424 45.9922 37.8754 45.9922 35.9424C45.9922 34.0094 44.4252 32.4424 42.4922 32.4424C40.5592 32.4424 38.9922 34.0094 38.9922 35.9424C38.9922 37.8754 40.5592 39.4424 42.4922 39.4424Z"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SIGNATURE_ICON_SVG = (
  <svg
    width="26"
    height="14"
    viewBox="17 20 51 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M46.8181 43.2844C46.5994 43.5031 46.3027 43.626 45.9933 43.626C45.684 43.626 45.3873 43.5031 45.1685 43.2844L43.3181 41.434C43.0994 41.2153 42.9766 40.9186 42.9766 40.6092C42.9766 40.2998 43.0994 40.0031 43.3181 39.7844L49.8351 33.2674C50.0539 33.0486 50.3506 32.9258 50.66 32.9258C50.9693 32.9258 51.266 33.0486 51.4848 33.2674L53.3351 35.1177C53.5539 35.3365 53.6767 35.6332 53.6767 35.9425C53.6767 36.2519 53.5539 36.5486 53.3351 36.7674L46.8181 43.2844Z"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M49.4909 33.6092L47.8867 25.5896C47.8431 25.3714 47.738 25.1702 47.5838 25.0098C47.4296 24.8494 47.2327 24.7364 47.0164 24.6842L32.2651 20.8086C32.0707 20.7616 31.8676 20.7653 31.6751 20.8194C31.4826 20.8735 31.3073 20.9762 31.1659 21.1176C31.0246 21.259 30.9219 21.4343 30.8678 21.6268C30.8137 21.8192 30.8099 22.0224 30.8569 22.2167L34.7326 36.9681C34.7848 37.1844 34.8977 37.3812 35.0581 37.5354C35.2185 37.6896 35.4197 37.7948 35.6379 37.8384L43.6576 39.4426"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M31.1758 21.1255L39.6761 29.6258"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M41.3255 33.609C42.6142 33.609 43.6589 32.5644 43.6589 31.2757C43.6589 29.9871 42.6142 28.9424 41.3255 28.9424C40.0369 28.9424 38.9922 29.9871 38.9922 31.2757C38.9922 32.5644 40.0369 33.609 41.3255 33.609Z"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EMAIL_ICON_SVG = (
  <svg
    width="26"
    height="14"
    viewBox="17 20 39 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M54.1576 26.6089L43.6681 33.2904C43.3121 33.4971 42.9078 33.606 42.4961 33.606C42.0845 33.606 41.6802 33.4971 41.3242 33.2904L30.8242 26.6089"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M51.8242 23.1089H33.1576C31.8689 23.1089 30.8242 24.1536 30.8242 25.4422V39.4422C30.8242 40.7309 31.8689 41.7756 33.1576 41.7756H51.8242C53.1129 41.7756 54.1576 40.7309 54.1576 39.4422V25.4422C54.1576 24.1536 53.1129 23.1089 51.8242 23.1089Z"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DATE_ICON_SVG = (
  <svg
    width="26"
    height="18"
    viewBox="30 19 25 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M37.8242 20.7759V25.4425"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M47.1602 20.7759V25.4425"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M50.6589 23.1089H34.3255C33.0369 23.1089 31.9922 24.1536 31.9922 25.4422V41.7756C31.9922 43.0642 33.0369 44.1089 34.3255 44.1089H50.6589C51.9475 44.1089 52.9922 43.0642 52.9922 41.7756V25.4422C52.9922 24.1536 51.9475 23.1089 50.6589 23.1089Z"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M31.9922 30.1089H52.9922"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M37.8242 34.7759H37.8359"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M42.4922 34.7759H42.5039"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M47.1602 34.7759H47.1718"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M37.8242 39.4424H37.8359"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M42.4922 39.4424H42.5039"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M47.1602 39.4424H47.1718"
      stroke="#8A949F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WIDGET_DEFAULT_SIZE = {
  text: { width: 140, height: 32 },
  number: { width: 100, height: 32 },
  name: { width: 160, height: 32 },
  signature: { width: 160, height: 48 },
  email: { width: 180, height: 32 },
  date: { width: 120, height: 32 },
};

export default function TemplateEditor({ templateName, templateFile, onBack }) {
  const [pages, setPages] = useState([1, 2]);
  const [saveStatus, setSaveStatus] = useState(""); // "", "saved"
  const [activePage, setActivePage] = useState(1);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [mobileOptionsOpen, setMobileOptionsOpen] = useState(false);
  const [docContent, setDocContent] = useState("");
  const [placedWidgets, setPlacedWidgets] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);
  const [resizingId, setResizingId] = useState(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const canvasRef = useRef(null);
  const canvasBoxRef = useRef(null);

  const quillModules = {
    toolbar: [
      [{ font: Font.whitelist }],
      [{ size: Size.whitelist }],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  function addPage() {
    setPages((p) => [...p, p.length + 1]);
  }

  function addWidget(type) {
    const size = WIDGET_DEFAULT_SIZE[type] || { width: 140, height: 32 };
    const newWidget = {
      id: `${type}-${Date.now()}`,
      type,
      x: 40,
      y: 40,
      width: size.width,
      height: size.height,
      page: activePage,
    };
    setPlacedWidgets((prev) => [...prev, newWidget]);
  }
  /* ADD after addWidget() */
  function handleSave() {
    const storageKey = `template-layout:${templateName || "untitled"}`;
    const payload = {
      templateName,
      docContent,
      placedWidgets,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(storageKey, JSON.stringify(payload));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 2000);
    } catch (err) {
      console.error("Failed to save template layout:", err);
    }
  }
  /* ADD near your other useEffects */
  useEffect(() => {
    const storageKey = `template-layout:${templateName || "untitled"}`;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.placedWidgets) setPlacedWidgets(parsed.placedWidgets);
        if (parsed.docContent) setDocContent(parsed.docContent);
      }
    } catch (err) {
      console.error("Failed to load saved template layout:", err);
    }
  }, [templateName]);
  function handleWidgetPointerDown(e, widget) {
    e.stopPropagation();
    setSelectedWidgetId(widget.id);
    const canvasBox = canvasBoxRef.current?.getBoundingClientRect();
    if (!canvasBox) return;
    dragOffsetRef.current = {
      x: e.clientX - canvasBox.left - widget.x,
      y: e.clientY - canvasBox.top - widget.y,
    };
    setDraggingId(widget.id);
  }

  function deleteWidget(id) {
    setPlacedWidgets((prev) => prev.filter((w) => w.id !== id));
    setSelectedWidgetId((prev) => (prev === id ? null : prev));
  }

  function duplicateWidget(id) {
    setPlacedWidgets((prev) => {
      const original = prev.find((w) => w.id === id);
      if (!original) return prev;
      const copy = {
        ...original,
        id: `${original.type}-${Date.now()}`,
        x: original.x + 16,
        y: original.y + 16,
      };
      setSelectedWidgetId(copy.id);
      return [...prev, copy];
    });
  }

  function handleResizePointerDown(e, widget) {
    e.stopPropagation();
    setSelectedWidgetId(widget.id);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: widget.width,
      height: widget.height,
    };
    setResizingId(widget.id);
  }

  useEffect(() => {
    if (!draggingId) return;

    function handlePointerMove(e) {
      const canvasBox = canvasBoxRef.current?.getBoundingClientRect();
      if (!canvasBox) return;
      const newX = e.clientX - canvasBox.left - dragOffsetRef.current.x;
      const newY = e.clientY - canvasBox.top - dragOffsetRef.current.y;

      setPlacedWidgets((prev) =>
        prev.map((w) =>
          w.id === draggingId
            ? {
                ...w,
                x: Math.max(0, Math.min(newX, canvasBox.width - w.width)),
                y: Math.max(0, Math.min(newY, canvasBox.height - w.height)),
              }
            : w,
        ),
      );
    }

    function handlePointerUp() {
      setDraggingId(null);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [draggingId]);

  useEffect(() => {
    if (!resizingId) return;

    function handlePointerMove(e) {
      const dx = e.clientX - resizeStartRef.current.x;
      const dy = e.clientY - resizeStartRef.current.y;

      setPlacedWidgets((prev) =>
        prev.map((w) =>
          w.id === resizingId
            ? {
                ...w,
                width: Math.max(40, resizeStartRef.current.width + dx),
                height: Math.max(24, resizeStartRef.current.height + dy),
              }
            : w,
        ),
      );
    }

    function handlePointerUp() {
      setResizingId(null);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [resizingId]);

  useEffect(() => {
    if (!templateFile) return;

    let cancelled = false;

    async function loadPdf() {
      const arrayBuffer = await templateFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const doc = await loadingTask.promise;
      if (cancelled) return;
      setPdfDoc(doc);
      setPages(Array.from({ length: doc.numPages }, (_, i) => i + 1));
      setActivePage(1);
    }

    loadPdf();

    return () => {
      cancelled = true;
    };
  }, [templateFile]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let cancelled = false;

    async function renderPage() {
      const page = await pdfDoc.getPage(activePage);
      const viewport = page.getViewport({ scale: 1.2 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      if (cancelled) return;
      await page.render({ canvasContext: context, viewport }).promise;
    }

    renderPage();

    return () => {
      cancelled = true;
    };
  }, [pdfDoc, activePage]);

  function PageThumbnail({ pageNum }) {
    const thumbRef = useRef(null);

    useEffect(() => {
      if (!pdfDoc || !thumbRef.current) return;

      let cancelled = false;

      async function renderThumb() {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 0.2 });
        const canvas = thumbRef.current;
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (cancelled) return;
        await page.render({ canvasContext: context, viewport }).promise;
      }

      renderThumb();

      return () => {
        cancelled = true;
      };
    }, [pageNum]);

    return (
      <canvas ref={thumbRef} className="template-editor-page-thumb-canvas" />
    );
  }

  return (
    <div className="template-editor-overlay">
      <div className="template-editor-modal">
        <div className="template-editor-topbar">
          <button
            className="template-editor-back"
            onClick={onBack}
            aria-label="Back"
          >
            &#8249;
          </button>
          <span className="template-editor-crumb">&#8250;</span>
          <span className="template-editor-title">
            {templateName || "Template Name"}
          </span>
        </div>

        <div className="template-editor-body">
          {" "}
          <div className="template-editor-pages">
            {pages.map((p) => (
              <div
                key={p}
                className={`template-editor-page-thumb ${activePage === p ? "template-editor-page-thumb--active" : ""}`}
                onClick={() => setActivePage(p)}
              >
                {pdfDoc ? <PageThumbnail pageNum={p} /> : `Page ${p}`}
              </div>
            ))}
            <button className="template-editor-add-page" onClick={addPage}>
              +
            </button>
          </div>
          <div className="template-editor-canvas-wrap">
            <div
              className="template-editor-canvas"
              ref={canvasBoxRef}
              onPointerDown={() => setSelectedWidgetId(null)}
            >
              {templateFile ? (
                <canvas
                  ref={canvasRef}
                  className="template-editor-pdf-canvas"
                />
              ) : (
                <ReactQuill
                  className="template-editor-quill"
                  theme="snow"
                  value={docContent}
                  onChange={setDocContent}
                  modules={quillModules}
                  placeholder="Title"
                />
              )}

              {placedWidgets
                .filter((w) => w.page === activePage)
                .map((w) => (
                  <div
                    key={w.id}
                    className={`template-editor-placed-widget ${selectedWidgetId === w.id ? "template-editor-placed-widget--selected" : ""}`}
                    style={{
                      left: w.x,
                      top: w.y,
                      width: w.width,
                      height: w.height,
                    }}
                    onPointerDown={(e) => handleWidgetPointerDown(e, w)}
                  >
                    {WIDGETS.find((widget) => widget.id === w.type)?.label ||
                      w.type}

                    {selectedWidgetId === w.id && (
                      <div
                        className="template-editor-widget-toolbar"
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        <button
                          className="template-editor-widget-toolbar-btn"
                          aria-label="Duplicate widget"
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateWidget(w.id);
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="9"
                              y="9"
                              width="12"
                              height="12"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                        </button>
                        <button
                          className="template-editor-widget-toolbar-btn template-editor-widget-toolbar-btn--danger"
                          aria-label="Delete widget"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteWidget(w.id);
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 6h18"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    )}

                    {selectedWidgetId === w.id && (
                      <div
                        className="template-editor-widget-resize-handle"
                        onPointerDown={(e) => handleResizePointerDown(e, w)}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="template-editor-mobile-actions">
            <button
              className="template-editor-mobile-options-btn"
              onClick={() => setMobileOptionsOpen(true)}
              aria-label="Options"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="7"
                  height="7"
                  rx="1.5"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <rect
                  x="14"
                  y="3"
                  width="7"
                  height="7"
                  rx="1.5"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <rect
                  x="3"
                  y="14"
                  width="7"
                  height="7"
                  rx="1.5"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <path
                  d="M17.5 14V21M14 17.5H21"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <span className="template-editor-mobile-options-label">
              Options
            </span>
            <button className="template-editor-mobile-share-btn">Share</button>
          </div>
          {mobileOptionsOpen && (
            <div
              className="template-editor-mobile-backdrop"
              onClick={() => setMobileOptionsOpen(false)}
            />
          )}
          <div
            className={`template-editor-sidebar ${mobileOptionsOpen ? "template-editor-sidebar--mobile-open" : ""}`}
          >
            <button
              className="template-editor-sidebar-close"
              onClick={() => setMobileOptionsOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="template-editor-section">
              <div className="template-editor-roles-row">
                <div className="template-editor-zoom-controls">
                  <button
                    className="template-editor-zoom-btn"
                    aria-label="Zoom in"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="10"
                        cy="10"
                        r="7"
                        stroke="#FF0915"
                        strokeWidth="2"
                      />
                      <path
                        d="M21 21L16 16"
                        stroke="#FF0915"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10 7V13M7 10H13"
                        stroke="#FF0915"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <button
                    className="template-editor-zoom-btn"
                    aria-label="Zoom out"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="10"
                        cy="10"
                        r="7"
                        stroke="#FF0915"
                        strokeWidth="2"
                      />
                      <path
                        d="M21 21L16 16"
                        stroke="#FF0915"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7 10H13"
                        stroke="#FF0915"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="template-editor-roles-content">
                  <span className="template-editor-section-label">Roles</span>
                  <input
                    type="text"
                    className="template-editor-role-select"
                    placeholder="Enter Role"
                  />
                  <button className="template-editor-add-role">Add Role</button>
                </div>
              </div>
            </div>

            <div className="template-editor-section template-editor-widgets-section">
              <span className="template-editor-section-label">Widgets</span>
              <div className="template-editor-widgets-grid">
                {WIDGETS.map((w) => (
                  <button
                    className="template-editor-widget"
                    key={w.id}
                    onClick={() => addWidget(w.id)}
                  >
                    <span className="template-editor-widget-icon">
                      {w.id === "text" && TEXT_ICON_SVG}
                      {w.id === "number" && NUMBER_ICON_SVG}
                      {w.id === "name" && NAME_ICON_SVG}
                      {w.id === "signature" && SIGNATURE_ICON_SVG}
                      {w.id === "email" && EMAIL_ICON_SVG}
                      {w.id === "date" && DATE_ICON_SVG}
                      {![
                        "text",
                        "number",
                        "name",
                        "signature",
                        "email",
                        "date",
                      ].includes(w.id) && w.icon}
                    </span>
                    <span className="template-editor-widget-label">
                      {w.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="template-editor-actions-row">
              <button className="template-editor-save" onClick={handleSave}>
                {saveStatus === "saved" ? "Saved ✓" : "Save"}
              </button>
              <button className="template-editor-share">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
