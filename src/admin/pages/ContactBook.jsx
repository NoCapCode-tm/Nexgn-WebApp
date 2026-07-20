import { useState } from "react";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import ContactCard from "../components/ContactCard";
import ContactDetailsModal from "../components/ContactDetailsModal";

import AddContactForm from "../components/AddContactForm";

import "../css/BaseLayout.css";
import "../css/ContactBook.css";

const INITIAL_CONTACTS = [
  { name: "Alice Smith", email: "alice.smith@example.com", department: "Legal", status: "Active", phone: "+1 98765 43210", language: "English", gender: "Female", emergencyContact: "+1 912-345-6789", address: "New York, United States" },
  { name: "Bob Jones", email: "bob.jones@example.com", department: "Engineering", status: "Active", phone: "+1 98765 43211", language: "English", gender: "Male", emergencyContact: "+1 912-345-6780", address: "San Francisco, United States" },
  { name: "Charlie Brown", email: "charlie.brown@example.com", department: "Marketing", status: "Inactive", phone: "+1 98765 43212", language: "English", gender: "Male", emergencyContact: "+1 912-345-6781", address: "Chicago, United States" },
  { name: "Diana Prince", email: "diana.prince@example.com", department: "Finance", status: "Active", phone: "+1 98765 43213", language: "English", gender: "Female", emergencyContact: "+1 912-345-6782", address: "Boston, United States" },
  { name: "Blair Croft", email: "blair.croft@example.com", department: "HR", status: "Active", phone: "+1 98765 43214", language: "English", gender: "Female", emergencyContact: "+1 912-345-6783", address: "Austin, United States" }
];

function MemberContactActions({
  search,
  setSearch,
  selectedStatus,
  setSelectedStatus,
  selectedDepartment,
  setSelectedDepartment,
  onAddClick,
  contacts
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const departments = ["All", ...new Set(contacts.map(c => c.department).filter(Boolean))];
  const statuses = ["All", ...new Set(contacts.map(c => c.status).filter(Boolean))];

  const hasActiveFilter = selectedStatus !== "All" || selectedDepartment !== "All";

  return (
    <div className="admin-contact-topbar-actions">
      <div className="admin-contact-search-wrap">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          className="admin-contact-search-input"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button className="admin-contact-add-btn" onClick={onAddClick}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/>
        </svg>
        <span className="add-btn-full">Add Contact</span>
        <span className="admin-contact-add-btn-short">Add</span>
      </button>
    </div>
  );
}

export default function ContactBook() {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const filteredContacts = contacts.filter(c => {
    const cleanSearch = search.trim().toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(cleanSearch) ||
                          c.email.toLowerCase().includes(cleanSearch);
    const matchesStatus = selectedStatus === "All" || c.status === selectedStatus;
    const matchesDept = selectedDepartment === "All" || c.department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const focusSearchInput = () => {
    const inputs = document.querySelectorAll(".admin-contact-search-input, .admin-contact-search-input");
    for (const input of inputs) {
      if (input.offsetWidth > 0 || input.offsetHeight > 0) {
        input.focus();
        break;
      }
    }
  };

  const handleAddContact = (newContact) => {
    setContacts(prev => [
      ...prev,
      {
        ...newContact,
        department: newContact.department || "Legal",
        status: newContact.status || "Active",
        phone: newContact.phone || "+1 98765 43210",
        language: newContact.language || "English",
        gender: newContact.gender || "Female",
        emergencyContact: newContact.emergencyContact || "+1 912-345-6789",
        address: newContact.address || "New York, United States"
      }
    ]);
  };

  const handleUpdateContact = (updatedContact) => {
    setContacts(prev => prev.map(c => c.email === selectedContact.email ? { ...c, ...updatedContact } : c));
    setSelectedContact(prev => ({ ...prev, ...updatedContact }));
  };

  const handleDeleteContact = (email) => {
    setContacts(prev => prev.filter(c => c.email !== email));
  };

  const contactActions = (
    <MemberContactActions
      search={search}
      setSearch={setSearch}
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      selectedDepartment={selectedDepartment}
      setSelectedDepartment={setSelectedDepartment}
      onAddClick={() => setIsAddModalOpen(true)}
      contacts={contacts}
    />
  );

  return (
    <Layout className="admin-contact-page" onSearchClick={focusSearchInput}>
      <>
        {/* Desktop Topbar */}
        <Topbar 
          title="Contact Book" 
          subtitle="Manage all company contacts"
          actionButton={contactActions}
          onSearchClick={focusSearchInput}
        />

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
            {contactActions}
          </div>
        </div>

        {/* Table Section */}
        <div className="admin-contact-section">
          <div className="admin-contact-table">
            {filteredContacts.map((c, i) => (
              <ContactCard 
                key={i} 
                name={c.name} 
                email={c.email} 
                onClick={() => setSelectedContact(c)} 
                onDelete={() => handleDeleteContact(c.email)} 
              />
            ))}
            {filteredContacts.length === 0 && (
              <div className="admin-contact-empty-state">
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

      </>

      {isAddModalOpen && (
        <AddContactForm onSave={handleAddContact} onClose={() => setIsAddModalOpen(false)} />
      )}
      
      {selectedContact && (
        <ContactDetailsModal 
          contact={selectedContact} 
          onUpdateContact={handleUpdateContact} 
          onClose={() => setSelectedContact(null)} 
        />
      )}
    </Layout>
  );
}
