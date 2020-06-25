import * as moment from 'moment';

export class Utils {

  /**
   * @param {number} value
   * @param {string} units
   * @returns {string}
   */
  static getTemperatureSymbol = (value: number, units: string): string => {
    if (units === 'kl') {
      return `°K`;
    } else if (units === 'fr') {
      return `℉`;
    } else if (units === 'si') {
      return `℃`;
    } 
  };

  /**
   * @param {number} value
   * @param {string} units
   * @returns {string}
   */
  static getPressure = (value: number, units: string): string => {
    if (units === 'fr' || units === 'kl') {
      return `${Math.round(value)} mb`;
    } else if (units === 'si') {
      return `${Math.round(value)} hPa`;
    }
  };

  /**
   * @param {number} value
   * @param {string} units
   * @returns {string}
   */
  static getWindSpeed = (value: number, units: string): string => {
    if (units === 'fr' || units === 'kl') {
      return `${Math.round(value)} mph`;
    } else if (units === 'si') {
      return `${Math.round(value * 3.6)} kph`;
    }
  };

  static getDistance = (value: number, units: string): string => {
    if (units === 'fr'|| units === 'kl') {
      return `${Math.round(value)} mi`;
    } else if (units === 'si') {
      return `${Math.round(value)} km`;
    }
  };

  static isMobile = (): boolean => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };
}