import debug from 'debug';
import { SocketOptions } from '../../types';
import MessageInterface from '../message/Message.interface';
import { Socket } from 'dgram';

const dbg = debug('service:socket');

/**
 * sends messages over a socket connection
 */
export class SocketServer {
  private socket: Socket;

  private port: number;

  private targetHost: string;

  private targetPort: number;

  private messageCallback: any;

  constructor(socket: any, opts: SocketOptions) {
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

  public send(
    message: MessageInterface,
    opts: {
      timeout?: number;
      attempts?: number;
    } = {}
  ): void {
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

  public close(): void {
    dbg('closing socket if exists...');
    if (this.socket) {
      this.socket.close();
    }
  }
}
