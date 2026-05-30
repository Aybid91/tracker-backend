const { redisClient } = require("../utils/redis");

const telemetryHandler = async (data) => {
  const { id, ...restData } = data;
  console.log(`Data received - ${id}`);
  let dataProcessedCount = 0;
  try {
    await redisClient.rpush(`vehicle-${data.id}`, JSON.stringify(restData));
    dataProcessedCount++;
  } catch (error) {
    console.log(error);
  }
};
module.exports = telemetryHandler;
