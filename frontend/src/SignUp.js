import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme") || "light";

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add real registration logic here
    if (email && password) {
      // Simulate registration
      localStorage.setItem("user", email);
      navigate("/profile");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
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