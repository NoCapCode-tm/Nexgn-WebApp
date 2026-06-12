import { useState } from "react";
import MemberSidebar from "../components/MemberSidebar";
import MemberMobileNavbar from "../components/MemberMobileNavbar";
import MemberContactCard from "../components/MemberContactCard";
import ContactDetailsModal from "../components/ContactDetailsModal";
import { Search, Bell, UserCircle, Menu } from "lucide-react";
import AddContactForm from "../components/AddContactForm";

import "../css/MemberContactBook.css";

const CONTACTS = [
  { name: "Alice Smith", email: "alice.smith@example.com" },
  { name: "Bob Jones", email: "bob.jones@example.com" },
  { name: "Charlie Brown", email: "charlie.brown@example.com" },
  { name: "Diana Prince", email: "diana.prince@example.com" },
  { name: "Blair Croft", email: "blair.croft@example.com" }
];

function MemberContactActions({ search, setSearch, onAddClick }) {
  return (
    <div className="member-contact-topbar-actions">
      <div className="member-contact-search-wrap">
        <Search size={16} color="#9ca3af" strokeWidth={2} />
        <input
          className="member-contact-search-input"
          placeholder="Search Documents"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button className="member-contact-filter-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
        </svg>
        <span className="filter-text">Filter</span>
      </button>
      <button className="member-contact-add-btn" onClick={onAddClick}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/>
        </svg>
        <span className="add-btn-full">Add Contact</span>
        <span className="add-btn-short">Add</span>
      </button>
    </div>
  );
}

export default function MemberContactBook() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const filteredContacts = CONTACTS.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

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
          <span className="mobile-topbar__title">Dashboard</span>
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
              <button className="topbar__icon-btn"><Search size={22} color="#FF0915" strokeWidth={1.5} /></button>
              <button className="topbar__icon-btn"><Bell size={22} color="#FF0915" strokeWidth={1.5} /></button>
              <button className="topbar__icon-btn"><UserCircle size={24} color="#FF0915" strokeWidth={1.5} /></button>
            </div>
          </div>
          <div className="topbar__bottom-row">
            <div>
              <div className="topbar__title">Contact Book</div>
              <div className="topbar__sub">Manage all company contacts</div>
            </div>
            
            {/* Top Right Actions */}
            <MemberContactActions search={search} setSearch={setSearch} onAddClick={() => setIsAddModalOpen(true)} />
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
            <MemberContactActions search={search} setSearch={setSearch} onAddClick={() => setIsAddModalOpen(true)} />
          </div>
        </div>

        {/* Table Section */}
        <div className="member-contact-section">
          <div className="member-contact-table">
            {filteredContacts.map((c, i) => (
              <MemberContactCard key={i} name={c.name} email={c.email} onClick={() => setSelectedContact(c)} />
            ))}
            {filteredContacts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af', fontSize: '14px' }}>
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
