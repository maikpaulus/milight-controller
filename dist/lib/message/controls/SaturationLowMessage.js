"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaturationLowMessage = void 0;
const ControlMessage_1 = require("../ControlMessage");
/**
 * Nachricht zum Setzen einer geringen Licht-Sättigung
 */
class SaturationLowMessage extends ControlMessage_1.ControlMessage {
    constructor() {
        super(...arguments);
        this.command = [
            0x31, 0x00, 0x00, 0x08, 0x02, 0x00, 0x00, 0x00, 0x00
        ];
    }
}
exports.SaturationLowMessage = SaturationLowMessage;
