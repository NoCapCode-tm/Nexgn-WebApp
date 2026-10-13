import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DocumentsRow({ doc, id, onRevoke, onArchive, onCancel }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isCompleted = doc.status && ["completed", "signed", "expired"].includes(doc.status.toLowerCase());

  const statusIcon = () => {
    if (doc.status.toLowerCase() === "signed" || doc.status.toLowerCase() === "completed")
      return <svg className="status-circle-icon status-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="11" /><path d="M9 12l2 2 4-4" /></svg>;
    if (doc.status.toLowerCase() === "expired")
      return <svg className="status-circle-icon status-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="11" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>;
    return <svg className="status-circle-icon status-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="11" strokeWidth="2" /><g transform="scale(0.65) translate(6.5, 6.5)"><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><circle cx="8" cy="16" r="6" /><path d="M9.5 17.5 8 16.25V14" /></g></svg>;
  };

  return (
    <div className="admin-doc-row">
      <div className="mobile-status-corner">{statusIcon()}</div>

      <div className="admin-doc-row__title" data-label="TITLE">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="admin-doc-row__icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
        <span>{doc.title}</span>
      </div>

      <div className="admin-doc-row__note" data-label="NOTE">{doc?.note}</div>

      <div className="admin-doc-row__cell mobile-col" data-label="SIGNERS">
        <span className="mobile-val">{doc?.assignedto[0]?.name || "—"}</span>
      </div>

      <div className="admin-doc-row__cell mobile-col-owner" data-label="OWNER">
        <span className="desktop-val">{doc.createdBy?.name || doc.senderId?.name || "—"}</span>
      </div>

      <div className="admin-doc-row__cell desktop-status" data-label="STATUS">
        <span className={`admin-badge admin-badge--${doc.status.toLowerCase()}`}>{doc.status}</span>
      </div>

      <div className="admin-doc-row__menu" ref={menuRef}>
        <button className="admin-doc-row__menu-trigger" onClick={() => setMenuOpen((prev) => !prev)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>
        </button>
        
        {menuOpen && (
          <div className="action-menu">
            <button className="action-menu__item" onClick={() => { setMenuOpen(false); navigate(`/document/view/${id}`); }}>View</button>

            {/* REVOKE - Hidden if completed */}
            {!isCompleted && (
              <button className="action-menu__item action-menu__item--danger" onClick={() => { setMenuOpen(false); if (onRevoke) onRevoke(); }}>
                Revoke
              </button>
            )}

            {/* MOVE TO BIN - ALWAYS VISIBLE */}
            <button className="action-menu__item action-menu__item--danger" onClick={() => { setMenuOpen(false); if (onArchive) onArchive(); }}>
               Move to Bin
            </button>

            {/* CANCEL REQUESTS - Hidden if completed */}
            {!isCompleted && (
              <button className="action-menu__item action-menu__item--danger" onClick={() => { setMenuOpen(false); if (onCancel) onCancel(); }}>
                 Cancel Requests
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}