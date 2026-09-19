import { Mail, Phone, Pencil, ChevronLeft } from "lucide-react";
import "./ContactBook.css";

export default function ContactDetailsModal({
  contact,
  onEdit,
  onClose
}) {
  if (!contact) return null;

  return (
    <div className="add-contact-modal-overlay" onClick={onClose}>
      <div
        className="add-contact-modal contact-details-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobile-add-contact-back" onClick={onClose}>
          <ChevronLeft size={24} color="#111827" />
        </div>

        <div className="contact-details-header contact-details-header--simple">
          <div className="contact-details-info-wrap">
            <div className="contact-details-title-row">
              <h2 className="contact-details-name">
                {contact.name}
              </h2>

              <button
                className="contact-details-edit-btn"
                onClick={() => onEdit(contact)}
              >
                <Pencil size={14} />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="contact-links-simple">
              <div className="quick-info-item">
                <Mail size={14} color="#6b7280" />
                <span className="quick-info-val">
                  {contact.email}
                </span>
              </div>

              <div className="quick-info-item">
                <Phone size={14} color="#6b7280" />
                <span className="quick-info-val">
                  {contact.phone_no || "Not provided"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-details-card">
          <div className="contact-details-card-header">
            Personal Information
          </div>

          <div className="contact-details-card-body">
            <div className="add-contact-grid admin-add-contact-grid--gap">
              <div className="contact-detail-field">
                <label>Full Name</label>
                <div className="detail-val">
                  {contact.name || "Not provided"}
                </div>
              </div>

              <div className="contact-detail-field">
                <label>Email Address</label>
                <div className="detail-val">
                  {contact.email || "Not provided"}
                </div>
              </div>

              <div className="contact-detail-field">
                <label>Contact</label>
                <div className="detail-val">
                  {contact.phone_no || "Not provided"}
                </div>
              </div>

              <div className="contact-detail-field">
                <label>Gender</label>
                <div className="detail-val">
                  {contact.gender || "Not provided"}
                </div>
              </div>

              {/* <div className="contact-detail-field">
                <label>Contact ID</label>
                <div className="detail-val">
                  {contact._id || "Not available"}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}