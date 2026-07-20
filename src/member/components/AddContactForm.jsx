import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import "../css/MemberContactBook.css";

export default function AddContactForm({ onSave, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState("");
  const [gender, setGender] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [address, setAddress] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const handleSave = () => {
    if (!name || !email) {
      alert("Name and Email are required!");
      return;
    }
    onSave({
      name,
      email,
      phone,
      language,
      gender,
      emergencyContact,
      address,
      department: jobTitle
    });
    onClose();
  };

  return (
    <div className="add-contact-modal-overlay" onClick={onClose}>
      <div className="add-contact-modal add-contact-modal--compact" onClick={(e) => e.stopPropagation()}>
        
        <div className="mobile-add-contact-back" onClick={onClose}>
          <ChevronLeft size={24} color="#111827" />
        </div>

        {/* Personal Information */}
        <div className="add-contact-section">
          <h3 className="add-contact-heading">Personal Information</h3>
          <div className="add-contact-grid">
            <div className="add-contact-field">
              <label>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="add-contact-field">
              <label>Preferred Language</label>
              <input type="text" value={language} onChange={e => setLanguage(e.target.value)} />
            </div>
            <div className="add-contact-field">
              <label>Gender</label>
              <input type="text" value={gender} onChange={e => setGender(e.target.value)} />
            </div>
            <div className="add-contact-field">
              <label>Contact</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="add-contact-field">
              <label>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="add-contact-field">
              <label>Emergency Contact</label>
              <input type="text" value={emergencyContact} onChange={e => setEmergencyContact(e.target.value)} />
            </div>
            <div className="add-contact-field">
              <label>Job Title</label>
              <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
            </div>
            <div className="add-contact-field add-contact-field-full">
              <label>Address</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="add-contact-save-row">
          <button className="add-contact-save-btn" onClick={handleSave}>Save</button>
        </div>

      </div>
    </div>
  );
}
