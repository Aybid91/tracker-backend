const telemetryHandler = require("../services/telemetryHandler");
const { redisClient } = require("./redis");

async function processSocketData(socket) {
  socket.on("vehicle_telemetry", telemetryHandler);
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
}
module.exports = { processSocketData };
