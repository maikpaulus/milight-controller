import * as dgram from 'dgram';

interface MessageInterface {
  getMessage(): Buffer;
}

export class FindMessage implements MessageInterface {
  // prettier-ignore
  private readonly message: Array<number> = [
      0x20, 0x00, 0x00, 0x00, 0x16, 0x02, 0x62, 0x3a, 0xd5, 0xed,
      0xa3, 0x01, 0xae, 0x08, 0x2d, 0x46, 0x61, 0x41, 0xa7, 0xf6,
      0xdc, 0xaf, 0xd3, 0xe6, 0x00, 0x00, 0x1e
  ];

  public getMessage(): Buffer {
    return Buffer.from(this.message);
  }
}

export class ControlMessage implements MessageInterface {
  /** Anfang der Nachricht nach Mi-Light-Protokoll */
  // prettier-ignore
  private static readonly MESSAGE_BASE: Array<number> = [
    0x80, 0x00, 0x00, 0x00, 0x11
  ];

  /** ID der Mi-Light Bridge */
  protected bridgeId: number = 0x00;

  protected sequenceNumber: number = 0x01;

  private zone: number = 0x00;

  protected command: Array<number>;

  public setBridgeId(bridgeId: number) {
    this.bridgeId = bridgeId;
  }

  public setSequenceNumber(sequenceNumber: number) {
    this.sequenceNumber = sequenceNumber;
  }

  public setZone(zone: number) {
    this.zone = zone;
  }

  public processResponseFromFindMessage(message: string): void {
    this.bridgeId = Buffer.from(message.substring(38, 40), 'hex')[0];
  }

  public getMessage(): Buffer {
    // prettier-ignore
    let message = [
      ControlMessage.MESSAGE_BASE, this.bridgeId, 0x00, 0x00, this.sequenceNumber, 0x00, 
      this.command, this.zone, 0x00
    ];

    message = [].concat(...message);

    const checksum = message
      .slice(-11)
      .reduce((prev: number, curr: number) => prev + curr, 0);

    return Buffer.from([].concat(...message, checksum));
  }
}

/**
 * Nachricht zum Anschalten des Lichts
 */
export class LightOnMessage extends ControlMessage {
  // prettier-ignore
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x04, 0x01, 0x00, 0x00, 0x00
  ];
}

/**
 * Nachricht zum Ausschalten des Lichts
 */
export class LightOffMessage extends ControlMessage {
  // prettier-ignore
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x04, 0x02, 0x00, 0x00, 0x00
  ];
}

/**
 * Nachricht zum Einschalten des Nachtlichts
 */
export class NightModeMessage extends ControlMessage {
  // prettier-ignore
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x04, 0x05, 0x00, 0x00, 0x00
  ];
}

/**
 * Nachricht zum Einschalten von warmem Licht
 */
export class WarmWhiteMessage extends ControlMessage {
  // prettier-ignore
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x00, 0x00
  ];
}

/**
 * Nachricht zum Einschalten von grünem Licht (Werder Style)
 */
export class ColorGreenMessage extends ControlMessage {
  // prettier-ignore
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x01, 0x60, 0x60, 0x60, 0x60
  ];
}

/**
 * Nachricht zum Ausschalten des Lichts
 */
export class DualWhiteMessage extends ControlMessage {
  // prettier-ignore
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x05, 0x64, 0x00, 0x00, 0x00
  ];
}

/**
 * Nachricht zum Ausschalten des Lichts
 */
export class SaturationLowMessage extends ControlMessage {
  // prettier-ignore
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x02, 0x00, 0x00, 0x00, 0x00
  ];
}

export class BrightnessMessage extends ControlMessage {
  // prettier-ignore
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x03, 0x00, 0x00, 0x00, 0x00
  ];

  private brightness: number = 0x00;

  constructor(brightness: number) {
    super();
    this.brightness = brightness % 101;
  }

  public getMessage(): Buffer {
    const { command } = this;
    command[5] = this.brightness;
    return super.getMessage();
  }
}

export class SaturationMessage extends ControlMessage {
  // prettier-ignore
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x03, 0x00, 0x00, 0x00, 0x00
  ];

  private saturation: number = 0x00;

  constructor(saturation: number) {
    super();
    this.saturation = saturation % 101;
  }

  public getMessage(): Buffer {
    const { command } = this;
    command[5] = this.saturation;
    return super.getMessage();
  }
}

/**
 * Factory zum Erstellen von Messages aus Commands
 */
export class MessageFactory {
  static createMessageFrom = function(command: Command): ControlMessage {
    switch (command.getName()) {
      case 'licht.an':
        return new LightOnMessage();

      case 'licht.aus':
        return new LightOffMessage();

      case 'night.mode':
        return new NightModeMessage();

      case 'warm.white':
        return new WarmWhiteMessage();

      case 'color.green':
        return new ColorGreenMessage();

      case 'dual.white':
        return new DualWhiteMessage();

      case 'saturation.low':
        return new SaturationLowMessage();

      case 'saturation.10':
        return new SaturationMessage(10);

      case 'saturation.100':
        return new SaturationMessage(100);

      case 'brightness.10':
        return new BrightnessMessage(10);

      case 'brightness.100':
        return new BrightnessMessage(100);

      default:
        throw new Error('Es konnte keine Message erzeugt werden.');
    }
  };
}

/**
 * Command zum Erstellen einer Nachricht
 */
export class Command {
  /** unique name of the command */
  private name: string;

  /** additional props of a command */
  private props: object = {};

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public getProps(): object {
    return this.props;
  }

  public getProp(prop: string): any | undefined {
    return this.props[prop] || undefined;
  }

  public setProps(props: object) {
    this.props = props;
  }
}

/**
 * sends messages over a socket connection
 */
export class SocketServer {
  private socket: any;

  private port: number;

  private targetHost: string;

  private targetPort: number;

  private messageCallback: any;

  constructor(
    socket: any,
    opts: {
      port: number;
      targetHost?: string;
      targetPort?: number;
      messageCallback?: any;
    }
  ) {
    this.port = opts.port || undefined;
    this.targetHost = opts.targetHost || undefined;
    this.targetPort = opts.targetPort || undefined;
    this.messageCallback = opts.messageCallback || (() => {});

    this.socket = socket;
    this.socket.bind(this.port);

    this.socket.on('error', (err) => {
      console.log(`socket error:\n${err.stack}`);
      this.socket.close();
    });

    this.socket.on('message', this.messageCallback);
  }

  public send(
    message: MessageInterface, opts: {
    timeout?: number
    attempts?: number
  } = {}): void {
    if (!this.targetHost || !this.targetPort) {
      throw new Error('Target configuration is not available.');
    }

    const timeout = opts.timeout || 0;
    const attempts = opts.attempts || 2;

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
              console.log(err);
            }
          }
        );
      }, timeout);
    }
  }

  public close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}

/**
 * factory to create a new socket server with a given protocol
 */
export class SocketServerFactory {
  public static createServerWith(
    protocol: string,
    socketOpts?: {
      port: number;
      targetHost?: string;
      targetPort?: number;
      messageCallback?: any;
    }
  ) {
    if ('udp' === protocol) {
      const socket = dgram.createSocket('udp4');
      return new SocketServer(socket, socketOpts);
    }

    throw new Error(
      'Das Protokoll ist für den SocketServer nicht implementiert.'
    );
  }
}
