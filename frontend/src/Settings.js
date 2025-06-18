import React, { useState } from "react";

function Settings() {
  // Example settings state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") === "true"
  );
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Handle theme change
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    localStorage.setItem("theme", e.target.value);
    setMessage("Theme updated!");
  };

  // Handle notifications toggle
  const handleNotificationsChange = (e) => {
    setNotifications(e.target.checked);
    localStorage.setItem("notifications", e.target.checked);
    setMessage("Notification preference updated!");
  };

  // Handle password change (simulated)
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    // TODO: Connect to backend for real password change
    setMessage("Password changed successfully!");
    setPassword("");
  };

  // Removed duplicate theme declaration to avoid redeclaration error

  return (
    <div className="profile-container">
      <h2>Settings</h2>

      <div style={{ width: "100%", marginBottom: "1.5rem" }}>
        <label style={{ fontWeight: 500 }}>Theme:</label>
        <select
          value={theme}
          onChange={handleThemeChange}
          style={{ marginLeft: 10, padding: "0.5rem", borderRadius: 6 }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div style={{ width: "100%", marginBottom: "1.5rem" }}>
        <label style={{ fontWeight: 500 }}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationsChange}
            style={{ marginRight: 8 }}
          />
          Enable notifications
        </label>
      </div>

      <form onSubmit={handlePasswordChange} style={{ width: "100%" }}>
        <label style={{ fontWeight: 500 }}>Change Password:</label>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: 8, marginBottom: 8, width: "100%" }}
        />
        <button type="submit" style={{ width: "100%" }}>
          Change Password
        </button>
      </form>

      {message && (
        <div style={{ marginTop: 12, color: "#388e3c" }}>{message}</div>
      )}
      <section
        className={
          theme === "dark" ? "dashboard-section dark" : "dashboard-section"
        }
      >
        {/* ... */}
      </section>
    </div>
  );
}

export default Settings;