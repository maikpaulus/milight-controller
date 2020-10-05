'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LightOffMessage = void 0;
const ControlMessage_1 = require('../ControlMessage');
/**
 * Nachricht zum Ausschalten des Lichts
 */
class LightOffMessage extends ControlMessage_1.ControlMessage {
  constructor() {
    super(...arguments);
    this.command = [0x31, 0x00, 0x00, 0x08, 0x04, 0x02, 0x00, 0x00, 0x00];
  }
}
exports.LightOffMessage = LightOffMessage;
