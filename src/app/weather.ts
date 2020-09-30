import {Temperature} from './temperature';
import {SkyStatus} from './sky-status';

export class Weather {
  constructor(public sky: SkyStatus, public temperatureInC: Temperature) {}

  toString(): string {
    const status = this.sky === 'rain' ? 'Regen' : 'Sonne';
    return `Wir haben gerade ${this.temperatureInC} °C und ${status}.`;
  }
}
