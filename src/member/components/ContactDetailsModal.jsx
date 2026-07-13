import React from "react";
import { Mail, Phone, Pencil, ChevronLeft } from "lucide-react";
import "../css/MemberContactBook.css";

export default function ContactDetailsModal({ contact, onClose }) {
  if (!contact) return null;

  return (
    <div className="add-contact-modal-overlay" onClick={onClose}>
      <div className="add-contact-modal contact-details-modal" onClick={(e) => e.stopPropagation()}>
        
        <div className="mobile-add-contact-back" onClick={onClose}>
          <ChevronLeft size={24} color="#111827" />
        </div>

        {/* Profile Header */}
        <div className="contact-details-header contact-details-header--simple">
          <div className="contact-details-info-wrap">
            <div className="contact-details-title-row">
              <h2 className="contact-details-name">{contact.name}</h2>
              <button className="contact-details-edit-btn">
                <Pencil size={14} />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="contact-links-simple">
              <div className="quick-info-item">
                <Mail size={14} color="#6b7280" />
                <span className="quick-info-val">{contact.email}</span>
              </div>
              <div className="quick-info-item">
                <Phone size={14} color="#6b7280" />
                <span className="quick-info-val">+1 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="contact-details-card">
          <div className="contact-details-card-header">Personal Information</div>
          <div className="contact-details-card-body">
            <div className="add-contact-grid member-add-contact-grid--gap">
              <div className="contact-detail-field">
                <label>Full Name</label>
                <div className="detail-val">{contact.name}</div>
              </div>
              <div className="contact-detail-field">
                <label>Preferred Language</label>
                <div className="detail-val">English</div>
              </div>
              <div className="contact-detail-field">
                <label>Gender</label>
                <div className="detail-val">Female</div>
              </div>
              <div className="contact-detail-field">
                <label>Emergency Contact</label>
                <div className="detail-val">+1 912-345-6789</div>
              </div>
              <div className="contact-detail-field add-contact-field-full">
                <label>Address</label>
                <div className="detail-val">New York, United States</div>
              </div>
            </div>
          </div>
        </div>

        </div>
    </div>
  );
}
