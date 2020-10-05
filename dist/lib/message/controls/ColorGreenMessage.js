'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ColorGreenMessage = void 0;
const ControlMessage_1 = require('../ControlMessage');
/**
 * Nachricht zum Einschalten von grünem Licht (Werder Style)
 */
class ColorGreenMessage extends ControlMessage_1.ControlMessage {
  constructor() {
    super(...arguments);
    // prettier-ignore
    this.command = [
            0x31, 0x00, 0x00, 0x08, 0x01, 0x60, 0x60, 0x60, 0x60
        ];
  }
}
exports.ColorGreenMessage = ColorGreenMessage;
