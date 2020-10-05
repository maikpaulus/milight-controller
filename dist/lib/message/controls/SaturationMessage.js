"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaturationMessage = void 0;
const ControlMessage_1 = require("../ControlMessage");
/**
 * Nachricht zum Setzen einer bestimmten Licht-Sättigung
 */
class SaturationMessage extends ControlMessage_1.ControlMessage {
    constructor(saturation) {
        super();
        this.command = [
            0x31, 0x00, 0x00, 0x08, 0x03, 0x00, 0x00, 0x00, 0x00
        ];
        this.saturation = 0x00;
        this.saturation = saturation % 101;
    }
    getMessage() {
        const { command } = this;
        command[5] = this.saturation;
        return super.getMessage();
    }
}
exports.SaturationMessage = SaturationMessage;
