import { useState } from "react";
import MemberSidebar from "../components/MemberSidebar";
import MemberMobileNavbar from "../components/MemberMobileNavbar";
import MemberContactCard from "../components/MemberContactCard";
import ContactDetailsModal from "../components/ContactDetailsModal";
import { Search, Bell, UserCircle, Menu } from "lucide-react";
import AddContactForm from "../components/AddContactForm";

import "../css/MemberBaseLayout.css";
import "../css/MemberContactBook.css";

const CONTACTS = [
  { name: "Alice Smith", email: "alice.smith@example.com", department: "Legal", status: "Active" },
  { name: "Bob Jones", email: "bob.jones@example.com", department: "Engineering", status: "Active" },
  { name: "Charlie Brown", email: "charlie.brown@example.com", department: "Marketing", status: "Inactive" },
  { name: "Diana Prince", email: "diana.prince@example.com", department: "Finance", status: "Active" },
  { name: "Blair Croft", email: "blair.croft@example.com", department: "HR", status: "Active" }
];

function MemberContactActions({
  search,
  setSearch,
  selectedStatus,
  setSelectedStatus,
  selectedDepartment,
  setSelectedDepartment,
  onAddClick
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const departments = ["All", ...new Set(CONTACTS.map(c => c.department).filter(Boolean))];
  const statuses = ["All", ...new Set(CONTACTS.map(c => c.status).filter(Boolean))];

  const hasActiveFilter = selectedStatus !== "All" || selectedDepartment !== "All";

  return (
    <div className="member-contact-topbar-actions">
      <div className="member-contact-search-wrap">
        <Search size={16} color="#9ca3af" strokeWidth={2} />
        <input
          className="member-contact-search-input"
          placeholder="Search Contacts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="member-contact-filter-wrapper">
        <button
          className="member-contact-filter-btn"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
          </svg>
          <span className="filter-text">{hasActiveFilter ? "Filter (Active)" : "Filter"}</span>
        </button>

        {isFilterOpen && (
          <div className="member-contact-filter-dropdown">
            <div className="member-contact-filter-dropdown-group">
              <label className="member-contact-filter-dropdown-label">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="member-contact-filter-dropdown-select"
              >
                {statuses.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="member-contact-filter-dropdown-group">
              <label className="member-contact-filter-dropdown-label">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="member-contact-filter-dropdown-select"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="member-contact-filter-dropdown-divider" />

            <button
              onClick={() => {
                setSelectedStatus("All");
                setSelectedDepartment("All");
                setIsFilterOpen(false);
              }}
              className="member-contact-filter-dropdown-reset"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      <button className="member-contact-add-btn" onClick={onAddClick}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/>
        </svg>
        <span className="add-btn-full">Add Contact</span>
        <span className="member-contact-add-btn-short">Add</span>
      </button>
    </div>
  );
}

export default function MemberContactBook() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const filteredContacts = CONTACTS.filter(c => {
    const cleanSearch = search.trim().toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(cleanSearch) ||
                          c.email.toLowerCase().includes(cleanSearch);
    const matchesStatus = selectedStatus === "All" || c.status === selectedStatus;
    const matchesDept = selectedDepartment === "All" || c.department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const focusSearchInput = () => {
    const inputs = document.querySelectorAll(".admin-contact-search-input, .member-contact-search-input");
    for (const input of inputs) {
      if (input.offsetWidth > 0 || input.offsetHeight > 0) {
        input.focus();
        break;
      }
    }
  };

  return (
    <div className="layout member-theme member-contact-page">
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

          <div className="mobile-topbar__icons">
            <button className="topbar__icon-btn mobile-topbar__search-btn" onClick={focusSearchInput}>
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
              <button className="topbar__icon-btn" onClick={focusSearchInput}><Search size={24} color="#FF0915" strokeWidth={1.5} /></button>
              <button className="topbar__icon-btn"><Bell size={24} color="#FF0915" strokeWidth={1.5} /></button>
              <button className="topbar__icon-btn"><UserCircle size={24} color="#FF0915" strokeWidth={1.5} /></button>
            </div>
          </div>
          <div className="topbar__bottom-row">
            <div>
              <div className="topbar__title">Contact Book</div>
              <div className="topbar__sub">Manage all company contacts</div>
            </div>
            
            {/* Top Right Actions */}
            <MemberContactActions
              search={search}
              setSearch={setSearch}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              onAddClick={() => setIsAddModalOpen(true)}
            />
          </div>
        </div>

        {/* Mobile Page Header (Under Topbar) */}
        <div className="mobile-page-header">
          <div className="topbar__bottom-row">
            <div>
              <div className="topbar__title">Contact Book</div>
              <div className="topbar__sub">Manage all company contacts</div>
            </div>
          </div>
          <hr className="mobile-header-divider" />
          <div className="mobile-filter-row">
            <MemberContactActions
              search={search}
              setSearch={setSearch}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              onAddClick={() => setIsAddModalOpen(true)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="member-contact-section">
          <div className="member-contact-table">
            {filteredContacts.map((c, i) => (
              <MemberContactCard key={i} name={c.name} email={c.email} onClick={() => setSelectedContact(c)} />
            ))}
            {filteredContacts.length === 0 && (
              <div className="member-contact-empty-state">
                No contacts found.
              </div>
            )}
            
            {/* Mobile Total Contacts Card */}
            <div className="mobile-total-contacts-card">
              <div className="mobile-total-contacts-card__icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="mobile-total-contacts-card__info">
                <div className="mobile-total-contacts-card__label">Total Contacts</div>
                <div className="mobile-total-contacts-card__value">{filteredContacts.length}</div>
              </div>
              <div className="mobile-total-contacts-card__chevron">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <MemberMobileNavbar />

      {isAddModalOpen && (
        <AddContactForm onClose={() => setIsAddModalOpen(false)} />
      )}
      
      {selectedContact && (
        <ContactDetailsModal contact={selectedContact} onClose={() => setSelectedContact(null)} />
      )}
    </div>
  );
}
