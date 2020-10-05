import { ControlMessage } from '../ControlMessage';
/**
 * Nachricht zum Einschalten von grünem Licht (Werder Style)
 */
export class ColorGreenMessage extends ControlMessage {
  // prettier-ignore
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x01, 0x60, 0x60, 0x60, 0x60
  ];
}
