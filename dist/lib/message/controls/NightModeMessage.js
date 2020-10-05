"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NightModeMessage = void 0;
const ControlMessage_1 = require("../ControlMessage");
/**
 * Nachricht zum Einschalten des Nachtlichts
 */
class NightModeMessage extends ControlMessage_1.ControlMessage {
    constructor() {
        super(...arguments);
        // prettier-ignore
        this.command = [
            0x31, 0x00, 0x00, 0x08, 0x04, 0x05, 0x00, 0x00, 0x00
        ];
    }
}
exports.NightModeMessage = NightModeMessage;
