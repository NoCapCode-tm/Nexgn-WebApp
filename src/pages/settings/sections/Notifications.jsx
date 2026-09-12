import React, { useState } from "react";

const initialNotifications = {
  email_document_signed: false,
  email_signature_request: false,
  email_document_expired: false,
  system_updates: false,
  system_security: false,
};

export default function Notifications() {
  const [notificationData, setNotificationData] = useState(initialNotifications);

  const handleNotificationChange = (key) => {
    setNotificationData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    {
      key: "email_document_signed",
      title: "Document Signed",
      description: "Receive an email when someone signs your document",
    },
    {
      key: "email_signature_request",
      title: "Signature Request Received",
      description: "Get notified when you receive a new signature request",
    },
    {
      key: "email_document_expired",
      title: "Document Expired",
      description: "Alert me when a pending document passes its expiration date",
    },
    {
      key: "system_updates",
      title: "System Updates",
      description: "News about product and feature updates",
    },
    {
      key: "system_security",
      title: "Security Alerts",
      description: "Important notifications about your account security",
    },
  ];

  return (
    <div className="admin-settings-card admin-settings-card--notifications">
      <h2 className="admin-settings-card__title">Notification</h2>
      <div className="admin-settings-card__divider" />

      <div className="admin-notification-section">
        <h3 className="admin-notification-section-title">Email Notification</h3>
        <div className="admin-notification-list">
          {items.slice(0, 3).map((item) => (
            <label className="admin-notification-item" key={item.key}>
              <div className="admin-notification-item-text">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
              <input
                type="checkbox"
                checked={notificationData[item.key]}
                onChange={() => handleNotificationChange(item.key)}
                className="admin-permission-checkbox-input"
              />
              <span className="admin-permission-custom-checkbox" />
            </label>
          ))}
        </div>
      </div>

      <div className="admin-notification-section">
        <h3 className="admin-notification-section-title">System Alert</h3>
        <div className="admin-notification-list">
          {items.slice(3).map((item) => (
            <label className="admin-notification-item" key={item.key}>
              <div className="admin-notification-item-text">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
              <input
                type="checkbox"
                checked={notificationData[item.key]}
                onChange={() => handleNotificationChange(item.key)}
                className="admin-permission-checkbox-input"
              />
              <span className="admin-permission-custom-checkbox" />
            </label>
          ))}
        </div>
      </div>

      <div className="admin-settings-form__footer">
        <button type="button" className="admin-settings-form__submit">
          Save
        </button>
      </div>
    </div>
  );
}
