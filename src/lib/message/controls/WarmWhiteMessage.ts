import { ControlMessage } from '../ControlMessage';
/**
 * Nachricht zum Einschalten von warmem Licht
 */
export class WarmWhiteMessage extends ControlMessage {
  protected command: Array<number> = [
    0x31,
    0x00,
    0x00,
    0x08,
    0x05,
    0x00,
    0x00,
    0x00,
    0x00
  ];
}
