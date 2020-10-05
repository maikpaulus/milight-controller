import { ControlMessage } from './ControlMessage';
import { BrightnessMessage } from './controls/BrightnessMessage';
import { ColorGreenMessage } from './controls/ColorGreenMessage';
import { DualWhiteMessage } from './controls/DualWhiteMessage';
import { LightOffMessage } from './controls/LightOffMessage';
import { LightOnMessage } from './controls/LightOnMessage';
import { NightModeMessage } from './controls/NightModeMessage';
import { SaturationLowMessage } from './controls/SaturationLowMessage';
import { SaturationMessage } from './controls/SaturationMessage';
import { WarmWhiteMessage } from './controls/WarmWhiteMessage';
import { BrokerMessage } from '../../types';
/**
 * Factory zum Erstellen von Messages aus Commands
 */
export class MessageFactory {
  static createMessageFrom = function(brokerMessage: BrokerMessage): ControlMessage[] {
    switch (brokerMessage.action) {
      case 'licht.an':
        return [
          new BrightnessMessage(brokerMessage.payload?.brightness || 100),
          new LightOnMessage()
        ]

      case 'licht.aus':
        return [new LightOffMessage()];

      case 'night.mode':
        return [new NightModeMessage()];

      case 'warm.white':
        return [new WarmWhiteMessage()];

      case 'color.green':
        return [new ColorGreenMessage()];

      case 'dual.white':
        return [new DualWhiteMessage()];

      case 'saturation.low':
        return [new SaturationLowMessage()];

      case 'saturation.10':
        return [new SaturationMessage(10)];

      case 'saturation.100':
        return [new SaturationMessage(100)];

      case 'brightness.10':
        return [new BrightnessMessage(10)];

      case 'brightness.100':
        return [new BrightnessMessage(100)];

      default:
        throw new Error('Es konnte keine Message erzeugt werden.');
    }
  };
}