import { useState } from "react";

const conversationsData = [
  {
    id: 1,
    name: "Rahul Sharma",
    messages: [
      { sender: "them", text: "Is the VR headset available?" },
      { sender: "me", text: "Yes, it is available." }
    ]
  },
  {
    id: 2,
    name: "Priya Mehta",
    messages: [
      { sender: "them", text: "Can you reduce the price?" }
    ]
  }
];

const Inbox = () => {
  const [conversations, setConversations] = useState(conversationsData);
  const [activeChat, setActiveChat] = useState(conversationsData[0]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedConversations = conversations.map((chat) =>
      chat.id === activeChat.id
        ? {
            ...chat,
            messages: [...chat.messages, { sender: "me", text: newMessage }]
          }
        : chat
    );

    setConversations(updatedConversations);
    setActiveChat({
      ...activeChat,
      messages: [...activeChat.messages, { sender: "me", text: newMessage }]
    });

    setNewMessage("");
  };

  return (
    <div className="inbox-container">

      {/* LEFT SIDE - CHAT LIST */}
      <div className="chat-list">
        <h3>Messages</h3>
        {conversations.map((chat) => (
          <div
            key={chat.id}
            className={`chat-user ${
              activeChat.id === chat.id ? "active" : ""
            }`}
            onClick={() => setActiveChat(chat)}
          >
            {chat.name}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - CHAT WINDOW */}
      <div className="chat-window">
        <div className="chat-header">
          <h3>{activeChat.name}</h3>
        </div>

        <div className="chat-messages">
          {activeChat.messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "me" ? "me" : "them"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

    </div>
  );
};

export default Inbox;