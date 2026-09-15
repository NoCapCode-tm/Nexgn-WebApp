import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Filter, MoreVertical, Plus } from "lucide-react";
import { API_URL } from "../../../config";
import { toast } from "react-toastify";
import { Skeleton } from "../../../components/common/Skeleton";

const permissionCategories = [
  { category: "Dashboard", items: ["View", "Analytics", "Reports Export"] },
  { category: "Templates", items: ["View", "Create", "Delete"] },
  {
    category: "Documents",
    items: [
      "View",
      "Upload",
      "Edit",
      "Delete",
      "Send for Signature",
      "Cancel Requests",
      "Archive",
    ],
  },
  {
    category: "Contact Books",
    items: ["View", "Add", "Edit", "Delete"],
  },
];

function Permissions({ subAdminId, onBack }) {
  const [loading, setLoading] = useState(false);
  const [permissionsState, setPermissionsState] = useState({});

  const togglePermission = (key) => {
    setPermissionsState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSavePermissions = async () => {
    setLoading(true);

    try {
      const selectedPermissions = Object.entries(permissionsState)
        .filter(([_, checked]) => checked)
        .map(([permission]) => permission);

      const response = await axios.post(
        `${API_URL}admin/addpermissions`,
        {
          id: subAdminId,
          permissions: selectedPermissions,
        },
        { withCredentials: true }
      );

      toast.success(
        response.data.message || "Permissions saved successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.data ||
          error.message ||
          "Failed to save permissions"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin-permissions-card">
        <h2 className="admin-permissions-card__title">Permission Settings</h2>
        <div className="admin-permissions-card__divider" />

        <div className="admin-permissions-container">
          {permissionCategories.map((category) => (
            <div
              key={category.category}
              className={`admin-permissions-group group-${category.category.replace(
                /\s+/g,
                "-"
              )}`}
            >
              <h3 className="admin-permissions-group-title">
                {category.category}
              </h3>

              <div className="admin-permissions-group-items">
                {category.items.map((item) => {
                  const key = `${category.category}-${item}`;
                  const isChecked = permissionsState[key] || false;

                  return (
                    <label key={item} className="admin-permission-item">
                      <span className="admin-permission-item-label">
                        {item}
                      </span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePermission(key)}
                        className="admin-permission-checkbox-input"
                      />
                      <span className="admin-permission-custom-checkbox" />
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="admin-permissions-footer">
          <button
            type="button"
            className="admin-settings-form__submit"
            onClick={handleSavePermissions}
          >
            Save
          </button>
        </div>
      </div>

      {loading && (
        <LoadingScreen
          state="connecting"
          size={64}
          theme="dark"
          message="Saving permissions"
        />
      )}
    </>
  );
}

export default function TeamManagement({ onPermissionModeChange, resetPermissionsKey = 0 }) {
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamActionOpen, setTeamActionOpen] = useState(null);
  const [showAddSubAdminModal, setShowAddSubAdminModal] = useState(false);
  const [newSubAdmin, setNewSubAdmin] = useState({ name: "", email: "" });
  const [subAdminErrors, setSubAdminErrors] = useState({});
  const [viewingPermissions, setViewingPermissions] = useState(null);
  const teamActionRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}admin/getsubadmin`, {
          withCredentials: true,
        });
        setTeamMembers(response.data.message || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        teamActionRef.current &&
        !teamActionRef.current.contains(event.target)
      ) {
        setTeamActionOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    onPermissionModeChange?.(Boolean(viewingPermissions));
  }, [viewingPermissions, onPermissionModeChange]);

  useEffect(() => {
    setViewingPermissions(null);
  }, [resetPermissionsKey]);

  const handleRemove = async (id) => {
    setLoading(true);

    try {
      await axios.post(`${API_URL}admin/delete`, { id }, { withCredentials: true });

      setTeamMembers((prev) => prev.filter((member) => member._id !== id));
      setTeamActionOpen(null);
    } catch (error) {
      console.error("Something went wrong", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPermissions = (sub) => {
    setViewingPermissions(sub._id);
    setTeamActionOpen(null);
  };

  const handleAddSubAdmin = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!newSubAdmin.name.trim()) errors.name = "Full name is required";
    if (!newSubAdmin.email.trim()) errors.email = "Email address is required";

    if (Object.keys(errors).length > 0) {
      setSubAdminErrors(errors);
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${API_URL}admin/invite`,
        {
          name: newSubAdmin.name,
          email: newSubAdmin.email,
        },
        { withCredentials: true }
      );

      setSubAdminErrors({});
      setTeamMembers((prev) => [
        ...prev,
        {
          _id: Date.now(),
          name: newSubAdmin.name,
          email: newSubAdmin.email,
          role: "Sub-admin",
          status: "Active",
          invitestatus: "Active",
        },
      ]);
      setNewSubAdmin({ name: "", email: "" });
      setShowAddSubAdminModal(false);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (viewingPermissions) {
    return (
      <Permissions
        subAdminId={viewingPermissions}
        onBack={() => setViewingPermissions(null)}
      />
    );
  }

  return (
    <>
      <div className="admin-settings-card admin-settings-card--team">
        <h2 className="admin-settings-card__title">Team Management</h2>
        <div className="admin-settings-card__divider" />

        <div className="ms-mobile-team-filter-row">
          <div className="ms-mobile-team-search">
            <input type="text" placeholder="Search" />
          </div>
          <button className="ms-mobile-team-icon-btn" type="button">
            <Filter size={18} strokeWidth={1.5} color="#4B5563" />
          </button>
          <button
            className="ms-mobile-team-icon-btn"
            type="button"
            onClick={() => setShowAddSubAdminModal(true)}
          >
            <Plus size={18} strokeWidth={1.5} color="#4B5563" />
          </button>
        </div>

        <div className="admin-settings-team-table">
          <div className="admin-settings-team-header">
            <div className="team-col-name">Name</div>
            <div className="team-col-role">Role</div>
            <div className="team-col-status">Status</div>
            <div className="team-col-action">Action</div>
          </div>

          <div className="admin-settings-team-list">
            {loading && teamMembers.length === 0 ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div className="admin-settings-team-row" key={idx}>
                  <div className="team-col-name" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <Skeleton width="140px" height="16px" />
                      <Skeleton width="180px" height="12px" />
                  </div>
                  <div className="team-right-controls">
                      <div className="team-col-role"><Skeleton width="70px" height="24px" borderRadius="6px" /></div>
                      <div className="team-col-status"><Skeleton width="70px" height="24px" borderRadius="4px" /></div>
                      <div className="team-col-action"><Skeleton width="24px" height="24px" borderRadius="50%" /></div>
                  </div>
                </div>
              ))
            ) : teamMembers.length > 0 ? (
              teamMembers.map((sub) => (
                <div
                  className="admin-settings-team-row"
                  key={sub?._id}
                  style={{
                    zIndex: teamActionOpen === sub?._id ? 10 : 1,
                  }}
                >
                  <div className="team-col-name">
                    <div className="team-admin-name">{sub?.name}</div>
                    <div className="team-admin-email">{sub?.email}</div>
                  </div>

                  <div className="team-right-controls">
                    <div className="team-col-role">
                      <span className="team-role-badge">{sub?.role}</span>
                    </div>

                    <div className="team-col-status">
                      <span
                        className={`team-status-badge ${
                          sub.invitestatus === "Active" ? "active" : "inactive"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>

                    <div className="team-col-action">
                      <button
                        className="team-action-btn"
                        type="button"
                        onClick={() =>
                          setTeamActionOpen(
                            teamActionOpen === sub._id ? null : sub._id
                          )
                        }
                      >
                        <MoreVertical size={20} color="#666" />
                      </button>

                      {teamActionOpen === sub._id && (
                        <div className="team-action-dropdown" ref={teamActionRef}>
                          <button
                            className="team-dropdown-item permissions"
                            type="button"
                            onClick={() => handleViewPermissions(sub)}
                          >
                            Permissions
                          </button>
                          <button
                            className="team-dropdown-item delete"
                            type="button"
                            onClick={() => handleRemove(sub._id)}
                          >
                            <span className="team-x-icon">×</span> Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: "24px", textAlign: "center", color: "#666" }}>
                No team members found.
              </div>
            )}
          </div>
        </div>

        <div className="admin-settings-team-footer">
          <button
            className="admin-settings-form__submit"
            type="button"
            onClick={() => setShowAddSubAdminModal(true)}
          >
            Add Sub-admin
          </button>
        </div>
      </div>

      {showAddSubAdminModal && (
        <div
          className="add-contact-modal-overlay"
          onClick={() => {
            setShowAddSubAdminModal(false);
            setSubAdminErrors({});
          }}
        >
          <form
            className="add-contact-modal add-contact-modal--compact"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAddSubAdmin}
            noValidate
          >
            <h3 className="add-contact-heading">Add Sub-admin</h3>

            <div className="add-contact-grid">
              <div className="add-contact-field">
                <label htmlFor="subadmin-name">
                  Full Name <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  id="subadmin-name"
                  value={newSubAdmin.name}
                  onChange={(e) => {
                    setNewSubAdmin((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                    if (subAdminErrors.name) {
                      setSubAdminErrors((prev) => ({
                        ...prev,
                        name: undefined,
                      }));
                    }
                  }}
                  className={subAdminErrors.name ? "field-error" : ""}
                  required
                />
                {subAdminErrors.name && (
                  <span className="field-error-msg">{subAdminErrors.name}</span>
                )}
              </div>

              <div className="add-contact-field">
                <label htmlFor="subadmin-email">
                  Email Address <span className="required-asterisk">*</span>
                </label>
                <input
                  type="email"
                  id="subadmin-email"
                  value={newSubAdmin.email}
                  onChange={(e) => {
                    setNewSubAdmin((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                    if (subAdminErrors.email) {
                      setSubAdminErrors((prev) => ({
                        ...prev,
                        email: undefined,
                      }));
                    }
                  }}
                  className={subAdminErrors.email ? "field-error" : ""}
                  required
                />
                {subAdminErrors.email && (
                  <span className="field-error-msg">{subAdminErrors.email}</span>
                )}
              </div>
            </div>

            <div className="add-contact-save-row">
              <button type="submit" className="add-contact-save-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
  
    </>
  );
}