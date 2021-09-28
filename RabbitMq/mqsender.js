var as = require('../RabbitMq/ConnectionFactory')


async function sender(queue,message)
{
    
        let b = as.getInstance();
        console.log("return -> "+(await b).connection);
        let conn = (await b).connection;
        console.log("conn -- " + conn);
        channel = await conn.createChannel();

        channel.assertQueue(queue, {
            durable: true
        });
        channel.sendToQueue(queue, Buffer.from(message));
        console.log(" [x] Sent %s", message); 
          
}


module.exports = {sender}