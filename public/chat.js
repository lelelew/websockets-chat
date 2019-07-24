// Make connection
const socket = io();

// Query DOM
let message = document.getElementById("message");
let handle = document.getElementById("handle");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let feedback = document.getElementById("feedback");

// Emit events
btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

// Listen for events
socket.on("chat", data => {
  feedback.innerHTML = "";
  output.innerHTML = `<p> <strong> ${data.handle} : </strong> ${
    data.message
  } </p>`;
});

socket.on("typing", data => {
  feedback.innerHTML = `<p><em> ${data} is typing a message... </em></p>`;
});
