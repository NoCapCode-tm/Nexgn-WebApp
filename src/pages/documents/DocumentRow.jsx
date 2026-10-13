import { useState, useRef, useEffect } from "react";
import { FileText, MoreHorizontal, X } from "lucide-react";
import { useNavigate } from "react-router";

const getStatusClass = (status) => {
  if (!status) return "badge--pending";
  const s = status.toLowerCase();
  if (s === "completed" || s === "signed") return "badge--signed";
  if (s === "expired") return "badge--expired";
  if (s === "viewed" || s === "sent") return "badge--viewed";
  return "badge--pending"; 
};

export default function DocumentRow({ doc, _id, title, note, assignedto, createdBy, status, onRevoke }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Fallback safely if props or doc object are structured differently between views
  const docId = _id || doc?._id;
  const docTitle = title || doc?.title || "Untitled Document";
  const docNote = note || doc?.note;
  const docSigners = assignedto || doc?.assignedto;
  const docOwner = createdBy || doc?.senderId || doc?.createdBy;
  const docStatus = status || doc?.status || "Pending";

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isCompleted = docStatus && ["completed", "signed", "expired"].includes(docStatus.toLowerCase());

  return (
    <div className="doc-row">
      <div className="doc-row__title">
        <FileText size={20} className="doc-row__icon" />
        <span>{docTitle}</span>
      </div>
      <div className="doc-row__note">{docNote || "—"}</div>
      <div className="doc-row__cell">{Array.isArray(docSigners) ? docSigners.length : "—"}</div>
      <div className="doc-row__cell">{docOwner?.name || "—"}</div>
      <div className="doc-row__cell">
        <span className={`badge ${getStatusClass(docStatus)}`}>{docStatus}</span>
      </div>
      <div className="doc-row__cell doc-row__action" ref={menuRef}>
        <button
          className="doc-row__menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Row actions"
        >
          <MoreHorizontal size={16} />
        </button>
        {menuOpen && (
          <div className="doc-row__dropdown">
            <button
              className="doc-row__dropdown-item"
              onClick={() => {
                setMenuOpen(false);
                navigate(`/document/view/${docId}`);
              }}
            >
              View
            </button>
            
            {/* ONLY show Revoke if the document is NOT completed/signed/expired */}
            {!isCompleted && (
              <button
                className="doc-row__dropdown-item doc-row__dropdown-item--danger"
                onClick={() => {
                  setMenuOpen(false);
                  if (onRevoke) onRevoke();
                }}
              >
                <X size={13} />
                Revoke
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}