const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // папка с HTML, CSS, JS

const users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  users[socket.id] = { x: 0, y: 0 };

  socket.on("move", (pos) => {
    users[socket.id] = pos;
    io.emit("users", users);
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("users", users);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
