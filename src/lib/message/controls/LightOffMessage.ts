import { ControlMessage } from '../ControlMessage';

/**
 * Nachricht zum Ausschalten des Lichts
 */
export class LightOffMessage extends ControlMessage {
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x04, 0x02, 0x00, 0x00, 0x00
  ];
}
