import { useState } from "react";
import MemberLayout from "../components/MemberLayout";
import MemberTopbar from "../components/MemberTopbar";

import "../css/MemberBaseLayout.css";
import "../css/MemberDocuments.css";
import "../css/MemberTemplates.css";

const MOCK_TEMPLATES = [
  { id: 1, title: "Project Proposal", note: "Send it to client", owner: "Me" },
  { id: 2, title: "Policy Acknowledgement", note: "Please sign before 12th", owner: "Me" },
  { id: 3, title: "NDA Agreement", note: "Review and approve", owner: "Me" },
  { id: 4, title: "NDA Agreement", note: "Review and approve", owner: "Me" },
  { id: 5, title: "NDA Agreement", note: "NDA with vendor", owner: "Me" },
  { id: 6, title: "Employment Offer Letter", note: "Final offer shared", owner: "Me" },
  { id: 7, title: "Vendor Contract", note: "Contact pending", owner: "Me" },
  { id: 8, title: "Freelancer Agreement", note: "Yearly freelance", owner: "Me" },
  { id: 9, title: "Shareholder Resolution", note: "Internal resolution", owner: "Me" },
  { id: 10, title: "Vendor Contract", note: "Contact pending", owner: "Me" },
];

export default function MemberTemplatesList({ onAddTemplate }) {
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const filtered = MOCK_TEMPLATES.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const toolbar = (
    <div className="member-docs-topbar-actions template-toolbar-actions">
      <div className="member-docs-search-wrap">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="#999999" strokeWidth="1.5" />
          <path
            d="M14 14L11 11"
            stroke="#999999"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          className="member-docs-search-input"
          placeholder="Search Documents"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button className="member-docs-add-btn" onClick={onAddTemplate}>
        <span className="add-btn-full">+ Add Template</span>
        <span className="member-docs-add-btn-short">+</span>
      </button>
    </div>
  );

  return (
    <MemberLayout className="member-templates-list-page">
      <>
        <MemberTopbar
          title="Manage Templates"
          subtitle="Manage all your reusable document templates in one place."
          actionButton={toolbar}
        />

        <div className="mobile-page-header">
          <div className="topbar__bottom-row">
            <div>
              <div className="topbar__title">Manage Templates</div>
              <div className="topbar__sub">
                Manage all your reusable document templates in one place.
              </div>
            </div>
          </div>
          <hr className="mobile-header-divider" />
          <div className="mobile-filter-row">{toolbar}</div>
        </div>

        <div className="member-docs-table__header template-docs-cols">
          <span>TITLE</span>
          <span>NOTE</span>
          <span>OWNER</span>
          <span>ACTION</span>
        </div>

        <div className="member-docs-section">
          <div className="member-docs-table">
            {filtered.map((t) => (
              <div className="member-doc-row template-docs-cols" key={t.id}>
                <span className="member-doc-row__title">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="member-doc-row__icon"
                  >
                    <path
                      d="M7.84065 28.7542C7.14735 28.7542 6.48245 28.4788 5.99221 27.9885C5.50197 27.4983 5.22656 26.8334 5.22656 26.1401V5.22738C5.22656 4.53408 5.50197 3.86917 5.99221 3.37893C6.48245 2.8887 7.14735 2.61329 7.84065 2.61329H18.297C18.7108 2.61261 19.1206 2.6938 19.5028 2.85217C19.885 3.01054 20.2322 3.24297 20.5242 3.53606L25.2139 8.22574C25.5078 8.51787 25.7409 8.86533 25.8997 9.24806C26.0585 9.63078 26.14 10.0412 26.1393 10.4556V26.1401C26.1393 26.8334 25.8639 27.4983 25.3736 27.9885C24.8834 28.4788 24.2185 28.7542 23.5252 28.7542H7.84065Z"
                      stroke={`url(#tplIconGrad1_${t.id})`}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.2969 2.61328V9.14851C18.2969 9.49516 18.4346 9.82761 18.6797 10.0727C18.9248 10.3178 19.2573 10.4556 19.6039 10.4556H26.1391"
                      stroke={`url(#tplIconGrad2_${t.id})`}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.0711 11.7637H10.457"
                      stroke={`url(#tplIconGrad3_${t.id})`}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.9134 16.9922H10.457"
                      stroke={`url(#tplIconGrad4_${t.id})`}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.9134 22.2207H10.457"
                      stroke={`url(#tplIconGrad5_${t.id})`}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient id={`tplIconGrad1_${t.id}`} x1="25.5962" y1="3.03856" x2="-0.82388" y2="18.2795" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#960101" />
                        <stop offset="1" stopColor="#FF0915" />
                      </linearGradient>
                      <linearGradient id={`tplIconGrad2_${t.id}`} x1="25.9355" y1="2.74086" x2="17.2481" y2="9.00524" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#960101" />
                        <stop offset="1" stopColor="#FF0915" />
                      </linearGradient>
                      <linearGradient id={`tplIconGrad3_${t.id}`} x1="13.0032" y1="11.7799" x2="12.0365" y2="13.6021" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#960101" />
                        <stop offset="1" stopColor="#FF0915" />
                      </linearGradient>
                      <linearGradient id={`tplIconGrad4_${t.id}`} x1="20.6418" y1="17.0085" x2="20.3375" y2="19.3031" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#960101" />
                        <stop offset="1" stopColor="#FF0915" />
                      </linearGradient>
                      <linearGradient id={`tplIconGrad5_${t.id}`} x1="20.6418" y1="22.237" x2="20.3375" y2="24.5316" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#960101" />
                        <stop offset="1" stopColor="#FF0915" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {t.title}
                </span>
                <span className="member-doc-row__note">{t.note}</span>
                <span className="member-doc-row__cell">{t.owner}</span>
                <span className="member-doc-row__menu">
                  <button
                    className="member-doc-row__menu-trigger"
                    aria-label="More actions"
                    onClick={() => setOpenMenuId(openMenuId === t.id ? null : t.id)}
                  >
                    &#8942;
                  </button>
                  {openMenuId === t.id && (
                    <div className="action-menu">
                      <button className="action-menu__item">View</button>
                      <div className="action-menu__divider" />
                      <button className="action-menu__item action-menu__item--danger">Revoke</button>
                    </div>
                  )}
                </span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="member-docs-empty-state">No templates found.</div>
            )}
          </div>
        </div>
      </>
    </MemberLayout>
  );
}
