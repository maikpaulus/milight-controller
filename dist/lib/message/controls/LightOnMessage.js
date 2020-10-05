'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LightOnMessage = void 0;
const ControlMessage_1 = require('../ControlMessage');
/**
 * Nachricht zum Anschalten des Lichts
 */
class LightOnMessage extends ControlMessage_1.ControlMessage {
  constructor() {
    super(...arguments);
    this.command = [0x31, 0x00, 0x00, 0x08, 0x04, 0x01, 0x00, 0x00, 0x00];
  }
}
exports.LightOnMessage = LightOnMessage;
