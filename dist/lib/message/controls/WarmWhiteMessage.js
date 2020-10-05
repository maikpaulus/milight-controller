"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarmWhiteMessage = void 0;
const ControlMessage_1 = require("../ControlMessage");
/**
 * Nachricht zum Einschalten von warmem Licht
 */
class WarmWhiteMessage extends ControlMessage_1.ControlMessage {
    constructor() {
        super(...arguments);
        this.command = [
            0x31, 0x00, 0x00, 0x08, 0x05, 0x00, 0x00, 0x00, 0x00
        ];
    }
}
exports.WarmWhiteMessage = WarmWhiteMessage;
