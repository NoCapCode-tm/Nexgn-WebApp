import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Topbar from "../../components/Layout/Topbar";
import DocumentEditor from "../documents/DocumentEditor";
import { API_URL } from "../../config";
import { PDFDocument } from "pdf-lib"; // NEW: For merging multiple PDFs

import "../../styles/BaseLayout.css";
import "../dashboard/Dashboard.css";
import "./SignYourself.css";
import axios from "axios";
import { toast } from "react-toastify";

// =======================================================
// 1. TEMPLATE DROPDOWN COMPONENT
// =======================================================
function TemplateDropdown({ value, onChange, options, disabled, onClear }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="template-select-wrap" ref={wrapRef} style={{ opacity: disabled ? 0.5 : 1 }}>
      <button
        type="button"
        className="template-select"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      >
        {value?.templateid?.name || "Select a Template"}
      </button>

      {value && !disabled ? (
        <button 
          type="button"
          onClick={(e) => { e.stopPropagation(); onClear(); }}
          style={{
            position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
            background: "#ffebeb", border: "none", borderRadius: "50%",
            width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center",
            color: "#ff0915", cursor: "pointer", zIndex: 10
          }}
          title="Clear template"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      ) : (
        <svg
          className={`template-chevron${open ? " template-chevron--open" : ""}`}
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}

      {open && !disabled && (
        <ul className="template-dropdown-menu">
          {options.map((opt) => (
            <li
              key={opt.templateid._id}
              className={`template-dropdown-option${value?.templateid?._id === opt.templateid._id ? " template-dropdown-option--active" : ""}`}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt.templateid.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// =======================================================
// 2. CONTACT BOOK AUTOCOMPLETE COMPONENT
// =======================================================
function ContactAutocomplete({ value, onChange, onSelect, contacts, placeholder, type = "text" }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const matches = contacts.filter(c => 
    c.name.toLowerCase().includes(value.toLowerCase()) || 
    c.email.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={wrapRef}>
      <input
        type={type}
        className="form-input"
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        style={{ width: '100%' }}
      />
      {open && matches.length > 0 && value.length > 0 && (
        <ul className="template-dropdown-menu" style={{ maxHeight: '180px', overflowY: 'auto' }}>
          {matches.map(c => (
            <li
              key={c._id || c.email}
              className="template-dropdown-option"
              onClick={() => { onSelect(c); setOpen(false); }}
            >
              <div style={{ fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>{c.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// =======================================================
// 3. MAIN SIGN YOURSELF COMPONENT
// =======================================================
export default function SignYourself() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = location.pathname === "/request-signature" ? "request" : "sign";
  const [view, setView] = useState("form");
  const [authenticated, setAuthenticated] = useState(null);
  
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileObj, setUploadedFileObj] = useState(null);
  const [docTitle, setDocTitle] = useState("");
  const [note, setNote] = useState(
    activeTab === "request" 
      ? "Please review this document and sign in the designated fields to confirm your acceptance." 
      : "Adding a personal note for my own records..."
  );
  const [expiresIn, setExpiresIn] = useState("7"); 
  
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const fileInputRef = useRef(null);
  const [allTemplates, setAllTemplates] = useState([]);
  const [contactBook, setContactBook] = useState([]); // NEW: Contact Book State
  const [loading, setLoading] = useState(false);
  const [signers, setSigners] = useState([{ name: "", email: "" }]);

  // Fetch Templates & Contacts
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [tempRes, contactRes] = await Promise.all([
          axios.get(`${API_URL}template/gettemplate`, { withCredentials: true }),
          axios.get(`${API_URL}contact/getcontact`, { withCredentials: true }) // Fetch Contacts
        ]);
        setAllTemplates(tempRes.data.message);
        setContactBook(contactRes.data.message || []);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Verify User
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(`${API_URL}admin/me`, { withCredentials: true });
        setAuthenticated(response.data.message);
      } catch (err) {
        setAuthenticated(false);
      }
    };
    verifyUser();
  }, []);

  async function getClientIPs() {
    const [ipv4Res, ipv6Res] = await Promise.allSettled([
      fetch("https://api.ipify.org?format=json"),
      fetch("https://api6.ipify.org?format=json"),
    ]);
    const ipv4 = ipv4Res.status === "fulfilled" ? (await ipv4Res.value.json()).ip : null;
    const ipv6 = ipv6Res.status === "fulfilled" ? (await ipv6Res.value.json()).ip : null;
    return { ipv4, ipv6 };
  }

  // --- MULTIPLE PDF MERGE LOGIC ---
  const processFiles = async (files) => {
    if (!files || files.length === 0) return;

    if (files.length === 1) {
      setUploadedFile(files[0].name);
      setUploadedFileObj(files[0]);
      if (!docTitle) setDocTitle(files[0].name.replace(".pdf", ""));
      return;
    }

    setLoading(true);
    toast.info(`Merging ${files.length} documents...`);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedPdfBytes = await mergedPdf.save();
      const mergedFile = new File([mergedPdfBytes], "Merged_Document.pdf", { type: "application/pdf" });

      setUploadedFile(`Merged ${files.length} Documents.pdf`);
      setUploadedFileObj(mergedFile);
      if (!docTitle) setDocTitle("Merged Document Package");
      toast.success("Documents merged successfully!");
    } catch (err) {
      toast.error("Failed to merge PDFs. Please ensure all files are valid.");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    if (authenticated.role === "Admin" || authenticated?.permissions?.includes("Documents-Upload")) {
      const files = Array.from(e.target.files).filter(f => f.type === "application/pdf");
      processFiles(files);
    } else {
      toast.error("You do not have permission to Upload documents.");
    }
  };

  // --- STRICT NEXT BUTTON VALIDATION ---
  const handleNext = async (e) => {
    e.preventDefault();

    // Validation 1: Must have a document
    if (!selectedTemplate && !uploadedFileObj) {
      return toast.error("Please select a template or upload a document to begin.");
    }

    // Validation 2: Must have a Title
    if (!docTitle.trim()) {
      return toast.error("Please provide a document title to proceed to the workspace.");
    }

    // Validation 3: Must complete all Signer Details (for Request)
    if (activeTab === "request") {
      for (let i = 0; i < signers.length; i++) {
        if (!signers[i].name.trim() || !signers[i].email.trim()) {
          return toast.error("Please complete all required signer details (Name and Email) to proceed to the workspace.");
        }
      }
    }

    setLoading(true);

    const applicants = activeTab === "sign"
      ? [{ name: authenticated?.name || "", email: authenticated?.email || "" }]
      : signers;

    // If using a Template, hit API immediately
    if (selectedTemplate) {
      try {
        const { ipv4 } = await getClientIPs();
        const response = await axios.post(
          `${API_URL}document/create`,
          {
            title: docTitle,
            templateid: selectedTemplate.templateid._id,
            senderip: ipv4,
            pathname: location.pathname,
            applicants: applicants,
            expiry: activeTab === "request" ? expiresIn : undefined,
            note: note,
          },
          { withCredentials: true }
        );

        if (location.pathname === "/sign-yourself") {
          navigate(`/document/${response.data.message}`);
        } else {
          navigate("/documents");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Something Went Wrong");
      } finally {
        setLoading(false);
      }
      return;
    }

    // If using Uploaded File, go to Editor
    if (uploadedFileObj) {
      setView("editor");
      setLoading(false);
      return;
    }
  };

  const handleTabChange = (tab) => {
    navigate(tab === "request" ? "/request-signature" : "/sign-yourself");
    setSelectedTemplate("");
    setUploadedFile(null);
    setUploadedFileObj(null);
    setDocTitle("");
    
    if (tab === "request") {
      setNote("Please review this document and sign in the designated fields to confirm your acceptance.");
      setExpiresIn("7");
      setSigners([{ name: "", email: "" }]);
    } else {
      setNote("Adding a personal note for my own records...");
      setSigners([{ name: authenticated?.name, email: authenticated?.email }]);
    }
  };

  const addSigner = () => setSigners([...signers, { name: "", email: "" }]);

  if (view === "editor") {
    return (
      <div className="sign-yourself-editor-no-roles">
        <DocumentEditor
          title={docTitle || uploadedFile || "Untitled Document"}
          file={uploadedFileObj}
          currentSigners={activeTab === "sign" ? { name: authenticated?.name || "", email: authenticated?.email || "" } : null}
          signers={signers}
          expiresIn={expiresIn}
          onBack={() => setView("form")}
        />
      </div>
    );
  }

  const renderUploadZone = () => {
    const isDisabled = !!selectedTemplate;

    return (
      <div>
        <div className="section-label">Upload Document(s) <span style={{color: '#9ca3af', fontWeight: 'normal'}}>- Select multiple PDFs to merge</span></div>
        <div
          className="upload-zone"
          style={{ opacity: isDisabled ? 0.5 : 1, cursor: isDisabled ? 'not-allowed' : 'pointer', position: 'relative' }}
          onClick={() => {
            if (!isDisabled && (authenticated.role === "Admin" || authenticated?.permissions?.includes("Documents-Upload"))) {
              fileInputRef.current.click();
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (isDisabled) return;
            const files = Array.from(e.dataTransfer.files).filter(f => f.type === "application/pdf");
            processFiles(files);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7.5 9.75095C7.82209 10.1815 8.23302 10.5378 8.70491 10.7957C9.17681 11.0535 9.69863 11.2068 10.235 11.2452C10.7713 11.2836 11.3097 11.2062 11.8135 11.0183C12.3173 10.8303 12.7748 10.5363 13.155 10.156L15.405 7.90595C16.0881 7.19869 16.4661 6.25143 16.4575 5.2682C16.449 4.28496 16.0546 3.34441 15.3593 2.64913C14.664 1.95385 13.7235 1.55947 12.7403 1.55092C11.757 1.54238 10.8098 1.92036 10.1025 2.60345L8.8125 3.88595" stroke="#666666" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.5006 8.24992C10.1785 7.81933 9.76762 7.46304 9.29573 7.20522C8.82383 6.9474 8.30201 6.79409 7.76565 6.75567C7.22929 6.71726 6.69095 6.79465 6.18713 6.98259C5.68331 7.17053 5.2258 7.46462 4.84564 7.84492L2.59564 10.0949C1.91255 10.8022 1.53457 11.7494 1.54311 12.7327C1.55165 13.7159 1.94604 14.6565 2.64132 15.3517C3.3366 16.047 4.27715 16.4414 5.26038 16.45C6.24362 16.4585 7.19088 16.0805 7.89814 15.3974L9.18064 14.1149" stroke="#666666" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{uploadedFile ? uploadedFile : "Click or drag PDFs here to upload"}</span>

          {uploadedFile && !isDisabled && (
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setUploadedFile(null);
                setUploadedFileObj(null);
                if(fileInputRef.current) fileInputRef.current.value = "";
              }}
              style={{
                position: 'absolute', right: '16px', background: '#ffebeb', border: 'none', 
                borderRadius: '50%', width: '28px', height: '28px', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', color: '#ff0915', cursor: 'pointer'
              }}
              title="Remove file"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          )}

          {/* NEW: multiple attribute allows selecting many files at once */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple
            className="admin-file-input-hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    );
  };

  return (
    <Layout className="admin-sign-yourself-page">
      <>
        <Topbar
          title={activeTab === "sign" ? "Sign Yourself" : "Create Signature Request"}
          subtitle={activeTab === "sign" ? "Create and sign a document where you are the signer" : "Send a document for signing or sign it yourself"}
          actionButton={null}
        />

        <div className="mobile-page-header">
          <div className="mobile-page-header__container">
            <div className="mobile-page-header__titles">
              <h1 className="topbar__title">{activeTab === "sign" ? "Sign Yourself" : "Create Signature Request"}</h1>
              <p className="topbar__sub">{activeTab === "sign" ? "Create and sign a document where you are the signer" : "Send a document for signing or sign it yourself"}</p>
            </div>
          </div>
          <div className="mobile-page-header__divider" />
        </div>

        <div className="mobile-tabs-container">
          <button className={`tab-btn ${activeTab === "sign" ? "tab-btn--active" : "tab-btn--inactive"}`} onClick={() => handleTabChange("sign")}>Sign Yourself</button>
          <button className={`tab-btn ${activeTab === "request" ? "tab-btn--active" : "tab-btn--inactive"}`} onClick={() => handleTabChange("request")}>Request Signature</button>
        </div>

        <div className="setup-card">
          <div className="setup-card-top">
            <div className="setup-card__header">
              <span className="setup-card__title">Document Setup</span>
              <div className="setup-card__tabs setup-card__tabs--desktop-only">
                <button className={`tab-btn ${activeTab === "sign" ? "tab-btn--active" : "tab-btn--inactive"}`} onClick={() => handleTabChange("sign")}>Sign Yourself</button>
                <button className={`tab-btn ${activeTab === "request" ? "tab-btn--active" : "tab-btn--inactive"}`} onClick={() => handleTabChange("request")}>Request Signature</button>
              </div>
            </div>

            {activeTab === "sign" ? (
              <>
                <div>
                  <div className="section-label">Choose Template</div>
                  <div className="template-row">
                    <TemplateDropdown value={selectedTemplate} onChange={setSelectedTemplate} options={allTemplates} disabled={!!uploadedFile} onClear={() => setSelectedTemplate("")} />
                  </div>
                </div>

                <div className="or-divider">OR</div>

                {renderUploadZone()}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Signer</label>
                    <input type="text" value={authenticated?.name || ""} className="form-input" placeholder={signers[0]?.name} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Document Title <span style={{color: '#ff0915'}}>*</span></label>
                    <input type="text" className="form-input" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} placeholder="NDA-Partner Discussion" required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Note (Optional)</label>
                  <textarea className="form-textarea" placeholder="Adding a personal note for my own records..." value={note} onChange={(e) => setNote(e.target.value)} />
                </div>

                <button className="btn-share btn-share--compact" onClick={handleNext} disabled={loading} style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? "Processing..." : "Next"}
                </button>
              </>
            ) : (
              <>
                <div>
                  <div className="section-label">Choose Template</div>
                  <div className="template-row">
                    <TemplateDropdown value={selectedTemplate} onChange={setSelectedTemplate} options={allTemplates} disabled={!!uploadedFile} onClear={() => setSelectedTemplate("")} />
                  </div>
                </div>

                <div className="or-divider">OR</div>

                {renderUploadZone()}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Document Title <span style={{color: '#ff0915'}}>*</span></label>
                    <input type="text" className="form-input" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} placeholder="NDA - Blair Croft" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Expires In (Days)</label>
                    <div className="input-with-icon-wrap">
                      <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                      <input type="number" min="1" className="form-input" value={expiresIn} onChange={(e) => setExpiresIn(e.target.value)} placeholder="7" />
                    </div>
                  </div>
                </div>

                {/* SIGNER DETAILS WITH CONTACT BOOK AUTOCOMPLETE */}
                <div>
                  <div className="section-label">Signer Details</div>
                  <div className="signer-box">
                    {signers.map((signer, index) => (
                      <div className="signer-row" key={index}>
                        <div className="form-group admin-form-group-flex">
                          <label className="form-label">Signer Name <span style={{color: '#ff0915'}}>*</span></label>
                          <ContactAutocomplete 
                            value={signer.name}
                            contacts={contactBook}
                            placeholder={index === 0 ? "Blair Croft" : "Signer Name"}
                            onChange={(val) => {
                              const newSigners = [...signers];
                              newSigners[index].name = val;
                              setSigners(newSigners);
                            }}
                            onSelect={(c) => {
                              const newSigners = [...signers];
                              newSigners[index].name = c.name;
                              newSigners[index].email = c.email;
                              setSigners(newSigners);
                            }}
                          />
                        </div>
                        <div className="form-group admin-form-group-flex">
                          <label className="form-label">Signer Email <span style={{color: '#ff0915'}}>*</span></label>
                          <ContactAutocomplete 
                            type="email"
                            value={signer.email}
                            contacts={contactBook}
                            placeholder={index === 0 ? "blair.croft@example.com" : "Signer Email"}
                            onChange={(val) => {
                              const newSigners = [...signers];
                              newSigners[index].email = val;
                              setSigners(newSigners);
                            }}
                            onSelect={(c) => {
                              const newSigners = [...signers];
                              newSigners[index].name = c.name;
                              newSigners[index].email = c.email;
                              setSigners(newSigners);
                            }}
                          />
                        </div>
                        <div className="signer-badge-wrap">
                          <div className="signer-badge">Signer {index + 1}</div>
                          {index > 0 ? (
                            <button className="btn-remove-signer" onClick={(e) => { e.preventDefault(); setSigners(signers.filter((_, i) => i !== index)); }} title="Remove Signer">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                          ) : <div className="remove-placeholder" />}
                        </div>
                      </div>
                    ))}
                    <button className="btn-add-signer" onClick={(e) => { e.preventDefault(); addSigner(); }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>
                      Add Another Signer
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Note (Optional)</label>
                  <textarea className="form-textarea" placeholder="Please review this offer letter and sign in the designated fields to confirm your acceptance." value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
              </>
            )}
          </div>

          {activeTab !== "sign" && (
            <button className="btn-share btn-share--compact" onClick={handleNext} disabled={loading} style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? "Processing..." : "Next"}
            </button>
          )}
        </div>
      </>
    </Layout>
  );
}