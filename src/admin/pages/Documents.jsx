import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../css/Dashboard.css';
import '../css/Documents.css';
import { Search, Bell, UserCircle } from "lucide-react";

const ALL_DOCS = [
  { id: 1, title: 'Project Proposal',           note: 'Send it to client',       signers: 'Jane Doe',       signedAt: '-',              owner: 'Me', status: 'Pending' },
  { id: 2, title: 'Policy Acknowledgement Form', note: 'Please sign before 12th', signers: 'Charlie Brown',   signedAt: 'April 10, 2026', owner: 'Me', status: 'Signed'  },
  { id: 3, title: 'NDA Agreement',               note: 'Review and approve',      signers: 'Bob Jones',       signedAt: 'April 08, 2026', owner: 'Me', status: 'Signed'  },
  { id: 4, title: 'NDA Agreement',               note: 'Review and approve',      signers: 'Bob Jones',       signedAt: '-',              owner: 'Me', status: 'Expired' },
  { id: 5, title: 'NDA Agreement',               note: 'NDA with vendor...',      signers: 'Alice Smith',     signedAt: '-',              owner: 'Me', status: 'Pending' },
  { id: 6, title: 'Employment Offer Letter',     note: 'Final offer shared...',   signers: 'Michael Johnson', signedAt: 'March 9, 2026',  owner: 'Me', status: 'Signed'  },
  { id: 7, title: 'Vendor Contract',             note: 'Contract pending...',     signers: 'Emma Wilson',     signedAt: '-',              owner: 'Me', status: 'Pending' },
  { id: 8, title: 'Freelancer Agreement',        note: 'Yearly freelance...',     signers: 'Daniel Brown',    signedAt: 'March 8, 2026',  owner: 'Me', status: 'Signed'  },
  { id: 9, title: 'Shareholder Resolution',      note: 'Internal resolution...',  signers: '-',               signedAt: 'March 7, 2026',  owner: 'Me', status: 'Signed'  },
  { id:10, title: 'Vendor Contract',             note: 'Contract pending...',     signers: 'Emma Wilson',     signedAt: '-',              owner: 'Me', status: 'Expired' },
];

export default function Documents() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filtered = ALL_DOCS.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) ||
                        d.signers.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'created') return matchSearch && d.owner === 'Me';
    if (activeTab === 'assigned') return matchSearch;
    return matchSearch;
  });

  return (
    <div className="layout">
      {mobileNavOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileNavOpen(false)} />
      )}
      <div className={`mobile-sidebar-wrapper ${mobileNavOpen ? 'mobile-sidebar-wrapper--open' : ''}`}>
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
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <span className="mobile-topbar__title">Documents</span>
          <div className="mobile-topbar__icons">
            <button className="topbar__icon-btn"><Search size={18} color="#FF0915" strokeWidth={1.5} /></button>
            <button className="topbar__icon-btn"><Bell size={18} color="#FF0915" strokeWidth={1.5} /></button>
            <button className="topbar__icon-btn"><UserCircle size={20} color="#FF0915" strokeWidth={1.5} /></button>
          </div>
        </header>

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
              <div className="topbar__title">Documents</div>
              <div className="topbar__sub">Manage and track all your signed and pending document</div>
            </div>
            <div className="docs-topbar-actions">
              <div className="docs-search-wrap">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  className="docs-search-input"
                  placeholder="Search Documents"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <button className="docs-filter-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                </svg>
                Filter
              </button>
              <button className="docs-add-btn" onClick={() => navigate('/sign-yourself')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add Document
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="docs-tabs">
          <button className={`docs-tab ${activeTab === 'all' ? 'docs-tab--active' : ''}`} onClick={() => setActiveTab('all')}>All</button>
          <button className={`docs-tab ${activeTab === 'created' ? 'docs-tab--active' : ''}`} onClick={() => setActiveTab('created')}>Created by me</button>
          <button className={`docs-tab ${activeTab === 'assigned' ? 'docs-tab--active' : ''}`} onClick={() => setActiveTab('assigned')}>Assigned by me</button>
        </div>

        {/* Table */}
        <div className="docs-section">
          <div className="docs-table__header">
            <span>TITLE</span>
            <span>NOTE</span>
            <span>SIGNERS</span>
            <span>SIGNED AT</span>
            <span>OWNER</span>
            <span>STATUS</span>
            <span>Action</span>
          </div>
          <div className="docs-table">
            {filtered.map(doc => (
              <div className="doc-row" key={doc.id}>
                <div className="doc-row__title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF0915" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="doc-row__icon">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  {doc.title}
                </div>
                <div className="doc-row__note">{doc.note}</div>
                <div className="doc-row__cell">{doc.signers}</div>
                <div className="doc-row__cell">{doc.signedAt}</div>
                <div className="doc-row__cell">{doc.owner}</div>
                <div className="doc-row__cell">
                  <span className={`badge badge--${doc.status.toLowerCase()}`}>{doc.status}</span>
                </div>
                <div className="doc-row__menu">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
                  </svg>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af', fontSize: '13px' }}>
                No documents found.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}