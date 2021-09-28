const amqp = require('amqplib')

let instance;


class MqConnection {

  
  constructor() {
  }
  async init() {
    this.connection = await amqp.connect('amqp://admin:admin@192.168.102.114');
    return this
  }

}

MqConnection.getInstance = async function() {
  if (!instance) {
    console.log("New Instance  -------------->>>>> " + instance);
    const broker = new MqConnection();
    instance = broker.init()
  }  
  return instance;
};
module.exports = MqConnection;