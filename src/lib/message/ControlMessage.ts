import MessageInterface from './Message.interface';

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

  public getMessage(): Buffer {
    // prettier-ignore
    const message: number[] = [
      ...ControlMessage.MESSAGE_BASE, this.bridgeId, 0x00, 0x00, this.sequenceNumber, 0x00, 
      ...this.command, this.zone, 0x00
    ];

    const checksum = message
      .slice(-11)
      .reduce(
        (accumulator: number, current: number): number => {
          return accumulator + current
        }, 0);

    return Buffer.from([...message, checksum]);
  }
}