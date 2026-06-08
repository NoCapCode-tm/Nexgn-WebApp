import { useState, useRef } from 'react';
import Sidebar from './Sidebar'; 
import '../css/Dashboard.css';
import '../css/SignYourself.css';
import { useNavigate } from 'react-router-dom';
export default function SignYourself() {
  const [activeTab, setActiveTab] = useState('sign');
  const [zoom, setZoom] = useState(100);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [docTitle, setDocTitle] = useState('NDA-Partner Discussion');
  const [note, setNote] = useState('');
  const [required, setRequired] = useState(true);
  const [fieldType, setFieldType] = useState('Signature');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
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


      {/* ── MAIN ── */}
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
    <button className="topbar__icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF0915" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    </button>
    <button className="topbar__icon-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF0915" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    </button>
    <button className="topbar__icon-btn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF0915" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </button>
  </div>
</header>

{/* Mobile page title */}
<div className="mobile-page-header">
  <h1 className="topbar__title">Sign Yourself</h1>
  <p className="topbar__sub">Create and sign a document where you are the signer</p>
</div>

        {/* Topbar */}
        <div className="topbar desktop-topbar">
          <div className="topbar__top-row">
            <div className="topbar__icons">
              <button className="topbar__icon-btn" aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
              <button className="topbar__icon-btn" aria-label="Notifications">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </button>
              <button className="topbar__icon-btn" aria-label="Profile">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="topbar__bottom-row">
            <div>
              <div className="topbar__title">Sign Yourself</div>
              <div className="topbar__sub">Create and sign a document where you are the signer</div>
            </div>
          </div>
        </div>

        {/* ── DOCUMENT SETUP CARD ── */}
        <div className="setup-card">

          {/* Header */}
          <div className="setup-card__header">
            <span className="setup-card__title">Document Setup</span>
            <div className="setup-card__tabs">
              <button
                className={`tab-btn ${activeTab === 'sign' ? 'tab-btn--active' : 'tab-btn--inactive'}`}
                onClick={() => setActiveTab('sign')}
              >
                Sign Yourself
              </button>
              <button
                className={`tab-btn ${activeTab === 'request' ? 'tab-btn--active' : 'tab-btn--inactive'}`}
                onClick={() => setActiveTab('request')}
              >
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
                <svg className="template-chevron" width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
              </svg>
              <span>
                {uploadedFile ? uploadedFile : 'Click or drag file here to upload'}
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={handleFile}
              />
            </div>
          </div>

          {/* Signer + Document Title */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Signer</label>
              <input
                type="text"
                className="form-input"
                placeholder="You (Auto-filled)"
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="form-label">Document Title</label>
              <input
                type="text"
                className="form-input"
                value={docTitle}
                onChange={e => setDocTitle(e.target.value)}
                placeholder="NDA-Partner Discussion"
              />
            </div>
          </div>

          {/* Note */}
          <div className="form-group">
            <label className="form-label">Note (Optional)</label>
            <textarea
              className="form-textarea"
              placeholder="Adding a personal note for my own records..."
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </div>

          {/* Bottom: Preview + Field Properties */}
          <div className="bottom-section">

            {/* Document Preview */}
            <div className="doc-preview">
              <div className="doc-preview__header">
                <span className="doc-preview__title">Document Preview</span>
                <div className="doc-preview__zoom">
                  <button className="doc-preview__zoom-btn" onClick={zoomOut} aria-label="Zoom out">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </button>
                  <span>{zoom}%</span>
                  <button className="doc-preview__zoom-btn" onClick={zoomIn} aria-label="Zoom in">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="11" y1="8" x2="11" y2="14"/>
                      <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="doc-preview__canvas">
                {uploadedFile ? (
                  <div className="doc-preview__filename">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                      stroke="#FF0915" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
                <select
                  className="field-type-select"
                  value={fieldType}
                  onChange={e => setFieldType(e.target.value)}
                >
                  <option>Signature</option>
                  <option>Initials</option>
                  <option>Date</option>
                  <option>Text</option>
                </select>
              </div>

              <div className="required-row">
                <span className="required-label">Required</span>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={required}
                    onChange={e => setRequired(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div>
                <div className="field-props__label">Assigned To</div>
                <input
                  type="text"
                  className="assigned-input"
                  placeholder="You"
                />
              </div>

              <button className="btn-share">Share</button>
            </div>

          </div>{/* /bottom-section */}
        </div>{/* /setup-card */}

      </div>{/* /main */}
{/* Mobile Bottom Nav */}
<nav className="mobile-bottom-nav">
  <button className="mobile-bottom-nav__item" onClick={() => navigate('/')}>
    <span className="mobile-bottom-nav__icon">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 21 9 12 15 12 15 21"/>
      </svg>
    </span>
    <span>Dashboard</span>
  </button>
  <button className="mobile-bottom-nav__item" onClick={() => navigate('/sign-yourself')}>
    <svg width="22" height="22" viewBox="0 0 24 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2.06641H9C8.44772 2.06641 8 2.52905 8 3.09974V5.16641C8 5.7371 8.44772 6.19974 9 6.19974H15C15.5523 6.19974 16 5.7371 16 5.16641V3.09974C16 2.52905 15.5523 2.06641 15 2.06641Z"/>
      <path d="M16 4.13281H18C18.5304 4.13281 19.0391 4.35055 19.4142 4.73813C19.7893 5.1257 20 5.65137 20 6.19948V20.6661C20 21.2143 19.7893 21.7399 19.4142 22.1275C19.0391 22.5151 18.5304 22.7328 18 22.7328H6C5.46957 22.7328 4.96086 22.5151 4.58579 22.1275C4.21071 21.7399 4 21.2143 4 20.6661V6.19948C4 5.65137 4.21071 5.1257 4.58579 4.73813C4.96086 4.35055 5.46957 4.13281 6 4.13281H8"/>
    </svg>
    <span>Signers</span>
  </button>
  <button className="mobile-bottom-nav__item mobile-bottom-nav__item--active" onClick={() => navigate('/sign-yourself')}>
    <span className="mobile-bottom-nav__icon">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21072 5.46957 2 6 2H14C14.3166 1.99949 14.6301 2.06161 14.9225 2.18277C15.215 2.30394 15.4806 2.48176 15.704 2.706L19.292 6.294C19.5168 6.51751 19.6952 6.78335 19.8167 7.07616C19.9382 7.36898 20.0005 7.68297 20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6Z"/>
        <path d="M14 2V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H20"/>
      </svg>
    </span>
    <span>Documents</span>
  </button>
  <button className="mobile-bottom-nav__item" onClick={() => navigate('/contacts')}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 2V4"/><path d="M7 22V20C7 19.4696 7.21071 18.9609 7.58579 18.5858C7.96086 18.2107 8.46957 18 9 18H15C15.5304 18 16.0391 18.2107 16.4142 18.5858C16.7893 18.9609 17 19.4696 17 20V22"/>
      <path d="M8 2V4"/>
      <path d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"/>
      <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"/>
    </svg>
    <span>Contacts</span>
  </button>
  <button className="mobile-bottom-nav__item" onClick={() => navigate('/settings')}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
    <span>Settings</span>
  </button>
</nav>
</div>
  );
}