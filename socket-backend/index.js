const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend
    methods: ["GET", "POST"],
  },
});

// Store mapping: userId -> socket.id
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID ${socket.id}`);
  }

  socket.on("send_message", ({ toUserId, text }) => {
    const toSocketId = userSocketMap[toUserId];
    if (toSocketId) {
      io.to(toSocketId).emit("receive_message", { text, from: userId });
      console.log(`📨 Sent message to ${toUserId}: ${text}`);
    } else {
      console.log(`❌ User ${toUserId} not connected`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
    // remove user from userSocketMap
    for (const [key, val] of Object.entries(userSocketMap)) {
      if (val === socket.id) {
        delete userSocketMap[key];
        break;
      }
    }
  });
});

server.listen(3001, () => {
  console.log("🚀 Socket.io server running on http://localhost:3001");
});
