import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const user = localStorage.getItem("user");
  const theme = localStorage.getItem("theme") || "light";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  if (!user) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Email: {user}</p>
      <button onClick={handleLogout}>Log Out</button>
      <main className={`dashboard-main${theme === "dark" ? " dark" : ""}`}>
        <section className={theme === "dark" ? "dashboard-section dark" : "dashboard-section"}>
          {/* ... */}
        </section>
      </main>
    </div>
  );
}

export default Profile;