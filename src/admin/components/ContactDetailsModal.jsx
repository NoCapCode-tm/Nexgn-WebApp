import React, { useState } from "react";
import { Mail, Phone, Pencil, ChevronLeft } from "lucide-react";
import "../css/ContactBook.css";

export default function ContactDetailsModal({ contact, onUpdateContact, onClose }) {
  if (!contact) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(contact.name || "");
  const [email, setEmail] = useState(contact.email || "");
  const [phone, setPhone] = useState(contact.phone || "+1 98765 43210");
  const [language, setLanguage] = useState(contact.language || "English");
  const [gender, setGender] = useState(contact.gender || "Female");
  const [emergencyContact, setEmergencyContact] = useState(contact.emergencyContact || "+1 912-345-6789");
  const [address, setAddress] = useState(contact.address || "New York, United States");

  const handleSave = () => {
    onUpdateContact({
      name,
      email,
      phone,
      language,
      gender,
      emergencyContact,
      address
    });
    setIsEditing(false);
    onClose();
  };

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
              {isEditing ? (
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  className="contact-details-name-input"
                />
              ) : (
                <h2 className="contact-details-name">{contact.name}</h2>
              )}
              {isEditing ? (
                <button className="contact-details-edit-btn" onClick={handleSave} style={{ backgroundColor: "#FFEBEB", color: "#FF0915" }}>
                  <span>Save Profile</span>
                </button>
              ) : (
                <button className="contact-details-edit-btn" onClick={() => setIsEditing(true)}>
                  <Pencil size={14} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            <div className="contact-links-simple">
              <div className="quick-info-item">
                <Mail size={14} color="#6b7280" />
                {isEditing ? (
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="contact-details-quick-input"
                  />
                ) : (
                  <span className="quick-info-val">{contact.email}</span>
                )}
              </div>
              <div className="quick-info-item">
                <Phone size={14} color="#6b7280" />
                {isEditing ? (
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    className="contact-details-quick-input"
                  />
                ) : (
                  <span className="quick-info-val">{contact.phone || "+1 98765 43210"}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="contact-details-card">
          <div className="contact-details-card-header">Personal Information</div>
          <div className="contact-details-card-body">
            <div className="add-contact-grid admin-add-contact-grid--gap">
              <div className="contact-detail-field">
                <label>Full Name</label>
                {isEditing ? (
                  <input type="text" className="contact-detail-field__input" value={name} onChange={e => setName(e.target.value)} />
                ) : (
                  <div className="detail-val">{contact.name}</div>
                )}
              </div>
              <div className="contact-detail-field">
                <label>Preferred Language</label>
                {isEditing ? (
                  <input type="text" className="contact-detail-field__input" value={language} onChange={e => setLanguage(e.target.value)} />
                ) : (
                  <div className="detail-val">{contact.language || "English"}</div>
                )}
              </div>
              <div className="contact-detail-field">
                <label>Gender</label>
                {isEditing ? (
                  <input type="text" className="contact-detail-field__input" value={gender} onChange={e => setGender(e.target.value)} />
                ) : (
                  <div className="detail-val">{contact.gender || "Female"}</div>
                )}
              </div>
              <div className="contact-detail-field">
                <label>Emergency Contact</label>
                {isEditing ? (
                  <input type="text" className="contact-detail-field__input" value={emergencyContact} onChange={e => setEmergencyContact(e.target.value)} />
                ) : (
                  <div className="detail-val">{contact.emergencyContact || "+1 912-345-6789"}</div>
                )}
              </div>
              <div className="contact-detail-field add-contact-field-full">
                <label>Address</label>
                {isEditing ? (
                  <input type="text" className="contact-detail-field__input" value={address} onChange={e => setAddress(e.target.value)} />
                ) : (
                  <div className="detail-val">{contact.address || "New York, United States"}</div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
