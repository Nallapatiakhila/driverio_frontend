import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./AIChat.css";

const AIChat = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "initial",
      sender: "ai",
      text: "Hello! I'm your Driverio Assistant. How can I help you with your bookings or schedules today?"
    }
  ]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  const askAI = async (e) => {
    if (e) e.preventDefault();
    if (!question.trim()) return;

    const userText = question;
    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: userText
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post("https://driverio-backend-1.onrender.com/api/ai/ask", {
        question: userText
      });

      let reply = "";
      if (typeof res.data === "string") {
        reply = res.data;
      } else if (res.data && typeof res.data === "object") {
        reply = res.data.response || res.data.answer || JSON.stringify(res.data, null, 2);
      } else {
        reply = JSON.stringify(res.data);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: reply
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "Sorry, I am unable to connect to the logistics assistant right now."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button className={`ai-floating-btn ${open ? "active" : ""}`} onClick={() => setOpen(!open)}>
        {open ? (
          <span className="close-icon">×</span>
        ) : (
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="ai-container">
          <div className="ai-header">
            <div className="ai-header-info">
              <span className="ai-avatar">🤖</span>
              <div>
                <h4>Driverio Copilot</h4>
                <span className="ai-status">Active Online</span>
              </div>
            </div>
            <button className="ai-close" onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="ai-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-message-bubble ${msg.sender}`}>
                <div className="message-content">
                  {msg.text.startsWith("{") || msg.text.startsWith("[") ? (
                    <pre className="message-json">{msg.text}</pre>
                  ) : (
                    <p>{msg.text}</p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="ai-message-bubble ai loading">
                <div className="message-content">
                  <div className="typing-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-input-area" onSubmit={askAI}>
            <input
              type="text"
              placeholder="Ask about bookings..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !question.trim()}>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChat;
