import MessageInterface from './Message.interface';

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
