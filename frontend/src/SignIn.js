import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useTheme } from "./ThemeContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
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
    <div className={`auth-container${theme === "dark" ? " dark" : ""}`}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Sign In</button>
      </form>
      <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}>
        Sign In with Google
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
      <section className={theme === "dark" ? "dashboard-section dark" : "dashboard-section"}>
        {/* ... */}
      </section>
    </div>
  );
}

export default SignIn;