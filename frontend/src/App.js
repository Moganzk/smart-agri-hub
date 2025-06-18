import React, { useState } from "react";
import './App.css';

function App() {
  // Chatbot state
  const [chatInput, setChatInput] = useState("");
  const [chatReply, setChatReply] = useState("");

  // Pest prediction state
  const [pestTemp, setPestTemp] = useState("");
  const [pestHum, setPestHum] = useState("");
  const [pestResult, setPestResult] = useState("");

  // Weather prediction state
  const [weatherTemp, setWeatherTemp] = useState("");
  const [weatherHum, setWeatherHum] = useState("");
  const [weatherResult, setWeatherResult] = useState("");

  // Image diagnosis state (future expansion)
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handlers
  const handleChat = async (e) => {
    e.preventDefault();
    setChatReply("Loading...");
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: chatInput }),
    });
    const data = await res.json();
    setChatReply(data.reply || data.error);
  };

  const handlePest = async (e) => {
    e.preventDefault();
    setPestResult("Loading...");
    const res = await fetch("/predict/pest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ temperature: pestTemp, humidity: pestHum }),
    });
    const data = await res.json();
    setPestResult(data.risk || data.error);
  };

  const handleWeather = async (e) => {
    e.preventDefault();
    setWeatherResult("Loading...");
    const res = await fetch("/predict/weather", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ temperature: weatherTemp, humidity: weatherHum }),
    });
    const data = await res.json();
    setWeatherResult(data.condition || data.error);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // You can implement image upload logic here in the future

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0ffe0 0%, #f0fff0 100%)",
      fontFamily: "Segoe UI, sans-serif",
      padding: "2rem"
    }}>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#388e3c", fontWeight: 700 }}>Smart Agri Hub</h1>
        <p style={{ color: "#555" }}>Your digital farming assistant, inspired by Plantix</p>
      </header>

      <main style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center"
      }}>
        {/* Chatbot Card */}
        <section style={cardStyle}>
          <h2 style={sectionTitle}>🌱 Agri Chatbot</h2>
          <form onSubmit={handleChat} style={{ display: "flex", gap: 8 }}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about crops, pests, weather..."
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Send</button>
          </form>
          {chatReply && <div style={resultStyle}>{chatReply}</div>}
        </section>

        {/* Pest Prediction Card */}
        <section style={cardStyle}>
          <h2 style={sectionTitle}>🐛 Pest Risk Prediction</h2>
          <form onSubmit={handlePest} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              type="number"
              value={pestTemp}
              onChange={(e) => setPestTemp(e.target.value)}
              placeholder="Temperature (°C)"
              style={inputStyle}
            />
            <input
              type="number"
              value={pestHum}
              onChange={(e) => setPestHum(e.target.value)}
              placeholder="Humidity (%)"
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Predict</button>
          </form>
          {pestResult && <div style={resultStyle}>{pestResult}</div>}
        </section>

        {/* Weather Prediction Card */}
        <section style={cardStyle}>
          <h2 style={sectionTitle}>☀️ Weather Prediction</h2>
          <form onSubmit={handleWeather} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              type="number"
              value={weatherTemp}
              onChange={(e) => setWeatherTemp(e.target.value)}
              placeholder="Temperature (°C)"
              style={inputStyle}
            />
            <input
              type="number"
              value={weatherHum}
              onChange={(e) => setWeatherHum(e.target.value)}
              placeholder="Humidity (%)"
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Predict</button>
          </form>
          {weatherResult && <div style={resultStyle}>{weatherResult}</div>}
        </section>

        {/* Image Diagnosis Card (future) */}
        <section style={cardStyle}>
          <h2 style={sectionTitle}>📷 Plant Disease Diagnosis</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: 8 }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8 }}
            />
          )}
          <div style={{ color: "#888", marginTop: 8 }}>
            (Coming soon: Upload a plant photo for instant diagnosis!)
          </div>
        </section>
      </main>
    </div>
  );
}

// --- Inline styles for quick prototyping ---
const cardStyle = {
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(60,120,60,0.08)",
  padding: "1.5rem",
  minWidth: 300,
  maxWidth: 350,
  flex: "1 1 320px",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
};

const sectionTitle = {
  color: "#388e3c",
  marginBottom: 12,
  fontWeight: 600,
};

const inputStyle = {
  padding: "0.5rem",
  borderRadius: 6,
  border: "1px solid #bdbdbd",
  fontSize: 16,
};

const buttonStyle = {
  background: "#388e3c",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "0.5rem 1.2rem",
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 8,
};

const resultStyle = {
  marginTop: 12,
  background: "#e8f5e9",
  borderRadius: 6,
  padding: "0.7rem",
  color: "#1b5e20",
  fontWeight: 500,
  minHeight: 32,
};

export default App;
