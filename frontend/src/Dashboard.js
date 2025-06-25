import React, { useState, useEffect } from "react";
import FullWindowChat from "./FullWindowChat";
import Agribot from "./Agribot"; // If you want to use the inline chat as a separate component
import { useTheme } from "./ThemeContext";

function Dashboard() {
  const { theme, setTheme, toggleTheme } = useTheme();

  // Chatbot state
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [botTyping, setBotTyping] = useState(false);
  const [showFullChat, setShowFullChat] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false); // <-- Added state for chat expansion

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

  // Location state
  const [city, setCity] = useState("Nairobi");
  const [currentWeather, setCurrentWeather] = useState(null);

  // Farming news state
  const [news, setNews] = useState([]);

  // Handler for sending a message (shared)
  const sendChatMessage = async (msg) => {
    setChatHistory((prev) => [...prev, { sender: "user", text: msg }]);
    setBotTyping(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }), // <-- use msg here!
      });
      const data = await res.json();
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: data.response || "Sorry, I couldn't process your request." },
      ]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't process your request." },
      ]);
    }
    setBotTyping(false);
  };

  // Pest prediction handler
  const handlePest = async (e) => {
    e.preventDefault();
    setPestResult("Loading...");
    try {
      const res = await fetch("http://localhost:5000/predict/pest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ temperature: pestTemp, humidity: pestHum }),
      });
      const data = await res.json();
      setPestResult(data.risk || data.error || "Sorry, could not get prediction.");
    } catch {
      setPestResult("Sorry, could not get prediction.");
    }
  };

  // Weather prediction handler
  const handleWeather = async (e) => {
    e.preventDefault();
    setWeatherResult("Loading...");
    try {
      const res = await fetch("http://localhost:5000/predict/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ temperature: weatherTemp, humidity: weatherHum }),
      });
      const data = await res.json();
      setWeatherResult(data.condition || data.error || "Sorry, could not get prediction.");
    } catch {
      setWeatherResult("Sorry, could not get prediction.");
    }
  };

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Fetch weather data on city change
  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      setCurrentWeather(data);
    };
    fetchWeather();
  }, [city]);

  // Fetch farming news
  useEffect(() => {
    const rssUrl = "https://farmersreviewafrica.com/category/crops/feed/";
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    setNews([]);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log("News API response:", data);
        if (data.status === "ok" && data.items) {
          setNews(data.items);
        } else {
          setNews(null);
        }
      })
      .catch(() => setNews(null));
  }, []);

  // New function to handle chat form submission
  const handleChat = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      sendChatMessage(chatInput);
      setChatInput("");
    }
  };

  return (
    <div>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#388e3c", fontWeight: 700 }}>Smart Agri Hub</h1>
        <p style={{ color: "#555" }}>Your digital farming assistant, inspired by Plantix</p>
      </header>

      <main className={`dashboard-main${theme === "dark" ? " dark" : ""}`} style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center"
      }}>
        {/* Expandable AgriBot Card */}
        <section className={theme === "dark" ? "dashboard-section dark" : "dashboard-section"} style={{ position: "relative", ...cardStyle }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              marginBottom: 8,
            }}
            onClick={() => setIsChatExpanded((v) => !v)}
          >
            <h2 style={{ ...sectionTitle, margin: 0 }}>
              🤖 AgriBot <span role="img" aria-label="seedling">🌱</span>
            </h2>
            <span style={{
              marginLeft: 8,
              fontSize: 22,
              userSelect: "none",
              transition: "transform 0.2s",
              transform: isChatExpanded ? "rotate(90deg)" : "rotate(0deg)"
            }}>
              ▶
            </span>
          </div>
          {isChatExpanded && (
            <div style={{
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              padding: 12,
              background: "rgba(240,255,240,0.7)",
              maxHeight: 320,
              overflowY: "auto",
              marginBottom: 12
            }}>
              {chatHistory.length === 0 && (
                <div style={{ color: "#888", textAlign: "center" }}>
                  Start a conversation with AgriBot!
                </div>
              )}
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    margin: "8px 0",
                    textAlign: msg.sender === "user" ? "right" : "left"
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      background: msg.sender === "user" ? "#c8e6c9" : "#fffde7",
                      color: "#222",
                      borderRadius: 12,
                      padding: "6px 12px",
                      maxWidth: "80%",
                      fontSize: 15,
                    }}
                  >
                    {msg.sender === "bot" && <b>AgriBot 🌱: </b>}
                    {msg.text}
                  </span>
                </div>
              ))}
              {botTyping && (
                <div style={{ color: "#388e3c", fontStyle: "italic", margin: "8px 0" }}>
                  AgriBot is typing<span className="typing-dots">...</span>
                </div>
              )}
            </div>
          )}
          <form onSubmit={handleChat} style={{ display: "flex", gap: 8 }}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about crops, pests, weather..."
              style={inputStyle}
              disabled={!isChatExpanded}
            />
            <button type="submit" style={buttonStyle} disabled={!isChatExpanded}>
              Send
            </button>
          </form>
        </section>

        {/* Pest Prediction Card */}
        <section className={theme === "dark" ? "dashboard-section dark" : "dashboard-section"} style={cardStyle}>
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
          {pestResult && <div>{pestResult}</div>}
        </section>

        {/* Weather Prediction Card */}
        <section className={theme === "dark" ? "dashboard-section dark" : "dashboard-section"} style={cardStyle}>
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
          {weatherResult && <div>{weatherResult}</div>}
        </section>

        {/* Image Diagnosis Card (future) */}
        <section className={theme === "dark" ? "dashboard-section dark" : "dashboard-section"} style={cardStyle}>
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

        {/* Location and Weather Card */}
        <section className={theme === "dark" ? "dashboard-section dark" : "dashboard-section"} style={cardStyle}>
          <h2 style={sectionTitle}>📍 Location Weather</h2>
          <div style={{ marginBottom: 8 }}>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Enter city"
              style={inputStyle}
            />
            {currentWeather && currentWeather.main && (
              <div style={{
                marginTop: 8,
                color: "#1b5e20",
                background: "#e8f5e9",
                borderRadius: 8,
                padding: "0.7rem",
                fontWeight: 500,
                textAlign: "center"
              }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                  Current Weather in {city}
                </div>
                <div>
                  <span role="img" aria-label="thermometer">🌡️</span>
                  <strong> Temperature:</strong> {currentWeather.main.temp}°C
                </div>
                <div>
                  <span role="img" aria-label="humidity">💧</span>
                  <strong> Humidity:</strong> {currentWeather.main.humidity}%
                </div>
                <div>
                  <span role="img" aria-label="weather">🌤️</span>
                  <strong> Condition:</strong> {currentWeather.weather[0].description}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Farming News Section */}
      <section style={{
        margin: "2rem auto",
        maxWidth: 900,
        background: "#f9fbe7",
        borderRadius: 12,
        padding: "1.5rem",
        boxShadow: "0 2px 8px rgba(60,120,60,0.08)"
      }}>
        <h2 style={{ color: "#388e3c", marginBottom: 16 }}>📰 News From Farmers</h2>
        {news === null && (
          <div style={{ color: "#c00" }}>
            Failed to load news. Please try again later.
            <button
              style={{ marginLeft: 12, background: "#388e3c", color: "#fff", border: "none", borderRadius: 6, padding: "0.3rem 1rem", cursor: "pointer" }}
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}
        {news && news.length === 0 && <div>Loading news...</div>}
        {news && news.length > 0 && (
          <ul style={{ paddingLeft: 0, listStyle: "none" }}>
            {news.slice(0, 5).map(item => (
              <li
                key={item.guid || item.link}
                style={{
                  marginBottom: 24,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 8,
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 1px 4px rgba(60,120,60,0.06)",
                  padding: 12,
                }}
              >
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt="news thumbnail"
                    style={{
                      width: 180,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 8,
                      background: "#eee",
                      marginBottom: 8,
                      alignSelf: "center",
                    }}
                  />
                )}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#388e3c",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontSize: 18,
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </a>
                <div style={{ color: "#666", fontSize: 14 }}>
                  {item.pubDate && new Date(item.pubDate).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Full window chat button */}
      <button
        style={{ position: "fixed", bottom: 32, right: 32, zIndex: 1000, background: "#00ffe1", color: "#181c1f", border: "none", borderRadius: "50%", width: 60, height: 60, fontSize: 32, cursor: "pointer" }}
        onClick={() => setShowFullChat(true)}
        title="Open Agribot Full Window"
      >
        🤖
      </button>

      {/* Full window chat modal */}
      {showFullChat && (
        <FullWindowChat
          onClose={() => setShowFullChat(false)}
          chatHistory={chatHistory}
          sendChatMessage={sendChatMessage}
          botTyping={botTyping}
        />
      )}
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

export default Dashboard;