let socket = new WebSocket("ws://localhost:3000");

window.addEventListener("pageshow", () => {
  connectSocket();
});

window.addEventListener("pagehide", () => {
  socket.close();
});