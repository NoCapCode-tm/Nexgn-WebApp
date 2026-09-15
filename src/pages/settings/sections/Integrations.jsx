import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import LoadingScreen from "../../../components/Layout/LoadingScreen";

export default function Integrations() {
  const [loading, setLoading] = useState(false);
  const [isDriveConnected, setIsDriveConnected] = useState(true);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  const handleDriveConnect = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}google/auth-url`, {
        withCredentials: true,
      });
      window.location.assign(response.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    try {
      await axios.get(`${API_URL}google/disconnect`, {
        withCredentials: true,
      });
      setIsDriveConnected(false);
      setShowDisconnectModal(false);
    } catch (error) {
      console.error("Could not disconnect", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin-settings-card admin-settings-card--integrations">
        <h2 className="admin-settings-card__title">Integration</h2>
        <div className="admin-settings-card__divider" />

        <p className="admin-integrations-description">
          Connect Sign App to your favourite tools to streamline your document
          workflow.
        </p>

        <div className="admin-integrations-list">
          <div className="admin-integration-item">
            <div className="admin-integration-item-left">
              <div className="admin-integration-item-header">
                <svg
                  viewBox="0 0 87.3 78"
                  className="admin-integration-logo"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
                  <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
                  <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
                  <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
                  <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
                  <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
                </svg>

                <div className="admin-integration-info">
                  <h3 className="admin-integration-title">Google Drive</h3>
                  <span className="admin-integration-status">
                    {isDriveConnected ? "CONNECTED" : "DISCONNECTED"}
                  </span>
                </div>
              </div>

              <p className="admin-integration-description">
                Sync your signed documents directly to Sync your signed
                documents directly to Google Drive for instant access and
                secure storage. Enjoy seamless organization, real-time backup,
                and effortless sharing with your team.Google drive
              </p>
            </div>

            <div className="admin-integration-item-right">
              {isDriveConnected ? (
                <button
                  className="admin-integration-action-btn disconnect"
                  type="button"
                  onClick={() => setShowDisconnectModal(true)}
                >
                  DISCONNECT
                </button>
              ) : (
                <button
                  className="admin-integration-action-btn connect"
                  type="button"
                  onClick={handleDriveConnect}
                >
                  CONNECT
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDisconnectModal && (
        <div
          className="integration-modal-backdrop"
          onClick={() => setShowDisconnectModal(false)}
        >
          <div
            className="integration-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="integration-modal-content">
              <div className="integration-modal-header-row">
                <svg
                  viewBox="0 0 24 24"
                  className="integration-modal-warning-icon"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                    stroke="#E5252A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="integration-modal-title">
                  Disconnect Integration?
                </h3>
              </div>

              <p className="integration-modal-description">
                Disconnecting will stop data sync and disable related work
                flows. Existing Documents will not be affected.
              </p>

              <ul className="integration-modal-list">
                <li>No new document will sync</li>
                <li>Automations using this integrations will stop</li>
                <li>You can reconnect anytime</li>
              </ul>
            </div>

            <div className="integration-modal-footer">
              <button
                className="integration-modal-btn cancel-btn"
                onClick={() => setShowDisconnectModal(false)}
              >
                Cancel
              </button>
              <button
                className="integration-modal-btn disconnect-btn"
                onClick={handleDisconnect}
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <LoadingScreen
          state="connecting"
          size={64}
          theme="dark"
          message="Signing Up"
        />
      )}
    </>
  );
}
