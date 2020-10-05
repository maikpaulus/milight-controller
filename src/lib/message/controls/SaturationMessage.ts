import { ControlMessage } from '../ControlMessage';

/**
 * Nachricht zum Setzen einer bestimmten Licht-Sättigung
 */
export class SaturationMessage extends ControlMessage {
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