import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import LoadingScreen from "../../../components/Layout/LoadingScreen";
import { ChevronDown } from "lucide-react";

// --- 1. Custom Dropdown Styles (Injected automatically) ---
const customDropdownStyles = `
  .custom-dropdown-container {
    position: relative;
    width: 100%;
  }
  .custom-dropdown-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
  }
  .custom-dropdown-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .custom-dropdown-menu {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    width: 100%;
    max-height: 250px;
    overflow-y: auto;
    background: #ffffff;
    border: 1px solid #E4E4E4;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    list-style: none;
    padding: 6px 0;
    margin: 0;
    animation: slideDownFade 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .custom-dropdown-option {
    padding: 10px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    color: #1a1a2e;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .custom-dropdown-option:hover {
    background: #F9FAFB;
  }
  .custom-dropdown-option.selected {
    color: #FF0915;
    background: #FFF0F0;
    font-weight: 500;
  }

  @keyframes slideDownFade {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Dark Mode Overrides */
  body.dark-mode .custom-dropdown-menu {
    background: rgba(24, 24, 27, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(12px);
  }
  body.dark-mode .custom-dropdown-option {
    color: #d7d7d7;
  }
  body.dark-mode .custom-dropdown-option:hover {
    background: rgba(255, 255, 255, 0.06);
  }
  body.dark-mode .custom-dropdown-option.selected {
    color: #FF0915;
    background: rgba(255, 9, 21, 0.15);
  }
`;

// --- 2. Reusable Custom Dropdown Component ---
const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="custom-dropdown-container" ref={dropdownRef}>
      <div 
        className={`admin-settings-form__input custom-dropdown-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-dropdown-value" style={{ color: selectedOption ? 'inherit' : '#8A949F' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          size={18} 
          color="#8a949f" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} 
        />
      </div>

      {isOpen && (
        <ul className="custom-dropdown-menu">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`custom-dropdown-option ${value === opt.value ? 'selected' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// --- 3. Data Lists ---
const TIME_ZONES = [
  { value: "UTC", label: "(UTC+00:00) UTC" },
  { value: "Pacific/Midway", label: "(UTC-11:00) Pacific/Midway" },
  { value: "Pacific/Honolulu", label: "(UTC-10:00) Pacific/Honolulu" },
  { value: "America/Anchorage", label: "(UTC-09:00) America/Anchorage" },
  { value: "America/Los_Angeles", label: "(UTC-08:00) America/Los_Angeles" },
  { value: "America/Denver", label: "(UTC-07:00) America/Denver" },
  { value: "America/Chicago", label: "(UTC-06:00) America/Chicago" },
  { value: "America/New_York", label: "(UTC-05:00) America/New_York" },
  { value: "America/Caracas", label: "(UTC-04:00) America/Caracas" },
  { value: "America/Sao_Paulo", label: "(UTC-03:00) America/Sao_Paulo" },
  { value: "Atlantic/South_Georgia", label: "(UTC-02:00) Atlantic/South_Georgia" },
  { value: "Atlantic/Azores", label: "(UTC-01:00) Atlantic/Azores" },
  { value: "Europe/London", label: "(UTC+00:00) Europe/London" },
  { value: "Europe/Paris", label: "(UTC+01:00) Europe/Paris" },
  { value: "Europe/Berlin", label: "(UTC+01:00) Europe/Berlin" },
  { value: "Africa/Cairo", label: "(UTC+02:00) Africa/Cairo" },
  { value: "Africa/Johannesburg", label: "(UTC+02:00) Africa/Johannesburg" },
  { value: "Europe/Moscow", label: "(UTC+03:00) Europe/Moscow" },
  { value: "Asia/Dubai", label: "(UTC+04:00) Asia/Dubai" },
  { value: "Asia/Kolkata", label: "(UTC+05:30) Asia/Kolkata (India Standard Time)" },
  { value: "Asia/Bangkok", label: "(UTC+07:00) Asia/Bangkok" },
  { value: "Asia/Singapore", label: "(UTC+08:00) Asia/Singapore" },
  { value: "Asia/Tokyo", label: "(UTC+09:00) Asia/Tokyo" },
  { value: "Australia/Sydney", label: "(UTC+10:00) Australia/Sydney" },
  { value: "Pacific/Auckland", label: "(UTC+12:00) Pacific/Auckland" },
];

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Chinese (Mandarin)", 
  "Japanese", "Korean", "Hindi", "Arabic", "Portuguese", 
  "Russian", "Italian", "Dutch"
].map(lang => ({ value: lang, label: lang }));

export default function Account({ user, onUserUpdated, team }) {
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState({
    companyName: "",
    organizationId: "",
    timeZone: "",
    language: "English", 
  });

  // Inject Custom Styles
  useEffect(() => {
    const styleId = "custom-dropdown-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = customDropdownStyles;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) return;

    setAccountData({
      companyName: team?.company_name || "",
      organizationId: team?.org_id || "",
      timeZone: user.time_zone || "UTC",
      language: user.language || "English",
    });
  }, [user, team]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (loading) return; 
    setLoading(true);

    try {
      await axios.put(
        `${API_URL}admin/update`,
        {
          time_zone: accountData.timeZone,
          language: accountData.language,
          companyname: accountData.companyName,
        },
        {
          withCredentials: true,
        }
      );

      onUserUpdated?.();
    } catch (error) {
      console.error("Failed to update account:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin-settings-card admin-settings-card--account" data-tour="settings">
        <h2 className="admin-settings-card__title">Account</h2>
        <div className="admin-settings-card__divider" />

        <form className="admin-settings-form" onSubmit={handleUpdate}>
          <div className="admin-settings-form__group">
            <label className="admin-settings-form__label" htmlFor="admin-settings-company">
              Company Name
            </label>
            <input
              type="text"
              id="admin-settings-company"
              className="admin-settings-form__input"
              value={accountData.companyName}
              onChange={(e) =>
                setAccountData((prev) => ({ ...prev, companyName: e.target.value }))
              }
            />
          </div>

          <div className="admin-settings-form__group">
            <label className="admin-settings-form__label" htmlFor="admin-settings-org-id">
              Organization ID
            </label>
            <input
              type="text"
              id="admin-settings-org-id"
              className="admin-settings-form__input admin-settings-form__input--readonly"
              value={accountData.organizationId}
              readOnly
            />
            <p className="admin-settings-form__helper">Used for API integrations</p>
          </div>

          <div className="admin-settings-form__group">
            <label className="admin-settings-form__label">Time Zone</label>
            <CustomDropdown
              options={TIME_ZONES}
              value={accountData.timeZone}
              placeholder="Select a Time Zone"
              onChange={(val) => setAccountData(prev => ({ ...prev, timeZone: val }))}
            />
          </div>

          <div className="admin-settings-form__group">
            <label className="admin-settings-form__label">Language</label>
            <CustomDropdown
              options={LANGUAGES}
              value={accountData.language}
              placeholder="Select a Language"
              onChange={(val) => setAccountData(prev => ({ ...prev, language: val }))}
            />
          </div>

          <div className="admin-settings-form__footer">
            <button 
              type="submit" 
              className="admin-settings-form__submit"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? "Updating..." : "Update Account"}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <LoadingScreen
          state="connecting"
          size={64}
          theme="dark"
          message="Updating Account"
        />
      )}
    </>
  );
}