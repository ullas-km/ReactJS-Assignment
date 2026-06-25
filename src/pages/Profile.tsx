import { useState } from "react";
import { changePassword } from "../services/userApi";
import "../assets/css/profile.css";
import axios from "axios";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    if (currentPassword === newPassword) {
      setError("New password must be different from current password");
      return;
    }

    try {
  setLoading(true);
  await changePassword(user.user_id, currentPassword, newPassword);

  setSuccess("Password changed successfully!");
  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");

  setTimeout(() => {
    setShowModal(false);
    setSuccess("");
  }, 2000);
} catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    setError(
      typeof err.response?.data === "string"
        ? err.response.data
        : "Failed to change password"
    );
  } else {
    setError("Failed to change password");
  }
} finally {
  setLoading(false);
}
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
    setSuccess("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-page-avatar">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <h2>{user.name}</h2>

        <div className="profile-page-info">
          <div className="info-row">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>
          <div className="info-row">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>
          <div className="info-row">
            <span>Role</span>
            <strong>{user.role}</strong>
          </div>
        </div>

        {/* Show for teacher and student only */}
        {(user.role === "teacher" || user.role === "student") && (
          <button
            className="change-password-btn"
            onClick={() => setShowModal(true)}
          >
            Change Password
          </button>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Change Password</h2>

            {error && <div className="modal-error">{error}</div>}
            {success && <div className="modal-success">{success}</div>}

            <div className="form-group">
              <label htmlFor="currpass">Current Password</label>
              <input
                id="currpass"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="newpass">New Password</label>
              <input
                id="newpass"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 characters"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cnewpass">Confirm New Password</label>
              <input
                id="cnewpass"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
              />
            </div>

            <div className="modal-actions">
              <button
                className="modal-add-btn"
                onClick={handleChangePassword}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
              <button className="modal-cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
