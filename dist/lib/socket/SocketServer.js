'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.SocketServer = void 0;
const debug_1 = __importDefault(require('debug'));
const dbg = debug_1.default('service:socket');
/**
 * sends messages over a socket connection
 */
class SocketServer {
  constructor(socket, opts) {
    this.port = opts.port;
    this.targetHost = opts.targetHost;
    this.targetPort = opts.targetPort;
    this.messageCallback = opts.messageCallback || (() => {});
    this.socket = socket;
    this.socket.bind(this.port);
    this.socket.on('error', (err) => {
      dbg(`socket error:\n${err.stack}`);
      this.socket.close();
    });
    this.socket.on('message', this.messageCallback);
  }
  send(message, opts = {}) {
    if (!this.targetHost || !this.targetPort) {
      throw new Error('Target configuration is not available.');
    }
    const timeout = opts.timeout || 0;
    const attempts = opts.attempts || 2;
    const rawMsg = message.getMessage();
    for (let i = 1; i <= attempts; i++) {
      setTimeout(() => {
        this.socket.send(
          rawMsg,
          0,
          rawMsg.length,
          this.targetPort,
          this.targetHost,
          (err) => {
            if (err) {
              dbg(`socket error: ${err.message}`);
            }
          }
        );
      }, timeout);
    }
  }
  close() {
    dbg('closing socket if exists...');
    if (this.socket) {
      this.socket.close();
    }
  }
}
exports.SocketServer = SocketServer;
