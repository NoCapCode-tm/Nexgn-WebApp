import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import "../css/Dashboard.css";
import "../css/SignYourself.css";
import "../css/CreateSignatureRequest.css";
import { Search, Bell, UserCircle } from "lucide-react";

export default function CreateSignatureRequest() {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(100);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [required, setRequired] = useState(true);
  const [docTitle, setDocTitle] = useState("NDA - Blair Croft");
  const [expiresIn, setExpiresIn] = useState("7 days");
  const [note, setNote] = useState("");
  const [fieldType, setFieldType] = useState("NDA");
  const [assignedTo, setAssignedTo] = useState("Fresher / Freelancer / Intern");
  const [signers, setSigners] = useState([{ name: "Blair Croft", email: "blair.croft@example.com" }]);
  const fileInputRef = useRef(null);

  function handleFile(e) {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0].name);
    }
  }

  function addSigner() {
    setSigners([...signers, { name: "", email: "" }]);
  }

  function updateSigner(index, field, value) {
    const updated = [...signers];
    updated[index][field] = value;
    setSigners(updated);
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">

        {/* Desktop Topbar */}
        <div className="topbar desktop-topbar">
          <div className="topbar__top-row">
            <div className="topbar__icons">
              <button className="topbar__icon-btn"><Search size={18} color="#FF0915" strokeWidth={1.5} /></button>
              <button className="topbar__icon-btn"><Bell size={18} color="#FF0915" strokeWidth={1.5} /></button>
              <button className="topbar__icon-btn"><UserCircle size={20} color="#FF0915" strokeWidth={1.5} /></button>
            </div>
          </div>
          <div className="topbar__bottom-row">
            <div>
              <div className="topbar__title">Create Signature Request</div>
              <div className="topbar__sub">Send a document for signing or sign it yourself</div>
            </div>
          </div>
        </div>

        {/* Document Setup Card */}
        <div className="setup-card">

          {/* Header */}
          <div className="setup-card__header">
            <span className="setup-card__title">Document Setup</span>
            <div className="setup-card__tabs">
              <button className="tab-btn tab-btn--inactive" onClick={() => navigate("/sign-yourself")}>
                Sign Yourself
              </button>
              <button className="tab-btn tab-btn--active">
                Request Signature
              </button>
            </div>
          </div>

          {/* System Roles + Assigned To + Create */}
          <div className="csr-roles-row">
            <div className="csr-roles-col">
              <div className="form-label">System Roles</div>
              <div className="csr-select-wrap">
                <select className="csr-select">
                  <option>Member / Employee</option>
                  <option>Admin</option>
                  <option>Manager</option>
                </select>
                <svg className="csr-select-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </div>
            <div className="csr-roles-col">
              <div className="form-label">Assigned To</div>
              <div className="csr-select-wrap">
                <select className="csr-select">
                  <option>Client / External signer</option>
                  <option>Fresher / Freelancer / Intern</option>
                  <option>Member / Employee</option>
                </select>
                <svg className="csr-select-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </div>
            <button className="csr-create-btn">Create</button>
          </div>

          {/* OR divider */}
          <div className="or-divider">OR</div>

          {/* Upload */}
          <div>
            <div className="section-label">Upload Document (PDF Only)</div>
            <div className="csr-upload-zone" onClick={() => fileInputRef.current?.click()}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
              </svg>
              <span>{uploadedFile ? uploadedFile : "Click or drag file here to upload"}</span>
              <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFile}/>
            </div>
          </div>

          {/* Document Title + Expires In */}
          <div className="csr-title-row">
            <div className="form-group csr-title-field">
              <label className="form-label">Document Title</label>
              <input type="text" className="csr-input" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} placeholder="NDA - Blair Croft"/>
            </div>
            <div className="form-group csr-expires-field">
              <label className="form-label">Expires In</label>
              <div className="csr-expires-wrap">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A949F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <input type="text" className="csr-expires-input" value={expiresIn} onChange={(e) => setExpiresIn(e.target.value)} placeholder="7 days"/>
              </div>
            </div>
          </div>

          {/* Signer Details */}
          <div className="csr-signer-box">
            <div className="form-label" style={{ marginBottom: "10px" }}>Signer Details</div>
            {signers.map((signer, i) => (
              <div key={i} className="csr-signer-row">
                <div className="form-group csr-signer-name">
                  <label className="csr-sub-label">Signer</label>
                  <input type="text" className="csr-input" value={signer.name} onChange={(e) => updateSigner(i, "name", e.target.value)} placeholder="Blair Croft"/>
                </div>
                <div className="form-group csr-signer-email">
                  <label className="csr-sub-label">Signer Email</label>
                  <input type="email" className="csr-input" value={signer.email} onChange={(e) => updateSigner(i, "email", e.target.value)} placeholder="blair.croft@example.com"/>
                </div>
                <div className="csr-signer-badge">Signer {i + 1}</div>
              </div>
            ))}
            <button className="csr-add-signer" onClick={addSigner}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Another Signer
            </button>
          </div>

          {/* Note */}
          <div className="form-group">
            <label className="form-label">Note (Optional)</label>
            <textarea className="csr-textarea" placeholder="Please review this offer letter and sign in the designated fields to confirm your acceptance." value={note} onChange={(e) => setNote(e.target.value)}/>
          </div>

          {/* Bottom: Doc Preview + Field Properties */}
          <div className="bottom-section">

            {/* Document Preview */}
            <div className="doc-preview">
              <div className="doc-preview__header">
                <span className="doc-preview__title">Document Preview</span>
                <div className="doc-preview__zoom">
                  <button className="doc-preview__zoom-btn" onClick={() => setZoom(z => Math.max(z - 10, 50))}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </button>
                  <span>{zoom}%</span>
                  <button className="doc-preview__zoom-btn" onClick={() => setZoom(z => Math.min(z + 10, 200))}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="doc-preview__canvas">
                {uploadedFile ? (
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF0915" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <span style={{ fontSize:"12px", color:"#8A949F" }}>{uploadedFile}</span>
                  </div>
                ) : (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                )}
              </div>
            </div>

            {/* Field Properties */}
            <div className="field-props">
              <div className="field-props__title">Field Properties</div>
              <div>
                <div className="field-props__label">Field Type</div>
                <input type="text" className="assigned-input" value={fieldType} onChange={(e) => setFieldType(e.target.value)} placeholder="NDA"/>
              </div>
              <div className="required-row">
                <span className="required-label">Required</span>
                <label className="toggle">
                  <input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)}/>
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div>
                <div className="field-props__label">Assigned To</div>
                <div className="csr-assigned-wrap">
                  <select className="csr-assigned-select" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                    <option>Fresher / Freelancer / Intern</option>
                    <option>Member / Employee</option>
                    <option>Client / External signer</option>
                  </select>
                  <svg className="csr-assigned-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
              <button className="btn-share">Share</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}