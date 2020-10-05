"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServerFactory = void 0;
const dgram_1 = __importDefault(require("dgram"));
const SocketServer_1 = require("./SocketServer");
/**
 * factory to create a new socket server with a given protocol
 */
class SocketServerFactory {
    static createServerWith(protocol, socketOpts) {
        if ('udp' === protocol) {
            const socket = dgram_1.default.createSocket('udp4');
            return new SocketServer_1.SocketServer(socket, socketOpts);
        }
        throw new Error('Das Protokoll ist für den SocketServer nicht implementiert.');
    }
}
exports.SocketServerFactory = SocketServerFactory;
