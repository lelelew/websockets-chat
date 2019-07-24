const express = require("express");
const io = require("socket.io");

// App setup
const app = express();
let server = app.listen(4000, () => {
  console.log("listening to requests on port 4000");
});

// Static files
app.use(express.static("public"));

// Socket setup
let socket = io(server);

socket.on("connection", connection => {
  console.log("made socket connection", connection.id);

  connection.on("chat", data => {
    socket.emit("chat", data);
  });

  connection.on("typing", data => {
    connection.broadcast.emit("typing", data);
  });
});
