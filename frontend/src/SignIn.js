import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useTheme } from "./ThemeContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);

    // Fetch profile and redirect
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single();
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
      if (profile.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    }
  };

  return (
    <div className={`auth-container${theme === "dark" ? " dark" : ""}`} style={{ boxShadow: "0 4px 24px rgba(60,120,60,0.15)", maxWidth: 400 }}>
      {/* Logo or App Name */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 12 }}>
        {/* <img src="/logo192.png" alt="Logo" style={{ width: 56, marginBottom: 8 }} /> */}
        <span style={{ fontWeight: 700, fontSize: 28, color: "#388e3c", letterSpacing: 1 }}>Smart Agri Hub</span>
        <span style={{ color: "#888", fontSize: 14, marginTop: 2 }}>Sign in to your account</span>
      </div>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div style={{ position: "relative", marginBottom: 16 }}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ paddingLeft: 36 }} />
          <span style={{ position: "absolute", left: 10, top: 12, color: "#388e3c", fontSize: 18 }}>
            <i className="fa fa-envelope" />
          </span>
        </div>
        <div style={{ position: "relative", marginBottom: 16 }}>
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ paddingLeft: 36, paddingRight: 36 }} />
          <span style={{ position: "absolute", left: 10, top: 12, color: "#388e3c", fontSize: 18 }}>
            <i className="fa fa-lock" />
          </span>
          <span style={{ position: "absolute", right: 10, top: 12, color: "#888", cursor: "pointer", fontSize: 18 }} onClick={() => setShowPassword(v => !v)}>
            <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
          </span>
        </div>
        <button type="submit" disabled={loading} style={{ marginBottom: 8 }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })} style={{ background: "#fff", color: "#222", border: "1px solid #bdbdbd", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <img src="/logo192.png" alt="Google" style={{ width: 20, height: 20 }} /> Sign In with Google
      </button>
      {error && <div style={{ color: "#d32f2f", background: "#fff0f0", borderRadius: 6, padding: 8, width: "100%", textAlign: "center", marginBottom: 8 }}>{error}</div>}
      <p style={{ marginTop: 8, fontSize: 15 }}>
        Don't have an account? <a href="/signup" style={{ color: "#388e3c", fontWeight: 600 }}>Sign Up</a>
      </p>
    </div>
  );
}

export default SignIn;