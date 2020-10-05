'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ControlMessage = void 0;
class ControlMessage {
  constructor() {
    /** ID der Mi-Light Bridge */
    this.bridgeId = 0x00;
    this.sequenceNumber = 0x01;
    this.zone = 0x00;
  }
  setBridgeId(bridgeId) {
    this.bridgeId = bridgeId;
  }
  setSequenceNumber(sequenceNumber) {
    this.sequenceNumber = sequenceNumber;
  }
  setZone(zone) {
    this.zone = zone;
  }
  getMessage() {
    // prettier-ignore
    const message = [
            ...ControlMessage.MESSAGE_BASE, this.bridgeId, 0x00, 0x00, this.sequenceNumber, 0x00,
            ...this.command, this.zone, 0x00
        ];
    const checksum = message.slice(-11).reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);
    return Buffer.from([...message, checksum]);
  }
}
exports.ControlMessage = ControlMessage;
/** Anfang der Nachricht nach Mi-Light-Protokoll */
// prettier-ignore
ControlMessage.MESSAGE_BASE = [
    0x80, 0x00, 0x00, 0x00, 0x11
];
