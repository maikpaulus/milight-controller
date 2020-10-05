import { ControlMessage } from '../ControlMessage';

/**
 * Nachricht zum Setzen des dualen Weißlicht
 */
export class DualWhiteMessage extends ControlMessage {
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x05, 0x64, 0x00, 0x00, 0x00
  ];
}
