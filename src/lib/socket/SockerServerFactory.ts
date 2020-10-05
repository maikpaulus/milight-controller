import dgram from 'dgram';
import { SocketOptions } from '../../types';
import { SocketServer } from './SocketServer';

/**
 * factory to create a new socket server with a given protocol
 */
export class SocketServerFactory {
  public static createServerWith(
    protocol: string,
    socketOpts: SocketOptions
  ): SocketServer {
    if ('udp' === protocol) {
      const socket = dgram.createSocket('udp4');
      return new SocketServer(socket, socketOpts);
    }

    throw new Error(
      'Das Protokoll ist für den SocketServer nicht implementiert.'
    );
  }
}
