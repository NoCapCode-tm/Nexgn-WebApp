import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { toast } from "react-toastify";
import LoadingScreen from "../../../components/Layout/LoadingScreen";
import { X } from "lucide-react";

export default function Security({ onUserUpdated }) {
  const otpInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    enable2FA: false,
  });

  useEffect(() => {
    if (user) {
      // Replace with your exact user model boolean field:
      // e.g. user.isTwoFactorEnabled, user.twoFAEnabled, or Boolean(user.twoFAsecret)
      const isEnabled = Boolean(
        user.isTwoFactorEnabled ?? user.twoFAEnabled ?? user.is2FAEnabled
      );
      setSecurityData((prev) => ({ ...prev, enable2FA: isEnabled }));
    }
  }, [user]);

  const [show2FAOverlay, setShow2FAOverlay] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [twoFASecret, setTwoFASecret] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [twoFALoading, setTwoFALoading] = useState(false);

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${API_URL}admin/update`,
        {
          currentpass: securityData.currentPassword,
          updatepass: securityData.confirmPassword,
        },
        { withCredentials: true }
      );

      toast.success(response.data?.message || "Password updated successfully");
      onUserUpdated?.(response.data?.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  const close2FAOverlay = () => {
    setShow2FAOverlay(false);
    setShowOTPInput(false);
    setQrCode("");
    setTwoFASecret("");
    setOtp("");
    setTwoFALoading(false);
  };

  const handle2FAToggle = async (e) => {
      const enabled = e.target.checked;

      // --- NEW: Logic to disable 2FA ---
      if (!enabled) {
        try {
          setLoading(true);
          
          // Note: Check if your backend expects a POST, PUT, or DELETE request here. 
          // I am using POST as a standard for this type of action.
          await axios.post(
            `${API_URL}admin/disabletwofa`, 
            {}, 
            { withCredentials: true }
          );

          setSecurityData((prev) => ({ ...prev, enable2FA: false }));
          toast.success("Two-factor authentication disabled successfully");
          
          // Notify parent component so app-wide user state refreshes
          onUserUpdated?.(); 
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Failed to disable 2FA"
          );
          // If the API fails, keep the toggle visually ON so it doesn't get out of sync
          setSecurityData((prev) => ({ ...prev, enable2FA: true }));
        } finally {
          setLoading(false);
        }
        return;
      }

      // --- EXISTING: Logic to start 2FA setup ---
      try {
        setLoading(true);

        const response = await axios.get(`${API_URL}admin/twofa`, {
          withCredentials: true,
        });

        const data = response.data.message;

        setQrCode(data.qrCode);
        setTwoFASecret(data.secret);
        setShow2FAOverlay(true);
        setShowOTPInput(false);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to start 2FA setup"
        );
        // Revert toggle visually if starting setup failed
        setSecurityData((prev) => ({ ...prev, enable2FA: false }));
      } finally {
        setLoading(false);
      }
    };

  const verify2FA = async () => {
    try {
      setTwoFALoading(true);

      await axios.post(
        `${API_URL}admin/twofaverify`,
        { token: otp },
        { withCredentials: true }
      );

      toast.success("Two-factor authentication enabled!");

      setSecurityData((prev) => ({
        ...prev,
        enable2FA: true,
      }));

      close2FAOverlay();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid authentication code"
      );
    } finally {
      setTwoFALoading(false);
    }
  };

  return (
    <>
      <div className="admin-settings-card admin-settings-card--security">
        <h2 className="admin-settings-card__title">Security</h2>
        <div className="admin-settings-card__divider" />

        <form
          className="admin-settings-form"
          onSubmit={handleUpdate}
          id="admin-settings-security-form"
        >
          <h3 className="admin-settings-section-title">Change Password</h3>
          <div className="admin-settings-section-divider" />

          <div className="admin-settings-form__group">
            <label
              className="admin-settings-form__label"
              htmlFor="admin-settings-current-password"
            >
              Current Password
            </label>
            <input
              type="password"
              id="admin-settings-current-password"
              name="currentPassword"
              className="admin-settings-form__input"
              placeholder="Enter current password"
              value={securityData.currentPassword}
              onChange={handleSecurityChange}
            />
          </div>

          <div className="admin-settings-form__group">
            <label
              className="admin-settings-form__label"
              htmlFor="admin-settings-new-password"
            >
              New Password
            </label>
            <input
              type="password"
              id="admin-settings-new-password"
              name="newPassword"
              className="admin-settings-form__input"
              placeholder="Enter new password"
              value={securityData.newPassword}
              onChange={handleSecurityChange}
            />
          </div>

          <div className="admin-settings-form__group">
            <label
              className="admin-settings-form__label"
              htmlFor="admin-settings-confirm-password"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="admin-settings-confirm-password"
              name="confirmPassword"
              className="admin-settings-form__input"
              placeholder="Confirm new password"
              value={securityData.confirmPassword}
              onChange={handleSecurityChange}
            />
          </div>

          <h3 className="admin-settings-section-title">
            Two - Factor Authentication
          </h3>
          <div className="admin-settings-section-divider" />

          <div className="admin-settings-2fa-row">
            <div className="admin-settings-2fa-info">
              <div className="admin-settings-2fa-label">Enable 2FA</div>
              <div className="admin-settings-2fa-helper">
                Add and extra layer of security to your account by enabling
                two-factor authentication
              </div>
            </div>

            <label className="admin-settings-toggle">
              <input
                type="checkbox"
                checked={securityData.enable2FA}
                onChange={handle2FAToggle}
              />
              <span className="admin-settings-toggle-slider" />
            </label>
          </div>

          <div className="admin-settings-form__footer">
            <button
              type="submit"
              className="admin-settings-form__submit"
              id="admin-settings-update-security-btn"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {show2FAOverlay && (
        <div
          className="admin-2fa-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              close2FAOverlay();
            }
          }}
        >
          <div
            className="admin-2fa-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="admin-2fa-close-btn"
              onClick={close2FAOverlay}
              aria-label="Close two-factor authentication setup"
              title="Close"
            >
              <X size={20} strokeWidth={2} />
            </button>
            {!showOTPInput ? (
              <>
                <h2>Set up Two-Factor authentication</h2>
                <p>Scan the QR code using your authenticator app</p>

                <div className="admin-2fa-qr-wrapper">
                  <div className="admin-2fa-corner tl" />
                  <div className="admin-2fa-corner tr" />
                  <div className="admin-2fa-corner bl" />
                  <div className="admin-2fa-corner br" />
                  <div className="admin-2fa-qr">
                    <img src={qrCode} alt="2FA QR Code" />
                  </div>
                </div>

                <div className="admin-2fa-or">
                  <span>OR</span>
                </div>
                <p className="admin-2fa-manual-label">Enter code manually.</p>

                <div className="admin-2fa-input-wrapper">
                  <div className="admin-2fa-corner tl" />
                  <div className="admin-2fa-corner tr" />
                  <div className="admin-2fa-corner bl" />
                  <div className="admin-2fa-corner br" />
                  <input
                    type="text"
                    className="admin-2fa-manual-input"
                    value={twoFASecret}
                    readOnly
                  />
                </div>

                <button
                  type="button"
                  className="admin-2fa-btn-primary"
                  onClick={() => setShowOTPInput(true)}
                >
                  Verify
                </button>
              </>
            ) : (
              <>
                <h2>Verify Authenticator</h2>
                <p>Enter 6-digit code shown in your authenticator app</p>

                <div
                  className="admin-2fa-otp-wrapper"
                  onClick={() => otpInputRef.current?.focus()}
                >
                  <div className="admin-2fa-corner tl" />
                  <div className="admin-2fa-corner tr" />
                  <div className="admin-otp-boxes">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`admin-otp-box ${otp[i] ? "filled" : ""}`}
                      >
                        {otp[i] || ""}
                      </div>
                    ))}
                  </div>
                  <div className="admin-2fa-corner bl" />
                  <div className="admin-2fa-corner br" />
                  <input
                    ref={otpInputRef}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ""))
                    }
                    className="admin-otp-hidden-input"
                    autoFocus
                  />
                </div>

                <div className="admin-2fa-actions">
                  <button
                    type="button"
                    className="admin-2fa-btn-primary"
                    disabled={otp.length !== 6 || twoFALoading}
                    onClick={verify2FA}
                  >
                    {twoFALoading ? "Verifying..." : "Verify"}
                  </button>
                  <button
                    type="button"
                    className="admin-2fa-btn-outline"
                    onClick={() => setShowOTPInput(false)}
                  >
                    Back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {loading && (
        <LoadingScreen
          state="connecting"
          size={64}
          theme="dark"
          message="Applying your master plan"
        />
      )}
    </>
  );
}
