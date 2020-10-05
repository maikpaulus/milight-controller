import { Options } from 'amqplib'

export type SocketOptions = {
  port: number;
  targetHost: string;
  targetPort: number;
  messageCallback: (msg: any) => any;
}

export type SocketConfig = {
  protocol: string;
  port: number;
  remoteHost: string;
  remotePort: number;
}

export type ApplicationConfig = {
  broker: Options.Connect;
  socket: SocketConfig;
}

export type BrokerMessage = {
  action: string;
  payload: {
    zone?: number;
    brightness?: number;
  }
}