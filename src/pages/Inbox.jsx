import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Inbox = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get("negotiation");

  const [negotiations, setNegotiations] = useState([]);
  const [activeNeg, setActiveNeg] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [myUserId, setMyUserId] = useState(null);
  const messagesEndRef = useRef(null);
  const pollRef = useRef(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  
  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    axios.get("/api/auth/me", { headers }).then((res) => {
      setMyUserId(res.data.user._id);
    });
    
  }, []);

  
  const fetchNegotiations = async () => {
    try {
      const res = await axios.get("/api/negotiations/my", { headers });
      const list = res.data.negotiations;
      setNegotiations(list);

      if (preselectedId) {
        const found = list.find((n) => n._id === preselectedId);
        if (found) openChat(found);
      } else if (list.length > 0) {
        openChat(list[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNegotiations();
    
  }, []);

  
  const openChat = async (neg) => {
    setActiveNeg(neg);
    await loadMessages(neg._id);
    clearInterval(pollRef.current);
    pollRef.current = setInterval(() => loadMessages(neg._id), 3000);
  };

  const loadMessages = async (negId) => {
    try {
      const res = await axios.get(`/api/negotiations/${negId}/messages`, { headers });
      setMessages(res.data.negotiation.messages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
  useEffect(() => () => clearInterval(pollRef.current), []);

  
  const sendMessage = async () => {
    if (!newMessage.trim() || !activeNeg) return;
    setSending(true);
    try {
      const res = await axios.post(
        `/api/negotiations/${activeNeg._id}/messages`,
        { text: newMessage.trim() },
        { headers }
      );
      setMessages(res.data.messages);
      setNewMessage("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  
  
  const toStr = (id) => id?.toString?.() ?? "";

  const otherPersonName = (neg) => {
    if (!myUserId || !neg?.seller?._id || !neg?.buyer?._id) return "...";
    return toStr(neg.seller._id) === toStr(myUserId)
      ? neg.buyer.name
      : neg.seller.name;
  };

  const statusBadge = (status) => {
    const map = {
      open: { label: "Negotiating", color: "orange" },
      accepted: { label: "Accepted ✅", color: "green" },
      rejected: { label: "Rejected ❌", color: "red" },
    };
    return map[status] || { label: status, color: "gray" };
  };

  if (loading) return <div className="inbox-container"><p>Loading inbox...</p></div>;
  if (!token) return null;

  return (
    <div className="inbox-container">
      {}
      <div className="chat-list">
        <h3>Messages</h3>
        {negotiations.length === 0 && (
          <p style={{ padding: "1rem", color: "#888", fontSize: "0.9rem" }}>
            No conversations yet.
          </p>
        )}
        {negotiations.map((neg) => {
          const { label, color } = statusBadge(neg.status);
          return (
            <div
              key={neg._id}
              className={`chat-user ${activeNeg?._id === neg._id ? "active" : ""}`}
              onClick={() => openChat(neg)}
            >
              <div style={{ fontWeight: "600" }}>{otherPersonName(neg)}</div>
              <div style={{ fontSize: "0.8rem", color: "#555" }}>
                {neg.product?.productName}
              </div>
              <div style={{ fontSize: "0.75rem", color }}>{label}</div>
            </div>
          );
        })}
      </div>

      {}
      {activeNeg ? (
        <div className="chat-window">
          {}
          <div className="chat-header">
            <div>
              <h3>{otherPersonName(activeNeg)}</h3>
              <span style={{ fontSize: "0.8rem", color: "#666" }}>
                Re: {activeNeg.product?.productName} — ₹{activeNeg.product?.productPrice}
              </span>
            </div>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: "600",
                color: statusBadge(activeNeg.status).color,
              }}
            >
              {statusBadge(activeNeg.status).label}
            </span>
          </div>

          {}
          <div className="chat-messages">
            {messages.length === 0 && (
              <p style={{ color: "#aaa", textAlign: "center", marginTop: "2rem" }}>
                No messages yet. Start the conversation!
              </p>
            )}
            {messages.map((msg, i) => {
              
              const isMe =
                toStr(msg.sender?._id) === toStr(myUserId) ||
                toStr(msg.sender) === toStr(myUserId);
              return (
                <div key={i} className={`message ${isMe ? "me" : "them"}`}>
                  {!isMe && (
                    <div style={{ fontSize: "0.7rem", color: "#999", marginBottom: "2px" }}>
                      {msg.sender?.name || ""}
                    </div>
                  )}
                  {msg.text}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {}
          {activeNeg.status === "open" && (
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={sendMessage} disabled={sending}>
                {sending ? "..." : "Send"}
              </button>
            </div>
          )}

          {activeNeg.status !== "open" && (
            <div
              style={{
                padding: "0.75rem 1rem",
                textAlign: "center",
                color: "#888",
                borderTop: "1px solid #eee",
                fontSize: "0.9rem",
              }}
            >
              This negotiation is closed.
            </div>
          )}
        </div>
      ) : (
        <div
          className="chat-window"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <p style={{ color: "#aaa" }}>Select a conversation to start chatting.</p>
        </div>
      )}
    </div>
  );
};

export default Inbox;
