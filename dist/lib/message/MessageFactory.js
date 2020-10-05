'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MessageFactory = void 0;
const BrightnessMessage_1 = require('./controls/BrightnessMessage');
const ColorGreenMessage_1 = require('./controls/ColorGreenMessage');
const DualWhiteMessage_1 = require('./controls/DualWhiteMessage');
const LightOffMessage_1 = require('./controls/LightOffMessage');
const LightOnMessage_1 = require('./controls/LightOnMessage');
const NightModeMessage_1 = require('./controls/NightModeMessage');
const SaturationLowMessage_1 = require('./controls/SaturationLowMessage');
const SaturationMessage_1 = require('./controls/SaturationMessage');
const WarmWhiteMessage_1 = require('./controls/WarmWhiteMessage');
/**
 * Factory zum Erstellen von Messages aus Commands
 */
class MessageFactory {}
exports.MessageFactory = MessageFactory;
MessageFactory.createMessageFrom = function(brokerMessage) {
  var _a;
  switch (brokerMessage.action) {
    case 'licht.an':
      return [
        new BrightnessMessage_1.BrightnessMessage(
          ((_a = brokerMessage.payload) === null || _a === void 0
            ? void 0
            : _a.brightness) || 100
        ),
        new LightOnMessage_1.LightOnMessage()
      ];
    case 'licht.aus':
      return [new LightOffMessage_1.LightOffMessage()];
    case 'night.mode':
      return [new NightModeMessage_1.NightModeMessage()];
    case 'warm.white':
      return [new WarmWhiteMessage_1.WarmWhiteMessage()];
    case 'color.green':
      return [new ColorGreenMessage_1.ColorGreenMessage()];
    case 'dual.white':
      return [new DualWhiteMessage_1.DualWhiteMessage()];
    case 'saturation.low':
      return [new SaturationLowMessage_1.SaturationLowMessage()];
    case 'saturation.10':
      return [new SaturationMessage_1.SaturationMessage(10)];
    case 'saturation.100':
      return [new SaturationMessage_1.SaturationMessage(100)];
    case 'brightness.10':
      return [new BrightnessMessage_1.BrightnessMessage(10)];
    case 'brightness.100':
      return [new BrightnessMessage_1.BrightnessMessage(100)];
    default:
      throw new Error('Es konnte keine Message erzeugt werden.');
  }
};
