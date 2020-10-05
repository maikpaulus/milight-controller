import config from 'config';
import debug from 'debug';
import { Options } from 'amqplib';


import { FindMessage } from './lib/message/FindMessage';
import { MessageFactory } from './lib/message/MessageFactory';
import { SocketServerFactory } from './lib/socket/SockerServerFactory';
import { SocketConfig, BrokerMessage } from './types';
import BrokerService from './service/Broker.service';
import { SocketServer } from './lib/socket/SocketServer';

if (!config.has('broker') || !config.has('socket')) {
  throw new Error('Application configuration is invalid. Please check config files.')
}

const brokerConfig = config.get('broker') as Options.Connect;
const socketConfig = config.get('socket') as SocketConfig;
const dbg = debug('service:controller')

const brokerService = new BrokerService(brokerConfig);
let brokerMessage: BrokerMessage = { action: 'default', payload: {}};
let socketServer: SocketServer;

const startApplication = async () => {
  await brokerService.start();
      
  const socketServer = SocketServerFactory.createServerWith(socketConfig.protocol, {
    port: socketConfig.port,
    targetHost: socketConfig.remoteHost,
    targetPort: socketConfig.remotePort,
    messageCallback: (findMessage) => {
      const convertedFindMessage = findMessage.toString('hex');
      if (44 !== convertedFindMessage.length) {
        return;
      }
  
      const bridgeId = Buffer.from(convertedFindMessage.substring(38, 40), 'hex')[0];
      const messages = MessageFactory.createMessageFrom(brokerMessage);
      
      /** send messages to bridge */
      messages.forEach(message => {
        message.setBridgeId(bridgeId);
        if (brokerMessage.payload.zone !== undefined) {
          message.setZone(brokerMessage.payload.zone)
        }
        socketServer.send(message, {timeout: 125});
      });
    }
  }); 
  
  brokerService.subscribeToCommands(
    'milight', (msg: any, ackCallback: (ack: boolean) => void): void => {
      if (!msg) {
        return ackCallback(false);
      }

      try {
        const { action, payload } = JSON.parse(msg.content.toString());
        return ackCallback(processMessage(action, payload));
      } catch (error) {
        dbg(`an error occurred while processing: ${error.message}`)
        return ackCallback(false);
      }
  });
    
  const processMessage = (action: string, payload: any): boolean => {
    const findMessage = new FindMessage();
    
    brokerMessage = {
      action,
      payload
    }
  
    socketServer.send(findMessage);
    dbg(`action ${brokerMessage.action}' as performed with props: ${JSON.stringify(brokerMessage.payload)}`)
    return true;
  };
}

const stopApplication = async () => {
  if (brokerService.isConnected()) {
    await brokerService.stop()
  }

  if (socketServer) {
    socketServer.close();
  }

  return
}

startApplication();

process.on('SIGTERM', async () => {
  await stopApplication();
  process.exit();
})

process.on('SIGINT', async () => {
  await stopApplication();
  process.exit();
})