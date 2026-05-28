const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { createClient } = require("redis");
const app = express();
const PORT = process.env.PORT || 3001;
const httpServer = createServer(app);
const redisClient = createClient({ url: "redis://localhost:6379" });
redisClient.on("error", (err) => console.error("Redis Client Error", err));
app.use(cors());
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Default React port
    methods: ["GET", "POST"],
  },
});

async function startServer() {
  await redisClient.connect();

  io.on("connection", (socket) => {
    socket.on("vehicle_telemetry", (data) => {
      console.log(`Data received - ${data.speed}`);
    });
    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnected`);
    });
  });
}

app.get("/health", (req, res) => {
  console.log("Healthy");
  return res.send("Ok");
});
httpServer.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
