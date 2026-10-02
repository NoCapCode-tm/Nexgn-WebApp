import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../../config";

const initialNotifications = {
  realtime_document_signed: false,
  realtime_signature_request: false,
  realtime_document_expired: false,
  realtime_security: false,
  email_document_signed: false,
  email_signature_request: false,
  email_document_expired: false,
  email_security: false,
};

const realtimeItems = [
  {
    key: "realtime_document_signed",
    title: "Document Signed",
    description: "Show an alert when someone signs your document",
  },
  {
    key: "realtime_signature_request",
    title: "Signature Request Received",
    description: "Show an alert when you receive a new signature request",
  },
  {
    key: "realtime_document_expired",
    title: "Document Expired",
    description: "Alert me when a pending document passes its expiration date",
  },
  {
    key: "realtime_security",
    title: "Security Alerts",
    description: "Important alerts about logins, password changes, and two-factor authentication",
  },
];

const emailItems = [
  {
    key: "email_document_signed",
    title: "Document Signed",
    description: "Receive an email when someone signs your document",
  },
  {
    key: "email_signature_request",
    title: "Signature Request Received",
    description: "Get an email when you receive a new signature request",
  },
  {
    key: "email_document_expired",
    title: "Document Expired",
    description: "Email me when a pending document passes its expiration date",
  },
  {
    key: "email_security",
    title: "Security Alerts",
    description: "Email me about logins, password changes, and two-factor authentication",
  },
];

function readPreferences(body) {
  const candidates = [body?.message, body?.data];
  return candidates.find((candidate) => (
    candidate
    && typeof candidate === "object"
    && typeof candidate.realtime_document_signed === "boolean"
  )) || null;
}

export default function Notifications() {
  const [notificationData, setNotificationData] = useState(initialNotifications);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const applyPreferences = (saved) => {
    if (!saved) return;
    setNotificationData((prev) => ({
      ...prev,
      ...Object.keys(initialNotifications).reduce((next, key) => {
        next[key] = saved[key] === true;
        return next;
      }, {}),
    }));
  };

  const persistPreferences = async (nextPreferences, { silent } = {}) => {
    setSaving(true);
    try {
      const response = await axios.put(
        `${API_URL}notification/preferences`,
        nextPreferences,
        { withCredentials: true }
      );
      applyPreferences(readPreferences(response.data) || nextPreferences);
      if (!silent) {
        toast.success("Notification settings saved");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not save notification settings"
      );
      throw error;
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const response = await axios.get(`${API_URL}notification/preferences`, {
          withCredentials: true,
        });
        applyPreferences(readPreferences(response.data));
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Could not load notification settings"
        );
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const handleNotificationChange = async (key) => {
    const previous = notificationData;
    const next = {
      ...notificationData,
      [key]: !notificationData[key],
    };

    setNotificationData(next);

    try {
      await persistPreferences(next, { silent: true });
    } catch {
      setNotificationData(previous);
    }
  };

  const handleSave = async () => {
    try {
      await persistPreferences(notificationData);
    } catch {
      // The error toast is shown by persistPreferences.
    }
  };

  const renderItems = (items) => (
    items.map((item) => (
      <label className="admin-notification-item" key={item.key}>
        <div className="admin-notification-item-text">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
        <input
          type="checkbox"
          checked={Boolean(notificationData[item.key])}
          onChange={() => handleNotificationChange(item.key)}
          className="admin-permission-checkbox-input"
          disabled={loading || saving}
        />
        <span className="admin-permission-custom-checkbox" />
      </label>
    ))
  );

  return (
    <div className="admin-settings-card admin-settings-card--notifications">
      <h2 className="admin-settings-card__title">Notification</h2>
      <div className="admin-settings-card__divider" />

      <div className="admin-notification-section">
        <h3 className="admin-notification-section-title">Realtime Notification</h3>
        <div className="admin-notification-list">
          {renderItems(realtimeItems)}
        </div>
      </div>

      <div className="admin-notification-section">
        <h3 className="admin-notification-section-title">Email Notification</h3>
        <div className="admin-notification-list">
          {renderItems(emailItems)}
        </div>
      </div>

      <div className="admin-settings-form__footer">
        <button
          type="button"
          className="admin-settings-form__submit"
          onClick={handleSave}
          disabled={loading || saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
