import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import Sidebar from './Sidebar';
import '../css/Dashboard.css';
import '../css/SignYourself.css';
import { Search, Bell, UserCircle } from "lucide-react";

export default function SignYourself() {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(100);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [docTitle, setDocTitle] = useState('NDA-Partner Discussion');
  const [note, setNote] = useState('');
  const [required, setRequired] = useState(true);
  const [fieldType, setFieldType] = useState('Signature');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const fileInputRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) setUploadedFile(file.name);
  }

  function zoomIn()  { setZoom(z => Math.min(z + 10, 200)); }
  function zoomOut() { setZoom(z => Math.max(z - 10, 50)); }

  return (
    <div className="layout">
      {mobileNavOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileNavOpen(false)} />
      )}
      <div className={`mobile-sidebar-wrapper ${mobileNavOpen ? "mobile-sidebar-wrapper--open" : ""}`}>
        <Sidebar />
      </div>
      <div className="desktop-sidebar-wrapper">
        <Sidebar />
      </div>

      <div className="main">

        {/* Mobile topbar */}
        <header className="mobile-topbar">
          <button className="mobile-topbar__hamburger" onClick={() => setMobileNavOpen(o => !o)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <span className="mobile-topbar__title">Sign Yourself</span>
          <div className="mobile-topbar__icons">
            <button className="topbar__icon-btn"><Search size={18} color="#FF0915" strokeWidth={1.5} /></button>
            <button className="topbar__icon-btn"><Bell size={18} color="#FF0915" strokeWidth={1.5} /></button>
            <button className="topbar__icon-btn"><UserCircle size={20} color="#FF0915" strokeWidth={1.5} /></button>
          </div>
        </header>

        {/* Mobile page title */}
        <div className="mobile-page-header">
          <h1 className="topbar__title">Sign Yourself</h1>
          <p className="topbar__sub">Create and sign a document where you are the signer</p>
        </div>

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
              <div className="topbar__title">Sign Yourself</div>
              <div className="topbar__sub">Create and sign a document where you are the signer</div>
            </div>
          </div>
        </div>

        {/* DOCUMENT SETUP CARD */}
        <div className="setup-card">

          {/* Header */}
          <div className="setup-card__header">
            <span className="setup-card__title">Document Setup</span>
            <div className="setup-card__tabs">
              <button className="tab-btn tab-btn--active">Sign Yourself</button>
              <button className="tab-btn tab-btn--inactive" onClick={() => navigate('/create-signature')}>
                Request Signature
              </button>
            </div>
          </div>

          {/* Choose Template */}
          <div>
            <div className="section-label">Choose Template</div>
            <div className="template-row">
              <div className="template-select-wrap">
                <select className="template-select" defaultValue="">
                  <option value="" disabled>Select a Template</option>
                  <option>NDA Template</option>
                  <option>Employment Agreement</option>
                  <option>Freelance Contract</option>
                  <option>Job Offer Letter</option>
                </select>
                <svg className="template-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
              <button className="btn-create">Create</button>
            </div>
          </div>

          {/* OR Divider */}
          <div className="or-divider">OR</div>

          {/* Upload */}
          <div>
            <div className="section-label">Upload Document (PDF Only)</div>
            <div
              className="upload-zone"
              onClick={() => fileInputRef.current.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) setUploadedFile(file.name);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
              </svg>
              <span>{uploadedFile ? uploadedFile : 'Click or drag file here to upload'}</span>
              <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFile}/>
            </div>
          </div>

          {/* Signer + Document Title */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Signer</label>
              <input type="text" className="form-input" placeholder="You (Auto-filled)" readOnly/>
            </div>
            <div className="form-group">
              <label className="form-label">Document Title</label>
              <input type="text" className="form-input" value={docTitle} onChange={e => setDocTitle(e.target.value)} placeholder="NDA-Partner Discussion"/>
            </div>
          </div>

          {/* Note */}
          <div className="form-group">
            <label className="form-label">Note (Optional)</label>
            <textarea className="form-textarea" placeholder="Adding a personal note for my own records..." value={note} onChange={e => setNote(e.target.value)}/>
          </div>

          {/* Bottom: Preview + Field Properties */}
          <div className="bottom-section">

            {/* Document Preview */}
            <div className="doc-preview">
              <div className="doc-preview__header">
                <span className="doc-preview__title">Document Preview</span>
                <div className="doc-preview__zoom">
                  <button className="doc-preview__zoom-btn" onClick={zoomOut}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </button>
                  <span>{zoom}%</span>
                  <button className="doc-preview__zoom-btn" onClick={zoomIn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="doc-preview__canvas">
                {uploadedFile ? (
                  <div className="doc-preview__filename">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF0915" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <span>{uploadedFile}</span>
                  </div>
                ) : (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.916 36.6673H9.99935C9.11529 36.6673 8.26745 36.3161 7.64233 35.691C7.0172 35.0659 6.66602 34.2181 6.66602 33.334V6.66733C6.66602 5.78327 7.0172 4.93543 7.64233 4.31031C8.26745 3.68519 9.11529 3.334 9.99935 3.334H23.3327C23.8608 3.3327 24.384 3.43601 24.872 3.63797C25.36 3.83993 25.8032 4.13653 26.176 4.51066L32.156 10.4907C32.5301 10.8634 32.8268 11.3066 33.0287 11.7947C33.2307 12.2827 33.334 12.8058 33.3327 13.334V22.2507" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23.334 3.33398V11.6673C23.334 12.1093 23.5096 12.5333 23.8221 12.8458C24.1347 13.1584 24.5586 13.334 25.0007 13.334H33.334" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23.334 31.666H33.334" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M28.334 26.666V36.666" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>

            {/* Field Properties */}
            <div className="field-props">
              <div className="field-props__title">Field Properties</div>
              <div>
                <div className="field-props__label">Field Type</div>
                <select className="field-type-select" value={fieldType} onChange={e => setFieldType(e.target.value)}>
                  <option>Signature</option>
                  <option>Initials</option>
                  <option>Date</option>
                  <option>Text</option>
                </select>
              </div>
              <div className="required-row">
                <span className="required-label">Required</span>
                <label className="toggle">
                  <input type="checkbox" checked={required} onChange={e => setRequired(e.target.checked)}/>
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div>
                <div className="field-props__label">Assigned To</div>
                <input type="text" className="assigned-input" placeholder="You"/>
              </div>
              <button className="btn-share">Share</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}