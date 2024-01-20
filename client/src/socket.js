export const initWebSocket = () => {
  const socket = new WebSocket("ws://localhost:3001");

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return socket;
};

export const onMessage = (socket) => {
  socket.onmessage = (event) => {
    // Handle incoming messages from the server
  };
};
