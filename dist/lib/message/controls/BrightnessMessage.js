'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BrightnessMessage = void 0;
const ControlMessage_1 = require('../ControlMessage');
class BrightnessMessage extends ControlMessage_1.ControlMessage {
  constructor(brightness) {
    super();
    this.command = [0x31, 0x00, 0x00, 0x08, 0x03, 0x00, 0x00, 0x00, 0x00];
    this.brightness = 0x00;
    this.brightness = brightness % 101;
  }
  getMessage() {
    const { command } = this;
    command[5] = this.brightness;
    return super.getMessage();
  }
}
exports.BrightnessMessage = BrightnessMessage;
