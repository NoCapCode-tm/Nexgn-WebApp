import { useState, useRef, useEffect } from "react";
import { FileText, MoreHorizontal, X } from "lucide-react";

const statusClass = {
  Pending: "badge--pending",
  Signed: "badge--signed",
  Expired: "badge--expired",
};

export default function MemberDocumentRow({ title, note, signers, signedAt, owner, status }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
      <div className="doc-row__cell">{signers || "—"}</div>
      <div className="doc-row__cell">{signedAt || "—"}</div>
      <div className="doc-row__cell">{owner}</div>
      <div className="doc-row__cell">
        <span className={`badge ${statusClass[status]}`}>{status}</span>
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
              onClick={() => setMenuOpen(false)}
            >
              View
            </button>
            <button
              className="doc-row__dropdown-item doc-row__dropdown-item--danger"
              onClick={() => setMenuOpen(false)}
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