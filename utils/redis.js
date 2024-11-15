import { createClient } from "redis";

let redisClient = createClient();

redisClient.on("error", (error) => console.error(`Error : ${error}`));

await redisClient.connect();

export default redisClient;