import debug from 'debug';
import amqplib, * as AMQP from 'amqplib';

import { Options } from 'amqplib';

const dbg = debug('service:broker');

export default class BrokerService {
  /** broker connection */
  private connection: AMQP.Connection;

  /** broker channel */
  private channel: AMQP.Channel;

  /** configuration options */
  private configOpts: Options.Connect;

  /** connection state */
  private connected: boolean;

  public constructor(configOpts: Options.Connect) {
    this.configOpts = configOpts;
    this.connected = false;
  }

  /**
   * start rabbitmq service
   */
  public async start(): Promise<void> {
    await this.connect();
  }

  public async stop(): Promise<void> {
    await this.disconnect();
  }

  public isConnected(): boolean {
    return this.connected;
  }

  public subscribeToCommands(
    commandType: string,
    commandCallback: (
      msg: AMQP.ConsumeMessage | null,
      ackCallback: (ack: boolean) => void
    ) => void
  ): void {
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
  private async connect(): Promise<boolean> {
    if (this.connected) {
      return true;
    }

    try {
      this.connection = await amqplib.connect(this.configOpts);
      dbg('broker is connected...');
      this.channel = await this.connection.createChannel();
      dbg('channel is established...');
      this.connected = true;
    } catch (e) {
      dbg(e);
      return false;
    }

    return true;
  }

  private async disconnect(): Promise<boolean> {
    if (this.connected) {
      try {
        await this.connection.close();
        dbg('broker was disconnected...');
        this.connected = false;
      } catch (e) {
        dbg(e);
        return false;
      }
    }

    return true;
  }
}
