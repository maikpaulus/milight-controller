import { ControlMessage } from '../ControlMessage';
/**
 * Nachricht zum Einschalten des Nachtlichts
 */
export class NightModeMessage extends ControlMessage {
  // prettier-ignore
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x04, 0x05, 0x00, 0x00, 0x00
  ];
}
