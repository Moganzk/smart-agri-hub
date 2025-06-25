import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useTheme } from "./ThemeContext";

function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/signin");
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(data);
    };
    getProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    navigate("/signin");
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className={`profile-container${theme === "dark" ? " dark" : ""}`}>
      <h2>Profile</h2>
      <p>Name: {profile.full_name}</p>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
      <p>Phone: {profile.phone}</p>
      <p>Region: {profile.region}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

function Navbar() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  return (
    <nav>
      {/* ...other nav items... */}
      {profile && (
        <span>
          <img
            src={`https://ui-avatars.com/api/?name=${profile.full_name}`}
            alt="avatar"
            style={{ width: 32, borderRadius: "50%" }}
          />
          {profile.full_name}
        </span>
      )}
    </nav>
  );
}

export default Profile;
export { Navbar };