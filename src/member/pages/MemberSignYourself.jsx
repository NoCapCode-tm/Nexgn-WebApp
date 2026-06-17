import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, UserCircle } from 'lucide-react';
import MemberSidebar from '../components/MemberSidebar'; 
import MemberMobileNavbar from '../components/MemberMobileNavbar';
import useWindowWidth from '../components/useWindowWidth';

import '../css/MemberBaseLayout.css';
import '../css/MemberDashboard.css';
import '../css/MemberSignYourself.css';

export default function MemberSignYourself() {
  const location = useLocation();
  const navigate = useNavigate();
  const width = useWindowWidth();

  const activeTab = location.pathname === '/member-request-signature' ? 'request' : 'sign';

  const [zoom, setZoom] = useState(100);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [docTitle, setDocTitle] = useState('');
  const [note, setNote] = useState('');
  const [required, setRequired] = useState(true);
  const [fieldType, setFieldType] = useState('Signature');
  const [assignedTo, setAssignedTo] = useState('You');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Request Signature specific states
  const [systemRole, setSystemRole] = useState("Member / Employee");
  const [assignedToRole, setAssignedToRole] = useState("Client / External signer");
  const [expiresIn, setExpiresIn] = useState("");
  const [signers, setSigners] = useState([
    { name: "", email: "" }
  ]);
  const [fieldAssignedTo, setFieldAssignedTo] = useState("Fresher / Freelancer / Intern");


  const handleTabChange = (tab) => {
    navigate(tab === 'request' ? '/member-request-signature' : '/member-sign-yourself');
    if (tab === 'request') {
      setDocTitle('');
      setNote('');
      setFieldType('NDA');
      setRequired(true);
      setExpiresIn('');
      setSigners([
        { name: "", email: "" }
      ]);
    } else {
      setDocTitle('');
      setNote('');
      setFieldType('Signature');
      setRequired(true);
    }
  };

  const addSigner = () => {
    setSigners([...signers, { name: "", email: "" }]);
  };
  
  function handleFile(e) {
    const file = e.target.files[0];
    if (file) setUploadedFile(file.name);
  }

  function zoomIn()  { setZoom(z => Math.min(z + 10, 200)); }
  function zoomOut() { setZoom(z => Math.max(z - 10, 50)); }

  const renderUploadZone = () => (
    <div>
      <div className="section-label">Upload Document (PDF Only)</div>
      <div
        className="upload-zone"
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
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
          className="member-file-input-hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  );

  return (
    <div className="layout member-theme member-sign-yourself-page">
      {mobileNavOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileNavOpen(false)} />
      )}
      <div className={`mobile-sidebar-wrapper ${mobileNavOpen ? "mobile-sidebar-wrapper--open" : ""}`}>
        <MemberSidebar />
      </div>
      <div className="desktop-sidebar-wrapper">
        <MemberSidebar />
      </div>

      <div className="main">
        {/* Mobile Navigation */}
        <header className="mobile-topbar">
          <button className="mobile-topbar__hamburger" onClick={() => {
            if (width >= 769) {
              setMobileNavOpen(true);
            }
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <div className="mobile-topbar__icons">
            <button className="topbar__icon-btn mobile-topbar__search-btn" onClick={(e) => e.preventDefault()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF0915" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
            <button className="topbar__icon-btn" onClick={(e) => e.preventDefault()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF0915" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <button className="topbar__icon-btn" onClick={(e) => e.preventDefault()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF0915" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          </div>
        </header>

        <div className="mobile-page-header">
          <h1 className="topbar__title">
            {activeTab === 'sign' ? 'Sign Yourself' : 'Create Signature Request'}
          </h1>
          <p className="topbar__sub">
            {activeTab === 'sign' ? 'Create and sign a document where you are the signer' : 'Send a document for signing or sign it yourself'}
          </p>
        </div>
        <hr className="mobile-header-divider" />

        <div className="topbar desktop-topbar">
          <div className="topbar__top-row">
            <div className="topbar__icons">
              <button className="topbar__icon-btn" aria-label="Search" onClick={(e) => e.preventDefault()}>
                <Search size={24} color="#FF0915" strokeWidth={1.5} />
              </button>
              <button className="topbar__icon-btn" aria-label="Notifications" onClick={(e) => e.preventDefault()}>
                <Bell size={24} color="#FF0915" strokeWidth={1.5} />
              </button>
              <button className="topbar__icon-btn" aria-label="Profile" onClick={(e) => e.preventDefault()}>
                <UserCircle size={24} color="#FF0915" strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <div className="topbar__bottom-row">
            <div>
              <div className="topbar__title">
                {activeTab === 'sign' ? 'Sign Yourself' : 'Create Signature Request'}
              </div>
              <div className="topbar__sub">
                {activeTab === 'sign' ? 'Create and sign a document where you are the signer' : 'Send a document for signing or sign it yourself'}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE TABS */}
        <div className="mobile-tabs-container">
          <button
            className={`tab-btn ${activeTab === 'sign' ? 'tab-btn--active' : 'tab-btn--inactive'}`}
            onClick={() => handleTabChange('sign')}
          >
            Sign Yourself
          </button>
          <button
            className={`tab-btn ${activeTab === 'request' ? 'tab-btn--active' : 'tab-btn--inactive'}`}
            onClick={() => handleTabChange('request')}
          >
            Request Signature
          </button>
        </div>

        <div className="setup-card">
          <div className="setup-card-top">
          <div className="setup-card__header">
            <span className="setup-card__title">Document Setup</span>
            <div className="setup-card__tabs setup-card__tabs--desktop-only">
              <button
                className={`tab-btn ${activeTab === 'sign' ? 'tab-btn--active' : 'tab-btn--inactive'}`}
                onClick={() => handleTabChange('sign')}
              >
                Sign Yourself
              </button>
              <button
                className={`tab-btn ${activeTab === 'request' ? 'tab-btn--active' : 'tab-btn--inactive'}`}
                onClick={() => handleTabChange('request')}
              >
                Request Signature
              </button>
            </div>
          </div>

          {activeTab === 'sign' ? (
            <>
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
                  <button className="btn-create" onClick={(e) => e.preventDefault()}>
                    <span className="btn-create-text">Create</span>
                    <svg className="btn-create-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="or-divider">OR</div>

              {renderUploadZone()}

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

              <div className="form-group">
                <label className="form-label">Note (Optional)</label>
                <textarea
                  className="form-textarea"
                  placeholder="Adding a personal note for my own records..."
                  value={note}
                  onChange={e => setNote(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="roles-row">
                <div className="form-group">
                  <label className="form-label">System Roles</label>
                  <div className="template-select-wrap">
                    <select
                      className="template-select"
                      value={systemRole}
                      onChange={e => setSystemRole(e.target.value)}
                    >
                      <option>Member / Employee</option>
                      <option>Admin</option>
                      <option>Guest</option>
                    </select>
                    <svg className="template-chevron" width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Assigned To</label>
                  <div className="template-select-wrap">
                    <select
                      className="template-select"
                      value={assignedToRole}
                      onChange={e => setAssignedToRole(e.target.value)}
                    >
                      <option>Client / External signer</option>
                      <option>Employee / Staff</option>
                      <option>Partner</option>
                    </select>
                    <svg className="template-chevron" width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                </div>
                <button className="btn-create" onClick={(e) => { e.preventDefault(); navigate('/member-documents'); }}>
                  <span className="btn-create-text">Create</span>
                  <svg className="btn-create-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </button>
              </div>

              <div className="or-divider">OR</div>

              {renderUploadZone()}

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Document Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={docTitle}
                    onChange={e => setDocTitle(e.target.value)}
                    placeholder="NDA - Blair Croft"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Expires In</label>
                  <div className="input-with-icon-wrap">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <input
                      type="text"
                      className="form-input"
                      value={expiresIn}
                      onChange={e => setExpiresIn(e.target.value)}
                      placeholder="7 days"
                    />
                  </div>
                </div>
              </div>

              {/* Status Badge Mapping */}
              <div>
                <div className="section-label">Signer Details</div>
                <div className="signer-box">
                  {signers.map((signer, index) => (
                    <div className="signer-row" key={index}>
                      <div className="form-group member-form-group-flex">
                        <label className="form-label">Signer</label>
                        <input
                          type="text"
                          className="form-input"
                          value={signer.name}
                          onChange={e => {
                            const newSigners = [...signers];
                            newSigners[index].name = e.target.value;
                            setSigners(newSigners);
                          }}
                          placeholder={index === 0 ? "Blair Croft" : "Signer Name"}
                        />
                      </div>
                      <div className="form-group member-form-group-flex">
                        <label className="form-label">Signer Email</label>
                        <input
                          type="text"
                          className="form-input"
                          value={signer.email}
                          onChange={e => {
                            const newSigners = [...signers];
                            newSigners[index].email = e.target.value;
                            setSigners(newSigners);
                          }}
                          placeholder={index === 0 ? "blair.croft@example.com" : "Signer Email"}
                        />
                      </div>
                      <div className="signer-badge-wrap">
                        <div className="signer-badge">
                          Signer {index + 1}
                        </div>
                        {index > 0 ? (
                          <button
                            className="btn-remove-signer"
                            onClick={(e) => {
                              e.preventDefault();
                              const newSigners = signers.filter((_, i) => i !== index);
                              setSigners(newSigners);
                            }}
                            title="Remove Signer"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"/>
                              <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        ) : (
                          <div className="remove-placeholder" />
                        )}
                      </div>
                    </div>
                  ))}
                  <button className="btn-add-signer" onClick={(e) => { e.preventDefault(); addSigner(); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="8.5" cy="7" r="4"/>
                      <line x1="20" y1="8" x2="20" y2="14"/>
                      <line x1="23" y1="11" x2="17" y2="11"/>
                    </svg>
                    Add Another Signer
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Note (Optional)</label>
                <textarea
                  className="form-textarea"
                  placeholder="Please review this offer letter and sign in the designated fields to confirm your acceptance."
                  value={note}
                  onChange={e => setNote(e.target.value)}
                />
              </div>
            </>
          )}
          </div>

          <div className="bottom-section">
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

            {activeTab === 'sign' ? (
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
                    value={assignedTo}
                    onChange={e => setAssignedTo(e.target.value)}
                    placeholder="You"
                  />
                </div>

                <button className="btn-share" onClick={(e) => { e.preventDefault(); navigate('/member-documents'); }}>Share</button>
              </div>
            ) : (
              <div className="field-props">
                <div className="field-props__title">Field Properties</div>

                <div>
                  <div className="field-props__label">Field Type</div>
                  <input
                    type="text"
                    className="form-input field-props__input-read"
                    value={fieldType}
                    onChange={e => setFieldType(e.target.value)}
                    placeholder="NDA"
                  />
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
                  <div className="template-select-wrap">
                    <select
                      className="template-select select-props"
                      value={fieldAssignedTo}
                      onChange={e => setFieldAssignedTo(e.target.value)}
                    >
                      <option>Fresher / Freelancer / Intern</option>
                      <option>Employee / Staff</option>
                      <option>Client / External signer</option>
                    </select>
                    <svg className="template-chevron" width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                </div>

                <button className="btn-share" onClick={(e) => { e.preventDefault(); navigate('/member-documents'); }}>Share</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <MemberMobileNavbar />
    </div>
  );
}
