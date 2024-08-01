import { createClient } from "redis";
import dotenv from "dotenv"


dotenv.config()

const client = createClient({
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-19688.c270.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 19688
    }
});

client.on("connect", ()=>{
    console.log("Redit Client Connected")
})


export default client

