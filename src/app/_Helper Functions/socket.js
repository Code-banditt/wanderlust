// lib/socket.js
import { io } from "socket.io-client";

let socket;

export const initiateSocket = (userId) => {
  socket = io("http://localhost:4000", {
    query: { userId },
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected as:", userId);
  });
};

export const sendMessage = ({ toUserId, text }) => {
  if (socket) {
    socket.emit("private_message", { toUserId, text });
  }
};

export const listenForMessages = (callback) => {
  if (socket) {
    socket.on("new_message", callback);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("🛑 Socket disconnected");
  }
};
