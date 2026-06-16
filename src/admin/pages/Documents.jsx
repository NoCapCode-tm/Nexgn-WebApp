import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileNavbar from "../components/MobileNavbar";
import DocumentsFilter from "../components/DocumentsFilter";
import DocumentsTable from "../components/DocumentsTable";
import { Search, Bell, UserCircle, Menu } from "lucide-react";

import "../css/AdminBaseLayout.css";
import "../css/Documents.css";    // Specific Document Styles

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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filteredDocs = ALL_DOCS.filter(doc => {
    const matchSearch = doc.title.toLowerCase().includes(search.toLowerCase()) || 
                        doc.signers.toLowerCase().includes(search.toLowerCase());
    if (activeTab === "created") return matchSearch && doc.owner === "Me";
    // "assigned" could check if owner != "Me" or some other logic, assuming all match for mock data right now
    if (activeTab === "assigned") return matchSearch; 
    return matchSearch;
  });

  return (
    <div className="layout admin-theme admin-docs-page">
      {mobileNavOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Responsive Sidebar Layout */}
      <div className={`mobile-sidebar-wrapper ${mobileNavOpen ? "mobile-sidebar-wrapper--open" : ""}`}>
        <Sidebar />
      </div>

      <div className="desktop-sidebar-wrapper">
        <Sidebar />
      </div>

      <div className="main">
        {/* Mobile Navigation */}
        <header className="mobile-topbar">
          <button className="mobile-topbar__hamburger" onClick={() => setMobileNavOpen(true)}>
            <Menu size={22} color="#1a1a2e" />
          </button>

          <div className="mobile-topbar__icons">
            <button className="topbar__icon-btn mobile-topbar__search-btn">
              <Search size={18} color="#FF0915" strokeWidth={1.5} />
            </button>
            <button className="topbar__icon-btn">
              <Bell size={18} color="#FF0915" strokeWidth={1.5} />
            </button>
            <button className="topbar__icon-btn">
              <UserCircle size={20} color="#FF0915" strokeWidth={1.5} />
            </button>
          </div>
        </header>

        {/* Desktop Topbar */}
        <div className="topbar desktop-topbar">
          <div className="topbar__top-row">
            <div className="topbar__icons">
              <button className="topbar__icon-btn"><Search size={24} color="#FF0915" strokeWidth={1.5} /></button>
              <button className="topbar__icon-btn"><Bell size={24} color="#FF0915" strokeWidth={1.5} /></button>
              <button className="topbar__icon-btn"><UserCircle size={24} color="#FF0915" strokeWidth={1.5} /></button>
            </div>
          </div>
          <div className="topbar__bottom-row">
            <div>
              <div className="topbar__title">Documents</div>
              <div className="topbar__sub">Manage and track all your signed and pending document</div>
            </div>
            
            {/* Top Right Actions */}
            <DocumentsFilter search={search} setSearch={setSearch} />
          </div>
        </div>

        {/* Mobile Page Header (Under Topbar) */}
        <div className="mobile-page-header">
          <div className="topbar__bottom-row">
            <div>
              <div className="topbar__title">Documents</div>
              <div className="topbar__sub">Manage and track all your signed and pending document</div>
            </div>
          </div>
          <hr className="mobile-header-divider" />
          <div className="mobile-filter-row">
            <DocumentsFilter search={search} setSearch={setSearch} />
          </div>
        </div>

        {/* Tabs Section */}
        <div className="admin-docs-tabs">
          <button 
            className={`admin-docs-tab ${activeTab === 'all' ? 'admin-docs-tab--active' : ''}`} 
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`admin-docs-tab ${activeTab === 'created' ? 'admin-docs-tab--active' : ''}`} 
            onClick={() => setActiveTab('created')}
          >
            Created by me
          </button>
          <button 
            className={`admin-docs-tab ${activeTab === 'assigned' ? 'admin-docs-tab--active' : ''}`} 
            onClick={() => setActiveTab('assigned')}
          >
            Assigned to me
          </button>
        </div>

        {/* Mobile "Need My Sign" Section Title */}
        <div className="admin-docs-mobile-section-title">
          Need My Sign
        </div>

        {/* Table Section */}
        <DocumentsTable documents={filteredDocs} />

      </div>
      <MobileNavbar />
    </div>
  );
}
