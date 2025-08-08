// example component
"use client";
import { useEffect, useState } from "react";
import socket from "../_Helper Functions/socket";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("📨 Received from server:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("message");
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      socket.emit("message", { text: message });
      setMessage("");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        {messages.map((msg, index) => (
          <p key={index} className="bg-gray-200 p-2 my-1 rounded">
            {msg.text}
          </p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 rounded mr-2"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}
