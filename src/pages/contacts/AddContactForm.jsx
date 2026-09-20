import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import "./ContactBook.css";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";

export default function AddContactForm({
  onClose,
  contact = null,
  onSaved
}) {
  const [name, setName] = useState(contact?.name || "");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(contact?.email || "");
  const [phone, setPhone] = useState(contact?.phone_no || "");
  const [gender, setGender] = useState(contact?.gender || "");
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(contact?._id);

  const handleSave = async (e) => {
    if (e) e.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      let response;

      if (isEditing) {
        response = await axios.put(
          `${API_URL}contact/updatecontact/${contact._id}`,
          {
            name: name.trim(),
            email: email.trim(),
            contact: phone,
            gender
          },
          {
            withCredentials: true
          }
        );
      } else {
        response = await axios.post(
          `${API_URL}contact/addcontact`,
          {
            name: name.trim(),
            email: email.trim(),
            contact: phone,
            gender
          },
          {
            withCredentials: true
          }
        );
      }

      setErrors({});
      onSaved?.(response.data.message);
      onClose();
    } catch (error) {
      setErrors({
        submit:
          error?.response?.data?.message ||
          `Failed to ${isEditing ? "update" : "add"} contact`
      });
      toast.error(
          error.response?.data?.message ||
          "Something Went Wrong"
        );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-contact-modal-overlay" onClick={onClose}>
      <form
        className="add-contact-modal add-contact-modal--compact"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSave}
        noValidate
      >
        <div className="mobile-add-contact-back" onClick={onClose}>
          <ChevronLeft size={24} color="#111827" />
        </div>

        <div className="add-contact-section">
          <h3 className="add-contact-heading">
            Personal Information
          </h3>

          <div className="add-contact-grid">
            <div className="add-contact-field">
              <label>
                Full Name <span className="required-asterisk">*</span>
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);

                  if (errors.name) {
                    setErrors((prev) => ({
                      ...prev,
                      name: undefined
                    }));
                  }
                }}
                className={errors.name ? "field-error" : ""}
                required
              />

              {errors.name && (
                <span className="field-error-msg">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="add-contact-field">
              <label>Gender</label>

              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            <div className="add-contact-field">
              <label>Contact</label>

              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="add-contact-field">
              <label>
                Email Address <span className="required-asterisk">*</span>
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (errors.email) {
                    setErrors((prev) => ({
                      ...prev,
                      email: undefined
                    }));
                  }
                }}
                className={errors.email ? "field-error" : ""}
                required
              />

              {errors.email && (
                <span className="field-error-msg">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className="field-error-msg">
              {errors.submit}
            </div>
          )}
        </div>

        <div className="add-contact-save-row">
          <button
            type="submit"
            className="add-contact-save-btn"
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading
              ? isEditing
                ? "Updating..."
                : "Saving..."
              : isEditing
                ? "Update Contact"
                : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}