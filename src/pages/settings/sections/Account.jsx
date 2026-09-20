import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import LoadingScreen from "../../../components/Layout/LoadingScreen";

export default function Account({ user, onUserUpdated ,team }) {
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState({
    companyName: "",
    organizationId: "",
    timeZone: "",
    language: "",
  });

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) return;

    setAccountData({
      companyName: team.company_name || "",
      organizationId: team.org_id || "",
      timeZone: user.time_zone || "",
      language: user.language || "",
    });
  }, [user]);

 const handleUpdate = async (e) => {
  e.preventDefault();
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
    console.error(
      "Failed to update account:",
      error.response?.data?.message || error.message
    );
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
                setAccountData((prev) => ({
                  ...prev,
                  companyName: e.target.value,
                }))
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
            <p className="admin-settings-form__helper">
              Used for API integrations
            </p>
          </div>

          <div className="admin-settings-form__group">
            <label className="admin-settings-form__label" htmlFor="admin-settings-timezone">
              Time Zone
            </label>
            <input
              type="text"
              id="admin-settings-timezone"
              className="admin-settings-form__input"
              value={accountData.timeZone}
              onChange={(e) =>
                setAccountData((prev) => ({
                  ...prev,
                  timeZone: e.target.value,
                }))
              }
            />
          </div>

          <div className="admin-settings-form__group">
            <label className="admin-settings-form__label" htmlFor="admin-settings-language">
              Language
            </label>
            <input
              type="text"
              id="admin-settings-language"
              className="admin-settings-form__input"
              value={accountData.language}
              onChange={(e) =>
                setAccountData((prev) => ({
                  ...prev,
                  language: e.target.value,
                }))
              }
            />
          </div>

          <div className="admin-settings-form__footer">
            <button type="submit" className="admin-settings-form__submit">
              Update Account
            </button>
          </div>
        </form>
      </div>

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
