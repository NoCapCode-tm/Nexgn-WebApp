import React from "react";
import { ChevronLeft } from "lucide-react";
import "../css/MemberContactBook.css";

export default function AddContactForm({ onClose }) {
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
              <input type="text" />
            </div>
            <div className="add-contact-field">
              <label>Preferred Language</label>
              <input type="text" />
            </div>
            <div className="add-contact-field">
              <label>Gender</label>
              <input type="text" />
            </div>
            <div className="add-contact-field">
              <label>Contact</label>
              <input type="text" />
            </div>
            <div className="add-contact-field">
              <label>Email Address</label>
              <input type="email" />
            </div>
            <div className="add-contact-field">
              <label>Emergency Contact</label>
              <input type="text" />
            </div>
            <div className="add-contact-field">
              <label>Job Title</label>
              <input type="text" />
            </div>
            <div className="add-contact-field add-contact-field-full">
              <label>Address</label>
              <input type="text" />
            </div>
          </div>
        </div>

        <div className="add-contact-save-row">
          <button className="add-contact-save-btn">Save</button>
        </div>

      </div>
    </div>
  );
}
