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
        <div className="contact-details-header">
          <div className="contact-details-avatar"></div>
          <div className="contact-details-info-wrap">
            <div className="contact-details-title-row">
              <h2 className="contact-details-name">{contact.name}</h2>
              <button className="contact-details-edit-btn">
                <Pencil size={14} />
                <span>Edit Profile</span>
              </button>
            </div>
            <div className="contact-details-status-row">
              <span className="contact-status-badge">Active</span>
              <span className="contact-role">Legal Manager</span>
            </div>
            
            <div className="contact-quick-info">
              <div className="quick-info-col">
                <div className="quick-info-item">
                  <span className="quick-info-label">Department</span>
                  <span className="quick-info-val">Legal</span>
                </div>
                <div className="quick-info-item">
                  <span className="quick-info-label">Date Hired</span>
                  <span className="quick-info-val">Mar 7, 2021</span>
                </div>
              </div>
              <div className="quick-info-col desktop-quick-info-col">
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
        </div>

        <div className="mobile-contact-links">
          <div className="quick-info-item">
            <Mail size={14} color="#6b7280" />
            <span className="quick-info-val">{contact.email}</span>
          </div>
          <div className="quick-info-item">
            <Phone size={14} color="#6b7280" />
            <span className="quick-info-val">+1 98765 43210</span>
          </div>
        </div>

        {/* Personal Information */}
        <div className="contact-details-card">
          <div className="contact-details-card-header">Personal Information</div>
          <div className="contact-details-card-body">
            <div className="add-contact-grid" style={{ gap: '20px 60px' }}>
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

        {/* Professional Information */}
        <div className="contact-details-card" style={{ marginTop: '20px' }}>
          <div className="contact-details-card-header">Professional Information</div>
          <div className="contact-details-card-body">
            <div className="add-contact-grid" style={{ gap: '20px 60px' }}>
              <div className="contact-detail-field">
                <label>Company Name</label>
                <div className="detail-val">Acme Corp</div>
              </div>
              <div className="contact-detail-field">
                <label>Department</label>
                <div className="detail-val">Legal</div>
              </div>
              <div className="contact-detail-field">
                <label>Employee ID</label>
                <div className="detail-val">EMP-0421</div>
              </div>
              <div className="contact-detail-field">
                <label>Job Title</label>
                <div className="detail-val">Legal Manager</div>
              </div>
              <div className="contact-detail-field">
                <label>Date Joined</label>
                <div className="detail-val">March 12, 2022</div>
              </div>
            </div>
            
            <div className="contact-detail-field add-contact-field-full" style={{ marginTop: '20px' }}>
              <label>Skills</label>
              <div className="skills-row">
                <span className="skill-pill">Contract Review</span>
                <span className="skill-pill">Compliance Management</span>
                <span className="skill-pill">Risk Assessment</span>
                <span className="skill-pill">Corporate Law</span>
                <span className="skill-pill">Negotiation</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
