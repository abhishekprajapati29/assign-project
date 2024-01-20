const http = require("http");
const cors = require("cors");
const app = require("./app");
const port = process.env.PORT || 3001;
const { initWebSocketServer } = require("./modules/socket");

app.use(cors());
const server = http.createServer(app);
// Initialize WebSocket server
const wss = initWebSocketServer(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
