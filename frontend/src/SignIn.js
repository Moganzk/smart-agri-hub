import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme") || "light";

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add real authentication logic here
    if (email && password) {
      // Simulate login
      localStorage.setItem("user", email);
      navigate("/profile");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Sign In</button>
      </form>
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