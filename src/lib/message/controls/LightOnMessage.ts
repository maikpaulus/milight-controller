import { ControlMessage } from "../ControlMessage";

/**
 * Nachricht zum Anschalten des Lichts
 */
export class LightOnMessage extends ControlMessage {
  protected command: Array<number> = [
    0x31, 0x00, 0x00, 0x08, 0x04, 0x01, 0x00, 0x00, 0x00
  ];
}