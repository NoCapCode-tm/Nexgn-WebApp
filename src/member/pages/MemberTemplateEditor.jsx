import { useState } from "react";
import "../css/MemberBaseLayout.css";
import "../css/MemberTemplateEditor.css";

const WIDGETS = [
  { id: "text", label: "Text", icon: "Aa" },
  { id: "number", label: "Number", icon: "123" },
  { id: "name", label: "Name", icon: "ID" },
  { id: "signature", label: "Signature", icon: "sig" },
  { id: "email", label: "Email", icon: "@" },
  { id: "date", label: "Date", icon: "date" },
];

export default function MemberTemplateEditor({ templateName, onBack }) {
  const [pages, setPages] = useState([1, 2]);
  const [activePage, setActivePage] = useState(1);

  function addPage() {
    setPages((p) => [...p, p.length + 1]);
  }

  return (
    <div className="template-editor-overlay">
      <div className="template-editor-modal">
        <div className="template-editor-topbar">
          <button className="template-editor-back" onClick={onBack} aria-label="Back">
            &#8592;
          </button>
          <span className="template-editor-crumb">&#8250;</span>
          <span className="template-editor-title">{templateName || "Template Name"}</span>
        </div>

        <div className="template-editor-body">
          <div className="template-editor-pages">
            {pages.map((p) => (
              <div
                key={p}
                className={`template-editor-page-thumb ${activePage === p ? "template-editor-page-thumb--active" : ""}`}
                onClick={() => setActivePage(p)}
              >
                Page {p}
              </div>
            ))}
            <button className="template-editor-add-page" onClick={addPage}>
              +
            </button>
          </div>

          <div className="template-editor-canvas-wrap">
            <div className="template-editor-canvas">
              <h2 className="template-editor-canvas-title">Title</h2>
            </div>
          </div>

          <div className="template-editor-sidebar">
            <div className="template-editor-section">
              <span className="template-editor-section-label">Roles</span>
              <div className="template-editor-role-select">
                <span>Select a Role</span>
                <span>&#8250;</span>
              </div>
              <button className="template-editor-add-role">+ Add Role</button>
            </div>

            <div className="template-editor-section">
              <span className="template-editor-section-label">Widgets</span>
              <div className="template-editor-widgets-grid">
                {WIDGETS.map((w) => (
                  <button className="template-editor-widget" key={w.id}>
                    <span className="template-editor-widget-icon">{w.icon}</span>
                    <span className="template-editor-widget-label">{w.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="template-editor-share">Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}
