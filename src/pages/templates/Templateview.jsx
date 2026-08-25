import  { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import ReactQuill from "react-quill-new";

import "react-quill-new/dist/quill.bubble.css";
import "../../styles/BaseLayout.css";
import "./TemplateEditor.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function TemplateView({ template
    , onBack }) {
  console.log(template);
  console.log("Download link:", template?.templateid?.file?.downloadLink);
  const [pages, setPages] = useState([]);
  const widgets = template.widget || [];
const [activePage, setActivePage] = useState(1);
const [pdfDoc, setPdfDoc] = useState(null);
const [zoom, setZoom] = useState(1.2);

const canvasRef = useRef(null);
const canvasBoxRef = useRef(null);

useEffect(() => {
  if (!template?.templateid?.file) return;

  async function loadPdf() {
    try {
     const loadingTask = pdfjsLib.getDocument(
  `template/template/` +
    template.templateid._id +
    "/pdf"
);
      const doc = await loadingTask.promise;

      setPdfDoc(doc);
      setPages(
        Array.from({ length: doc.numPages }, (_, i) => i + 1)
      );
      setActivePage(1);
    } catch (err) {
       console.error("PDF ERROR:", err);
    }
  }

  loadPdf();
}, [template]);

useEffect(() => {
  if (!pdfDoc || !canvasRef.current) return;

  async function renderPage() {
    const page = await pdfDoc.getPage(activePage);

    const viewport = page.getViewport({
      scale: zoom,
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: ctx,
      viewport,
    }).promise;
  }

  renderPage();
}, [pdfDoc, activePage, zoom]);

function PageThumbnail({ pageNum }) {
  const thumbRef = useRef(null);

  useEffect(() => {
    if (!pdfDoc || !thumbRef.current) return;

    async function renderThumb() {
      const page = await pdfDoc.getPage(pageNum);

      const viewport = page.getViewport({
        scale: 0.22,
      });

      const canvas = thumbRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: ctx,
        viewport,
      }).promise;
    }

    renderThumb();
  }, [pageNum]);

  return (
    <canvas
      ref={thumbRef}
      className="template-editor-page-thumb-canvas"
    />
  );
}

  return(
    <div className="template-editor-overlay">
  <div className="template-editor-modal">
    <div className="template-editor-topbar">

    <button
        className="template-editor-back"
        onClick={onBack}
    >
        &#8249;
    </button>

    <span className="template-editor-crumb">
        &#8250;
    </span>

    <span className="template-editor-title">
        {template.templateid.name}
    </span>

</div>
<div className="template-editor-body">
<div className="template-editor-pages">
    {pages.map((page) => (
        <div
            key={page}
            className={`template-editor-page-thumb ${
                activePage === page
                    ? "template-editor-page-thumb--active"
                    : ""
            }`}
            onClick={() => setActivePage(page)}
        >
            <PageThumbnail pageNum={page} />
        </div>
    ))}
</div>

<div
    className="template-editor-canvas"
    ref={canvasBoxRef}
>

   {template?.templateid?.file ? (
  <>
    <canvas
      ref={canvasRef}
      className="template-editor-pdf-canvas"
    />

    {widgets
      .filter((w) => w.page === activePage)
      .map((w, index) => (
        <div
          key={index}
          className="template-editor-placed-widget"
          style={{
            left: w.x,
            top: w.y,
            width: w.width,
            height: w.height,
          }}
        >
          {w.widgetname === "signature" ? (
            <span className="template-editor-placed-widget-label">
              Signature
            </span>
          ) : (
            <input
              className="template-editor-widget-input"
              readOnly
              placeholder={w.widgetname}
            />
          )}
        </div>
      ))}
  </>
) : (
  <ReactQuill
    value={template.templateid.htmlcontent}
    readOnly
    theme="bubble"
  />
)}

</div>
<div className="template-editor-sidebar">

  <div className="template-editor-section">
    <span className="template-editor-section-label">
      Template Details
    </span>

    <div className="viewer-detail">
      <span>Name</span>
      <strong>{template.templateid.name}</strong>
    </div>

    <div className="viewer-detail">
      <span>Role</span>
      <strong>{template.role}</strong>
    </div>

    <div className="viewer-detail">
      <span>Created By</span>
      <strong>{template.templateid.createdby.name}</strong>
    </div>

    <div className="viewer-detail">
      <span>Created On</span>
      <strong>
        {new Date(template.createdAt).toLocaleDateString()}
      </strong>
    </div>

  </div>

  <div className="template-editor-section">
      <div className="template-editor-zoom-controls">
  <button
    className="template-editor-zoom-btn"
    onClick={() =>
      setZoom((z) => Math.min(z + 0.2, 3))
    }
  >
    +
  </button>

  <button
    className="template-editor-zoom-btn"
    onClick={() =>
      setZoom((z) => Math.max(z - 0.2, 0.5))
    }
  >
    −
  </button>
</div>
  </div>

</div>
</div>
</div>
</div>

  )
}

export default TemplateView
