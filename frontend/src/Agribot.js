import React, { useRef, useEffect } from "react";

function Agribot({ chatHistory, chatInput, setChatInput, sendChatMessage, botTyping }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput);
    setChatInput("");
  };

  return (
    <div style={{ background: "#181c1f", color: "#fff", borderRadius: 12, padding: 24, maxWidth: 400, margin: "0 auto" }}>
      <h2 style={{ color: "#00bfae" }}>Agribot Chat</h2>
      <div style={{ minHeight: 200, maxHeight: 300, overflowY: "auto", marginBottom: 16 }}>
        {chatHistory.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "8px 0"
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: msg.sender === "user" ? "#007bff" : "#23272b",
                color: msg.sender === "user" ? "#fff" : "#00ffe1",
                borderRadius: 12,
                padding: "8px 14px",
                maxWidth: "80%",
                wordBreak: "break-word"
              }}
            >
              {msg.sender === "user" ? "You: " : "Agribot: "}
              {msg.text}
            </span>
          </div>
        ))}
        {botTyping && (
          <div style={{ color: "#00ffe1", fontStyle: "italic", margin: "8px 0" }}>
            Agribot is typing<span className="typing-dots">...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSend} style={{ display: "flex", gap: 8 }}>
        <input
          style={{ flex: 1, padding: 10, borderRadius: 8, border: "none", fontSize: 16, background: "#23272b", color: "#fff" }}
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          placeholder="Type your message..."
          disabled={botTyping}
        />
        <button
          style={{ padding: "10px 18px", borderRadius: 8, border: "none", background: "#00ffe1", color: "#181c1f", fontWeight: "bold", cursor: "pointer" }}
          type="submit"
          disabled={botTyping || !chatInput.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Agribot;