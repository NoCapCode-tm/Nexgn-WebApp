import { useState, useRef, useEffect } from "react";
import { FileText, MoreHorizontal, X } from "lucide-react";
import { useNavigate } from "react-router";

const getStatusClass = (status) => {
  if (!status) return "badge--pending";
  const s = status.toLowerCase();
  if (s === "completed" || s === "signed") return "badge--signed";
  if (s === "expired") return "badge--expired";
  if (s === "viewed" || s === "sent") return "badge--viewed";
  return "badge--pending"; // default for pending, partially_signed, etc.
};

export default function DocumentRow({_id, title, note, assignedto, createdBy, status, onRevoke }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="doc-row">
      <div className="doc-row__title">
        <FileText size={20} className="doc-row__icon" />
        <span>{title}</span>
      </div>
      <div className="doc-row__note">{note || "—"}</div>
      <div className="doc-row__cell">{assignedto?.length || "—"}</div>
      <div className="doc-row__cell">{createdBy?.name || "—"}</div>
      <div className="doc-row__cell">
        <span className={`badge ${getStatusClass(status)}`}>{status || "Pending"}</span>
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
                navigate(`/document/view/${_id}`);
              }}
            >
              View
            </button>
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
          </div>
        )}
      </div>
    </div>
  );
}