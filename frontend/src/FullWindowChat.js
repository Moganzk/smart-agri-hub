import React, { useState, useRef, useEffect } from "react";

function FullWindowChat({ onClose, chatHistory, sendChatMessage, botTyping }) {
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendChatMessage(input);
    setInput("");
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.window}>
        <button style={styles.closeBtn} onClick={onClose}>✖</button>
        <h2 style={{ margin: 0, color: "#00bfae" }}>Agribot - Full Window</h2>
        <div style={styles.chatBox}>
          {chatHistory.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                background: msg.sender === "user" ? "#007bff" : "#23272b",
                color: msg.sender === "user" ? "#fff" : "#00ffe1",
              }}
            >
              {msg.sender === "user" ? "You: " : "Agribot: "}
              {msg.text}
            </div>
          ))}
          {botTyping && (
            <div style={{ color: "#00ffe1", fontStyle: "italic", margin: "8px 0" }}>
              Agribot is typing<span className="typing-dots">...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <form style={styles.inputRow} onSubmit={handleSend}>
          <input
            style={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={botTyping}
            autoFocus
          />
          <button style={styles.sendBtn} type="submit" disabled={botTyping || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    background: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center"
  },
  window: {
    background: "#181c1f", borderRadius: 16, padding: 24, width: "95vw", maxWidth: 600, minHeight: 500, boxShadow: "0 0 24px #00ffe1"
  },
  closeBtn: {
    position: "absolute", top: 24, right: 32, background: "none", border: "none", color: "#00ffe1", fontSize: 28, cursor: "pointer"
  },
  chatBox: {
    background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 16, minHeight: 320, maxHeight: 400, overflowY: "auto", margin: "16px 0", display: "flex", flexDirection: "column"
  },
  message: {
    margin: "8px 0", padding: "10px 16px", borderRadius: 12, maxWidth: "80%", wordBreak: "break-word"
  },
  inputRow: { display: "flex", gap: 8 },
  input: { flex: 1, padding: 10, borderRadius: 8, border: "none", fontSize: 16, background: "#23272b", color: "#fff" },
  sendBtn: { padding: "10px 18px", borderRadius: 8, border: "none", background: "#00ffe1", color: "#181c1f", fontWeight: "bold", cursor: "pointer" }
};

export default FullWindowChat;