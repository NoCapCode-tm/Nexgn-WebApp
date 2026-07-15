import { useState, useRef } from "react";
import MemberLayout from "../components/MemberLayout";
import MemberTopbar from "../components/MemberTopbar";

import "../css/MemberBaseLayout.css";
import "../css/MemberSignYourself.css";
import "../css/MemberTemplates.css";

export default function MemberTemplates({ onCreate }) {
  const [templateName, setTemplateName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [docTitle, setDocTitle] = useState("");
  const [note, setNote] = useState("");
  const fileInputRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) setUploadedFile(file.name);
  }

  return (
    <MemberLayout className="member-templates-page">
      <>
        <MemberTopbar
          title="Create Template"
          subtitle="Create reusable templates for faster document signing."
          actionButton={null}
        />

        <div className="mobile-page-header">
          <h1 className="topbar__title">Create Template</h1>
          <p className="topbar__sub">
            Create reusable templates for faster document signing.
          </p>
          <hr className="mobile-header-divider" />
        </div>

        <div className="setup-card">
          <div className="setup-card__header">
            <span className="setup-card__title">Template Setup</span>
          </div>

          <div>
            <div className="section-label">Create Template</div>
            <div className="template-create-row">
              <input
                type="text"
                className="form-input"
                placeholder="Template Name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
              <button className="btn-create" onClick={() => onCreate && onCreate(templateName)}>
                <span className="btn-create__text">Create</span>
                <svg
                  className="btn-create__icon"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="35"
                    height="35"
                    rx="7"
                    fill="url(#paint0_linear_1216_39051)"
                  />
                  <path
                    d="M17.5 10V20"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.6654 14.1667L17.4987 10L13.332 14.1667"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M25 20V23.3333C25 23.7754 24.8244 24.1993 24.5118 24.5118C24.1993 24.8244 23.7754 25 23.3333 25H11.6667C11.2246 25 10.8007 24.8244 10.4882 24.5118C10.1756 24.1993 10 23.7754 10 23.3333V20"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1216_39051"
                      x1="34.091"
                      y1="0.569405"
                      x2="-4.68067"
                      y2="28.5272"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#960101" />
                      <stop offset="1" stopColor="#FF0915" />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
            </div>
          </div>

          <div className="or-divider">OR</div>

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
                {uploadedFile
                  ? uploadedFile
                  : "Click or drag file here to upload"}
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
            <label className="form-label">Note (Optional)</label>
            <textarea
              className="form-textarea"
              placeholder="Please review this offer letter and sign in the designated fields to confirm your acceptance."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="template-setup-footer">
            <button
              className="btn-create"
              onClick={() => onCreate && onCreate(docTitle || uploadedFile || "Untitled Template")}
            >
              Next
            </button>
          </div>
        </div>
      </>
    </MemberLayout>
  );
}
