const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { processSocketData } = require("./utils/socket");
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./apiRouter");
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Default React port
    methods: ["GET", "POST"],
  },
});
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

async function startServer() {
  io.on("connection", (socket) => {
    processSocketData(socket);
  });
  const PORT = process.env.PORT || 3001;
  httpServer.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });
}

startServer();
