import { useState, useRef, useEffect } from "react";
import { FileText, MoreHorizontal, X, Trash2, XCircle, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getStatusClass = (status) => {
  if (!status) return "admin-badge--pending";
  const s = status.toLowerCase();
  if (s === "completed" || s === "signed") return "admin-badge--completed";
  if (s === "expired") return "admin-badge--expired";
  if (s === "viewed" || s === "sent") return "admin-badge--viewed";
  if (s === "cancelled") return "admin-badge--cancelled";
  return "admin-badge--pending"; 
};

export default function DocumentRow({ doc, _id, title, note, assignedto, createdBy, status, onRevoke, onArchive, onCancel }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

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

  const isCompleted = docStatus && ["completed", "signed", "expired", "cancelled"].includes(docStatus.toLowerCase());

  return (
    <div className="admin-doc-row">
      <div className="admin-doc-row__title">
        <FileText size={20} strokeWidth={1.8} className="admin-doc-row__icon" />
        <span>{docTitle}</span>
      </div>
      <div className="admin-doc-row__note">{docNote || "—"}</div>
      <div className="admin-doc-row__cell">{Array.isArray(docSigners) ? docSigners.length : "—"}</div>
      <div className="admin-doc-row__cell">{docOwner?.name || "—"}</div>
      <div className="admin-doc-row__cell">
        <span className={`admin-badge ${getStatusClass(docStatus)}`}>{docStatus}</span>
      </div>
      
      <div className="admin-doc-row__cell" ref={menuRef} style={{ position: "relative", display: "flex", justifyContent: "center" }}>
        <button
          className="admin-doc-row__menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <MoreHorizontal size={18} />
        </button>
        
        {menuOpen && (
          <div className="action-menu" style={{ 
            position: 'absolute', right: '8px', top: 'calc(100% + 2px)', zIndex: 100,
            background: '#fff', border: '1px solid #e4e4e4', borderRadius: '10px',
            padding: '5px 0', minWidth: '205px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            display: 'flex', flexDirection: 'column'
          }}>
            <button
              onClick={() => { setMenuOpen(false); navigate(`/document/view/${docId}`); }}
              style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '10px 13px', width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', fontSize: '12px', fontWeight: 500, color: '#374151' }}
              onMouseOver={(e) => e.currentTarget.style.background = "#f5f5f5"}
              onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
            >
              <Eye size={14} /> View Document
            </button>
            
            {!isCompleted && (
              <button
                onClick={() => { setMenuOpen(false); if (onRevoke) onRevoke(); }}
                style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '10px 13px', width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', fontSize: '12px', fontWeight: 500, color: '#e53935' }}
                onMouseOver={(e) => e.currentTarget.style.background = "#fff2f2"}
                onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
              >
                <X size={14} /> Revoke
              </button>
            )}

            <button
              onClick={() => { setMenuOpen(false); if (onArchive) onArchive(); }}
              style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '10px 13px', width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', fontSize: '12px', fontWeight: 500, color: '#e53935' }}
              onMouseOver={(e) => e.currentTarget.style.background = "#fff2f2"}
              onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
            >
              <Trash2 size={14} /> Move to Bin
            </button>

            {!isCompleted && (
              <button
                onClick={() => { setMenuOpen(false); if (onCancel) onCancel(); }}
                style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '10px 13px', width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', fontSize: '12px', fontWeight: 500, color: '#e53935' }}
                onMouseOver={(e) => e.currentTarget.style.background = "#fff2f2"}
                onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
              >
                <XCircle size={14} /> Cancel Requests
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}