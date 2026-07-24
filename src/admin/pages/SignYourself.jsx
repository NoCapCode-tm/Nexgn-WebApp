import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import useWindowWidth from "../components/useWindowWidth";
import TemplateEditor from "./TemplateEditor";

import "../css/BaseLayout.css";
import "../css/Dashboard.css";
import "../css/SignYourself.css";

function TemplateDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="template-select-wrap" ref={wrapRef}>
      <button
        type="button"
        className="template-select"
        onClick={() => setOpen((o) => !o)}
      >
        {value || "Select a Template"}
      </button>
      <svg
        className={`template-chevron${open ? " template-chevron--open" : ""}`}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
      {open && (
        <ul className="template-dropdown-menu">
          {options.map((opt) => (
            <li
              key={opt}
              className={`template-dropdown-option${value === opt ? " template-dropdown-option--active" : ""}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SignYourself() {
  const location = useLocation();
  const navigate = useNavigate();
  const width = useWindowWidth();

  const activeTab =
    location.pathname === "/admin-request-signature" ? "request" : "sign";
  const [view, setView] = useState("form");

  const [zoom, setZoom] = useState(100);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileObj, setUploadedFileObj] = useState(null);
  const [docTitle, setDocTitle] = useState("");
  const [note, setNote] = useState("");
  const [required, setRequired] = useState(true);
  const [fieldType, setFieldType] = useState("Signature");
  const [assignedTo, setAssignedTo] = useState("You");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const fileInputRef = useRef(null);

  // Request Signature specific states
  const [systemRole, setSystemRole] = useState("Member / Employee");
  const [assignedToRole, setAssignedToRole] = useState(
    "Client / External signer",
  );
  const [expiresIn, setExpiresIn] = useState("");
  const [signers, setSigners] = useState([{ name: "", email: "" }]);
  const [fieldAssignedTo, setFieldAssignedTo] = useState(
    "Fresher / Freelancer / Intern",
  );

  const handleTabChange = (tab) => {
    navigate(
      tab === "request" ? "/admin-request-signature" : "/admin-sign-yourself",
    );
    if (tab === "request") {
      setDocTitle("");
      setNote("");
      setFieldType("NDA");
      setRequired(true);
      setExpiresIn("");
      setSigners([{ name: "", email: "" }]);
    } else {
      setDocTitle("");
      setNote("");
      setFieldType("Signature");
      setRequired(true);
    }
  };

  const addSigner = () => {
    setSigners([...signers, { name: "", email: "" }]);
  };

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file.name);
      setUploadedFileObj(file);
    }
  }

  function zoomIn() {
    setZoom((z) => Math.min(z + 10, 200));
  }
  function zoomOut() {
    setZoom((z) => Math.max(z - 10, 50));
  }

  if (view === "editor") {
    return (
      <div className="sign-yourself-editor-no-roles">
        <TemplateEditor
          templateName={docTitle || uploadedFile || "Untitled Document"}
          templateFile={uploadedFileObj}
          onBack={() => setView("form")}
        />
      </div>
    );
  }

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
          if (file) {
            setUploadedFile(file.name);
            setUploadedFileObj(file);
          }
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M7.5 9.75095C7.82209 10.1815 8.23302 10.5378 8.70491 10.7957C9.17681 11.0535 9.69863 11.2068 10.235 11.2452C10.7713 11.2836 11.3097 11.2062 11.8135 11.0183C12.3173 10.8303 12.7748 10.5363 13.155 10.156L15.405 7.90595C16.0881 7.19869 16.4661 6.25143 16.4575 5.2682C16.449 4.28496 16.0546 3.34441 15.3593 2.64913C14.664 1.95385 13.7235 1.55947 12.7403 1.55092C11.757 1.54238 10.8098 1.92036 10.1025 2.60345L8.8125 3.88595"
            stroke="#666666"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5006 8.24992C10.1785 7.81933 9.76762 7.46304 9.29573 7.20522C8.82383 6.9474 8.30201 6.79409 7.76565 6.75567C7.22929 6.71726 6.69095 6.79465 6.18713 6.98259C5.68331 7.17053 5.2258 7.46462 4.84564 7.84492L2.59564 10.0949C1.91255 10.8022 1.53457 11.7494 1.54311 12.7327C1.55165 13.7159 1.94604 14.6565 2.64132 15.3517C3.3366 16.047 4.27715 16.4414 5.26038 16.45C6.24362 16.4585 7.19088 16.0805 7.89814 15.3974L9.18064 14.1149"
            stroke="#666666"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>
          {uploadedFile ? uploadedFile : "Click or drag file here to upload"}
        </span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="admin-file-input-hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  );

  return (
    <Layout className="admin-sign-yourself-page">
      <>
        {/* Desktop Topbar */}
        <Topbar
          title={
            activeTab === "sign" ? "Sign Yourself" : "Create Signature Request"
          }
          subtitle={
            activeTab === "sign"
              ? "Create and sign a document where you are the signer"
              : "Send a document for signing or sign it yourself"
          }
          actionButton={null} // hide upload document button since we are already on sign page
        />

        {/* Mobile Page Header - same structure as Dashboard */}
        <div className="mobile-page-header">
          <div className="mobile-page-header__container">
            <div className="mobile-page-header__titles">
              <h1 className="topbar__title">
                {activeTab === "sign"
                  ? "Sign Yourself"
                  : "Create Signature Request"}
              </h1>
              <p className="topbar__sub">
                {activeTab === "sign"
                  ? "Create and sign a document where you are the signer"
                  : "Send a document for signing or sign it yourself"}
              </p>
            </div>
          </div>
          <div className="mobile-page-header__divider" />
        </div>

        {/* MOBILE TABS - same position as dashboard mobile-cta-row */}
        <div className="mobile-tabs-container">
          <button
            className={`tab-btn ${activeTab === "sign" ? "tab-btn--active" : "tab-btn--inactive"}`}
            onClick={() => handleTabChange("sign")}
          >
            Sign Yourself
          </button>
          <button
            className={`tab-btn ${activeTab === "request" ? "tab-btn--active" : "tab-btn--inactive"}`}
            onClick={() => handleTabChange("request")}
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
                  className={`tab-btn ${activeTab === "sign" ? "tab-btn--active" : "tab-btn--inactive"}`}
                  onClick={() => handleTabChange("sign")}
                >
                  Sign Yourself
                </button>
                <button
                  className={`tab-btn ${activeTab === "request" ? "tab-btn--active" : "tab-btn--inactive"}`}
                  onClick={() => handleTabChange("request")}
                >
                  Request Signature
                </button>
              </div>
            </div>

            {activeTab === "sign" ? (
              <>
                <div>
                  <div className="section-label">Choose Template</div>
                  <div className="template-row">
                    <TemplateDropdown
                      value={selectedTemplate}
                      onChange={setSelectedTemplate}
                      options={[
                        "NDA Template",
                        "Employment Agreement",
                        "Freelance Contract",
                        "Job Offer Letter",
                      ]}
                    />
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
                      onChange={(e) => setDocTitle(e.target.value)}
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
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                <button
                  className="btn-share btn-share--compact"
                  onClick={(e) => {
                    e.preventDefault();
                    setView("editor");
                  }}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <div>
                  <div className="section-label">Choose Template</div>
                  <div className="template-row">
                    <TemplateDropdown
                      value={selectedTemplate}
                      onChange={setSelectedTemplate}
                      options={[
                        "NDA Template",
                        "Employment Agreement",
                        "Freelance Contract",
                        "Job Offer Letter",
                      ]}
                    />
                  </div>
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
                      onChange={(e) => setDocTitle(e.target.value)}
                      placeholder="NDA - Blair Croft"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Expires In</label>
                    <div className="input-with-icon-wrap">
                      <svg
                        className="input-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <input
                        type="text"
                        className="form-input"
                        value={expiresIn}
                        onChange={(e) => setExpiresIn(e.target.value)}
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
                        <div className="form-group admin-form-group-flex">
                          <label className="form-label">Signer</label>
                          <input
                            type="text"
                            className="form-input"
                            value={signer.name}
                            onChange={(e) => {
                              const newSigners = [...signers];
                              newSigners[index].name = e.target.value;
                              setSigners(newSigners);
                            }}
                            placeholder={
                              index === 0 ? "Blair Croft" : "Signer Name"
                            }
                          />
                        </div>
                        <div className="form-group admin-form-group-flex">
                          <label className="form-label">Signer Email</label>
                          <input
                            type="text"
                            className="form-input"
                            value={signer.email}
                            onChange={(e) => {
                              const newSigners = [...signers];
                              newSigners[index].email = e.target.value;
                              setSigners(newSigners);
                            }}
                            placeholder={
                              index === 0
                                ? "blair.croft@example.com"
                                : "Signer Email"
                            }
                          />
                        </div>
                        <div className="signer-badge-wrap">
                          <div className="signer-badge">Signer {index + 1}</div>
                          {index > 0 ? (
                            <button
                              className="btn-remove-signer"
                              onClick={(e) => {
                                e.preventDefault();
                                const newSigners = signers.filter(
                                  (_, i) => i !== index,
                                );
                                setSigners(newSigners);
                              }}
                              title="Remove Signer"
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          ) : (
                            <div className="remove-placeholder" />
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      className="btn-add-signer"
                      onClick={(e) => {
                        e.preventDefault();
                        addSigner();
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="23" y1="11" x2="17" y2="11" />
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
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          {activeTab !== "sign" && (
            <button
              className="btn-share btn-share--compact"
              onClick={(e) => {
                e.preventDefault();
                setView("editor");
              }}
            >
              Next
            </button>
          )}
        </div>
      </>
    </Layout>
  );
}
