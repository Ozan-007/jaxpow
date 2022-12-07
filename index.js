const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("username", (username) => {
    io.emit("username", username);
    console.log("username: ", username);
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("Message: ", msg);
  });
});

// app.listen(process.env.PORT || 3000, () => {
//   console.log("listening on *:3000");
// });

server.listen(process.env.PORT || 3000, () => {
  console.log("listening on *:3000");
});
