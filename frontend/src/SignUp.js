import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useTheme } from "./ThemeContext";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("farmer");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role, phone, region }
      }
    });
    if (error) return setError(error.message);

    // Insert into profiles table
    if (data.user) {
      await supabase.from("profiles").insert([{
        id: data.user.id,
        full_name: fullName,
        role,
        phone,
        region
      }]);
      setMessage("Check your email for a verification link!");
    }
  };

  return (
    <div className={`auth-container${theme === "dark" ? " dark" : ""}`}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="farmer">Farmer</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
        <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <input type="text" placeholder="Region" value={region} onChange={e => setRegion(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}>
        Sign Up with Google
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}
      <p>
        Already have an account? <a href="/signin">Sign In</a>
      </p>
      <section className={theme === "dark" ? "dashboard-section dark" : "dashboard-section"}>
        {/* ... */}
      </section>
    </div>
  );
}

export default SignUp;