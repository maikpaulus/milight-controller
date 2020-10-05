import { ControlMessage } from '../ControlMessage';

export class BrightnessMessage extends ControlMessage {
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