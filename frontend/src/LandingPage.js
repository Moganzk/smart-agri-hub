import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

function LandingPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: theme === "dark" ? "#181c1f" : "#f0fff0" }}>
      <div style={{ maxWidth: 600, textAlign: "center", padding: 32, background: theme === "dark" ? "#232323" : "#fff", borderRadius: 18, boxShadow: "0 4px 24px rgba(60,120,60,0.10)", margin: 24 }}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>🌱</div>
        <h1 style={{ color: "#388e3c", fontWeight: 800, fontSize: 38, marginBottom: 8 }}>Smart Agri Hub</h1>
        <p style={{ color: theme === "dark" ? "#bdbdbd" : "#555", fontSize: 18, marginBottom: 24 }}>
          Your digital farming assistant. Get crop advice, pest prediction, weather updates, and more—powered by AI, inspired by Plantix.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 24 }}>
          <button onClick={() => navigate("/signup")} style={{ background: "#388e3c", color: "#fff", border: "none", borderRadius: 8, padding: "0.9rem 2.2rem", fontWeight: 700, fontSize: 18, cursor: "pointer", boxShadow: "0 2px 8px rgba(60,120,60,0.08)" }}>Get Started</button>
          <button onClick={() => navigate("/signin")} style={{ background: "#fff", color: "#388e3c", border: "1.5px solid #388e3c", borderRadius: 8, padding: "0.9rem 2.2rem", fontWeight: 700, fontSize: 18, cursor: "pointer" }}>Sign In</button>
        </div>
        <div style={{ marginTop: 32 }}>
          <h2 style={{ color: "#388e3c", fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Why Smart Agri Hub?</h2>
          <ul style={{ listStyle: "none", padding: 0, color: theme === "dark" ? "#e0e0e0" : "#333", fontSize: 16, textAlign: "left", maxWidth: 420, margin: "0 auto" }}>
            <li style={{ marginBottom: 10 }}>🌾 <b>AI Chatbot:</b> Ask anything about crops, pests, or farming.</li>
            <li style={{ marginBottom: 10 }}>🐛 <b>Pest Prediction:</b> Get instant pest risk analysis for your farm.</li>
            <li style={{ marginBottom: 10 }}>☁️ <b>Weather Insights:</b> Accurate, location-based weather forecasts.</li>
            <li style={{ marginBottom: 10 }}>📱 <b>Mobile Friendly:</b> Use on any device, anywhere.</li>
            <li style={{ marginBottom: 10 }}>🔒 <b>Secure & Private:</b> Your data is safe with us.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LandingPage; 