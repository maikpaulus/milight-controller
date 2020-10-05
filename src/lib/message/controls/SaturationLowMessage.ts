import { ControlMessage } from '../ControlMessage';

/**
 * Nachricht zum Setzen einer geringen Licht-Sättigung
 */
export class SaturationLowMessage extends ControlMessage {
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x02, 0x00, 0x00, 0x00, 0x00
  ];
}
