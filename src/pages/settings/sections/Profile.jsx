import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import LoadingScreen from "../../../components/Layout/LoadingScreen";
import AvatarImg from "../../../assets/Avatar.png";

const DEFAULT_AVATAR = AvatarImg;

export default function Profile({ user, onUserUpdated }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [profileFile, setProfileFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) return;
    setFormData({
      fullName: user.name || "",
      email: user.email || "",
      phone: user.phone_no || "NA",
    });
  }, [user]);

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileFile(file);

    const reader = new FileReader();
    reader.onload = (event) => setAvatar(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${API_URL}admin/update`,
        {
          name: formData.fullName,
          phone_no: formData.phone,
          profile_picture: profileFile,
        },
        { withCredentials: true }
      );

      onUserUpdated?.(response.data?.message);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin-settings-card admin-settings-card--profile">
        <h2 className="admin-settings-card__title">Profile</h2>
        <div className="admin-settings-card__divider" />

        <div className="admin-settings-avatar-row">
          <div className="admin-settings-avatar">
            <img
              src={user?.profile_picture || avatar}
              alt="User avatar"
              className="admin-settings-avatar__img"
            />
          </div>

          <div className="admin-settings-avatar-info">
            <input
              type="file"
              accept="image/jpeg,image/gif,image/png"
              ref={fileInputRef}
              className="admin-settings-avatar__file-input"
              onChange={handleAvatarUpload}
            />

            <button
              className="admin-settings-avatar__upload-btn"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Avatar
            </button>

            <p className="admin-settings-avatar__helper">
              JPG, GIF or PNG. Max size of 800K
            </p>
          </div>
        </div>

        <form className="admin-settings-form" onSubmit={handleUpdate}>
          <div className="admin-settings-form__group">
            <label className="admin-settings-form__label" htmlFor="admin-settings-full-name">
              Full Name
            </label>
            <input
              type="text"
              id="admin-settings-full-name"
              name="fullName"
              className="admin-settings-form__input"
              value={formData.fullName}
              onChange={handleFormChange}
              autoComplete="name"
            />
          </div>

          <div className="admin-settings-form__group">
            <label className="admin-settings-form__label" htmlFor="admin-settings-email">
              Email Address
            </label>
            <input
              type="email"
              id="admin-settings-email"
              name="email"
              className="admin-settings-form__input admin-settings-form__input--readonly"
              value={formData.email}
              readOnly
              aria-readonly="true"
            />
            <p className="admin-settings-form__helper">
              Email address cannot be changed here
            </p>
          </div>

          <div className="admin-settings-form__group">
            <label className="admin-settings-form__label" htmlFor="admin-settings-phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="admin-settings-phone"
              name="phone"
              className="admin-settings-form__input"
              value={formData.phone}
              onChange={handleFormChange}
              autoComplete="tel"
            />
          </div>

          <div className="admin-settings-form__footer">
            <button type="submit" className="admin-settings-form__submit">
              Update Profile
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <LoadingScreen
          state="working"
          size={64}
          theme="dark"
          message="Applying your master plan"
        />
      )}
    </>
  );
}
