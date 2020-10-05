'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const config_1 = __importDefault(require('config'));
const debug_1 = __importDefault(require('debug'));
const FindMessage_1 = require('./lib/message/FindMessage');
const MessageFactory_1 = require('./lib/message/MessageFactory');
const SockerServerFactory_1 = require('./lib/socket/SockerServerFactory');
const Broker_service_1 = __importDefault(require('./service/Broker.service'));
if (!config_1.default.has('broker') || !config_1.default.has('socket')) {
  throw new Error(
    'Application configuration is invalid. Please check config files.'
  );
}
const brokerConfig = config_1.default.get('broker');
const socketConfig = config_1.default.get('socket');
const dbg = debug_1.default('service:controller');
const brokerService = new Broker_service_1.default(brokerConfig);
let brokerMessage = { action: 'default', payload: {} };
let socketServer;
const startApplication = () =>
  __awaiter(void 0, void 0, void 0, function*() {
    yield brokerService.start();
    const socketServer = SockerServerFactory_1.SocketServerFactory.createServerWith(
      socketConfig.protocol,
      {
        port: socketConfig.port,
        targetHost: socketConfig.remoteHost,
        targetPort: socketConfig.remotePort,
        messageCallback: (findMessage) => {
          const convertedFindMessage = findMessage.toString('hex');
          if (44 !== convertedFindMessage.length) {
            return;
          }
          const bridgeId = Buffer.from(
            convertedFindMessage.substring(38, 40),
            'hex'
          )[0];
          const messages = MessageFactory_1.MessageFactory.createMessageFrom(
            brokerMessage
          );
          /** send messages to bridge */
          messages.forEach((message) => {
            message.setBridgeId(bridgeId);
            if (brokerMessage.payload.zone !== undefined) {
              message.setZone(brokerMessage.payload.zone);
            }
            socketServer.send(message, { timeout: 125 });
          });
        }
      }
    );
    brokerService.subscribeToCommands('milight', (msg, ackCallback) => {
      if (!msg) {
        return ackCallback(false);
      }
      try {
        const { action, payload } = JSON.parse(msg.content.toString());
        return ackCallback(processMessage(action, payload));
      } catch (error) {
        dbg(`an error occurred while processing: ${error.message}`);
        return ackCallback(false);
      }
    });
    const processMessage = (action, payload) => {
      const findMessage = new FindMessage_1.FindMessage();
      brokerMessage = {
        action,
        payload
      };
      socketServer.send(findMessage);
      dbg(
        `action ${
          brokerMessage.action
        }' as performed with props: ${JSON.stringify(brokerMessage.payload)}`
      );
      return true;
    };
  });
const stopApplication = () =>
  __awaiter(void 0, void 0, void 0, function*() {
    if (brokerService.isConnected()) {
      yield brokerService.stop();
    }
    if (socketServer) {
      socketServer.close();
    }
    return;
  });
startApplication();
process.on('SIGTERM', () =>
  __awaiter(void 0, void 0, void 0, function*() {
    yield stopApplication();
    process.exit();
  })
);
process.on('SIGINT', () =>
  __awaiter(void 0, void 0, void 0, function*() {
    yield stopApplication();
    process.exit();
  })
);
