import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useTheme } from "./ThemeContext";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ full_name: "", phone: "", region: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
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
      setForm({
        full_name: data?.full_name || "",
        phone: data?.phone || "",
        region: data?.region || "",
      });
    };
    getProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    navigate("/signin");
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name,
        phone: form.phone,
        region: form.region,
      })
      .eq("id", profile.id);
    setSaving(false);
    if (error) {
      setError("Failed to update profile.");
    } else {
      setMessage("Profile updated successfully!");
      setProfile((p) => ({ ...p, ...form }));
      setEdit(false);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className={`profile-container${theme === "dark" ? " dark" : ""}`} style={{ maxWidth: 420, margin: "3rem auto", boxShadow: "0 4px 24px rgba(60,120,60,0.15)", borderRadius: 18, padding: 32 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 18 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#e0ffe0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, marginBottom: 8 }}>
          <span role="img" aria-label="avatar">👤</span>
        </div>
        <span style={{ color: "#388e3c", fontWeight: 700, fontSize: 24 }}>Profile</span>
      </div>
      <form onSubmit={handleSave} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
        <label style={{ fontWeight: 600, color: "#388e3c" }}>Full Name</label>
        <input name="full_name" value={edit ? form.full_name : profile.full_name} onChange={handleChange} disabled={!edit} style={{ padding: 10, borderRadius: 8, border: "1px solid #bdbdbd", fontSize: 16 }} />
        <label style={{ fontWeight: 600, color: "#388e3c" }}>Email</label>
        <input value={profile.email} disabled style={{ padding: 10, borderRadius: 8, border: "1px solid #bdbdbd", fontSize: 16, background: theme === "dark" ? "#232323" : "#f5f5f5" }} />
        <label style={{ fontWeight: 600, color: "#388e3c" }}>Role</label>
        <input value={profile.role} disabled style={{ padding: 10, borderRadius: 8, border: "1px solid #bdbdbd", fontSize: 16, background: theme === "dark" ? "#232323" : "#f5f5f5" }} />
        <label style={{ fontWeight: 600, color: "#388e3c" }}>Phone</label>
        <input name="phone" value={edit ? form.phone : profile.phone} onChange={handleChange} disabled={!edit} style={{ padding: 10, borderRadius: 8, border: "1px solid #bdbdbd", fontSize: 16 }} />
        <label style={{ fontWeight: 600, color: "#388e3c" }}>Region</label>
        <input name="region" value={edit ? form.region : profile.region} onChange={handleChange} disabled={!edit} style={{ padding: 10, borderRadius: 8, border: "1px solid #bdbdbd", fontSize: 16 }} />
        {message && <div style={{ color: "#388e3c", background: "#e0ffe0", borderRadius: 6, padding: 8, textAlign: "center" }}>{message}</div>}
        {error && <div style={{ color: "#d32f2f", background: "#fff0f0", borderRadius: 6, padding: 8, textAlign: "center" }}>{error}</div>}
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {edit ? (
            <>
              <button type="submit" disabled={saving} style={{ background: "#388e3c", color: "#fff", border: "none", borderRadius: 8, padding: "0.7rem 1.8rem", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>{saving ? "Saving..." : "Save"}</button>
              <button type="button" onClick={() => { setEdit(false); setForm({ full_name: profile.full_name, phone: profile.phone, region: profile.region }); setError(""); setMessage(""); }} style={{ background: "#fff", color: "#388e3c", border: "1.5px solid #388e3c", borderRadius: 8, padding: "0.7rem 1.8rem", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Cancel</button>
            </>
          ) : (
            <button type="button" onClick={() => setEdit(true)} style={{ background: "#388e3c", color: "#fff", border: "none", borderRadius: 8, padding: "0.7rem 1.8rem", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>Edit</button>
          )}
          <button type="button" onClick={handleLogout} style={{ background: "#d32f2f", color: "#fff", border: "none", borderRadius: 8, padding: "0.7rem 1.8rem", fontWeight: 700, fontSize: 16, cursor: "pointer", marginLeft: "auto" }}>Log Out</button>
        </div>
      </form>
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