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
const debug_1 = __importDefault(require('debug'));
const amqplib_1 = __importDefault(require('amqplib'));
const dbg = debug_1.default('service:broker');
class BrokerService {
  constructor(configOpts) {
    this.configOpts = configOpts;
    this.connected = false;
  }
  /**
   * start rabbitmq service
   */
  start() {
    return __awaiter(this, void 0, void 0, function*() {
      yield this.connect();
    });
  }
  stop() {
    return __awaiter(this, void 0, void 0, function*() {
      yield this.disconnect();
    });
  }
  isConnected() {
    return this.connected;
  }
  subscribeToCommands(commandType, commandCallback) {
    if (!this.connected) {
      dbg('broker is not connected. you can not subscribe to a queue.');
      return;
    }
    this.channel.consume(
      `commands.${commandType}`,
      (msg) => {
        if (!msg) {
          return;
        }
        commandCallback(msg, (ack) => {
          dbg(`message was acknowleged: ${ack}`);
          if (ack) {
            this.channel.ack(msg);
            return;
          }
          setTimeout(() => this.channel.nack(msg), 5000);
        });
      },
      {
        consumerTag: 'milight-controller',
        noAck: false
      }
    );
  }
  /**
   * connect to rabbitmq broker
   */
  connect() {
    return __awaiter(this, void 0, void 0, function*() {
      if (this.connected) {
        return true;
      }
      try {
        this.connection = yield amqplib_1.default.connect(this.configOpts);
        dbg('broker is connected...');
        this.channel = yield this.connection.createChannel();
        dbg('channel is established...');
        this.connected = true;
      } catch (e) {
        dbg(e);
        return false;
      }
      return true;
    });
  }
  disconnect() {
    return __awaiter(this, void 0, void 0, function*() {
      if (this.connected) {
        try {
          yield this.connection.close();
          dbg('broker was disconnected...');
          this.connected = false;
        } catch (e) {
          dbg(e);
          return false;
        }
      }
      return true;
    });
  }
}
exports.default = BrokerService;
