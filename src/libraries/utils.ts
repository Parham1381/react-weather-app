import * as moment from 'moment';

export class Utils {

  static getUnitsOfMeasurement = (units: string): string => {
    if (units === 'kl') {
      return `standard`;
    } else if (units === 'fr') {
      return `imperial`;
    } else if (units === 'si') {
      return `metric`;
    } 
  };

  static getTemperatureSymbol = (value: number, units: string): string => {
    if (units === 'kl') {
      return `°K`;
    } else if (units === 'fr') {
      return `℉`;
    } else if (units === 'si') {
      return `℃`;
    } 
  };

  static getPressure = (value: number, units: string): string => {
    if (units === 'fr' || units === 'kl') {
      return `${Math.round(value)} mb`;
    } else if (units === 'si') {
      return `${Math.round(value)} hPa`;
    }
  };

  static getWindSpeed = (value: number, units: string): string => {
    if (units === 'fr' || units === 'kl') {
      return `${Math.round(value)} mph`;
    } else if (units === 'si') {
      return `${Math.round(value * 3.6)} kph`;
    }
  };

  static getDistance = (value: number, units: string): string => {
    if (value && !Number.isNaN(value)) {
      if (units === 'fr'|| units === 'kl') {
        return `${Math.round(value)} mi`;
      } else if (units === 'si') {
        return `${Math.round(value)} km`;
      }
    }
  };

  static isMobile = (): boolean => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };
}
