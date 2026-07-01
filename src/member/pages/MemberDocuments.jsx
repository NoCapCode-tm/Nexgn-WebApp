import { useState } from "react";
import MemberSidebar from "../components/MemberSidebar";
import MemberTopbar from "../components/MemberTopbar";
import MemberTopbarIcons from "../components/MemberTopbarIcons";
import MemberMobileNavbar from "../components/MemberMobileNavbar";
import MemberDocumentsFilter from "../components/MemberDocumentsFilter";
import MemberDocumentsTable from "../components/MemberDocumentsTable";
import { Search, Bell, UserCircle, Menu } from "lucide-react";

import "../css/MemberBaseLayout.css";
import "../css/MemberDocuments.css";    // Specific Document Styles

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

export default function MemberDocuments() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredDocs = ALL_DOCS.filter(doc => {
    const matchSearch = doc.title.toLowerCase().includes(search.toLowerCase()) || 
                        doc.signers.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === "All" || 
                          (doc.status && doc.status.toLowerCase() === selectedStatus.toLowerCase());
    let matchesTab = true;
    if (activeTab === "created") matchesTab = doc.owner === "Me";
    // "assigned" could check if owner != "Me" or some other logic, assuming all match for mock data right now
    if (activeTab === "assigned") matchesTab = true; 
    return matchSearch && matchesStatus && matchesTab;
  });

  return (
    <div className="layout member-theme member-docs-page">
      {mobileNavOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Responsive Sidebar Layout */}
      <div className={`mobile-sidebar-wrapper ${mobileNavOpen ? "mobile-sidebar-wrapper--open" : ""}`}>
        <MemberSidebar />
      </div>

      <div className="desktop-sidebar-wrapper">
        <MemberSidebar />
      </div>

      <div className="main">
        {/* Mobile Navigation */}
        <header className="mobile-topbar">
          <button className="mobile-topbar__hamburger" onClick={() => setMobileNavOpen(true)}>
            <Menu size={22} color="#1a1a2e" />
          </button>

          <MemberTopbarIcons iconSize={18} className="mobile-topbar__icons" />
        </header>

        {/* Desktop Topbar */}
        <div className="topbar desktop-topbar">
          <div className="topbar__top-row">
            <MemberTopbarIcons iconSize={24} className="topbar__icons" />
          </div>
          <div className="topbar__bottom-row">
            <div>
              <div className="topbar__title">Documents</div>
              <div className="topbar__sub">Manage and track all your signed and pending document</div>
            </div>
            
            {/* Top Right Actions */}
            <MemberDocumentsFilter 
              search={search} 
              setSearch={setSearch} 
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
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
            <MemberDocumentsFilter 
              search={search} 
              setSearch={setSearch} 
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </div>
        </div>

        {/* Tabs Section */}
        <div className="member-docs-tabs">
          <button 
            className={`member-docs-tab ${activeTab === 'all' ? 'member-docs-tab--active' : ''}`} 
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`member-docs-tab ${activeTab === 'created' ? 'member-docs-tab--active' : ''}`} 
            onClick={() => setActiveTab('created')}
          >
            Created by me
          </button>
          <button 
            className={`member-docs-tab ${activeTab === 'assigned' ? 'member-docs-tab--active' : ''}`} 
            onClick={() => setActiveTab('assigned')}
          >
            Assigned to me
          </button>
        </div>

        {/* Mobile "Need My Sign" Section Title */}
        <div className="member-docs-mobile-section-title">
          Need My Sign
        </div>

        {/* Table Section */}
        <MemberDocumentsTable documents={filteredDocs} />

      </div>
      <MemberMobileNavbar />
    </div>
  );
}
