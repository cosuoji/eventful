import Queue from "bull";
import dotenv from "dotenv"


dotenv.config()

export const emailQueue = new Queue("email queue", {
    redis:{
        host: 'redis-19688.c270.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 19688,
        password: process.env.REDIS_PASS,
    }
})

   emailQueue.process(async(job)=>{
        console.log('Processing job:', job.data.message);
        const {userEmail, message} = job.data 
        await sendEmailWithoutAttachment(userEmail, `Reminder for ${job.data.eventName}` , `Reminder: ${message}`);
        return Promise.resolve();
    })


emailQueue.on('completed', (job, result) => {
  console.log(`Job ID ${job.id} completed with result:`, result);
});


emailQueue.on('failed', (job, err) => {
  console.error(`Job ID ${job.id} failed with error:`, err);
});