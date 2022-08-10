import { Utils } from "../libraries/utils";

export interface IOpenWeatherMapResult {
  coord:{
    lon: number,
    lat: number
  };

  weather: [{
    id: number,
    main: string,
    description: string,
    icon: string
  }];

  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  };

  wind: {
    speed: number,
    deg: number
  };

  visibility: number;
}

export interface IWeatherState {
  isLoading: boolean;
  filter: IFilter;
  location: string;
  currentWeather: IOpenWeatherMapResult;
  error: string;
} 

export interface IFilter {
  units: 'si' | 'fr' | 'kl';
  searchedLocation: string;
}

export interface IRootState {
  weather: IWeatherState;
}
