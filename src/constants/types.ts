export interface OpenWeatherMapResult {
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
  },

  wind: {
    speed: number,
    deg: number
  };

  visibility: number;
}

export interface Filter {
  units: 'si' | 'fr' | 'kl';
  searchedLocation: string;
  timestamp: number;
}
/*
export interface NavBarState {
  location: string;
  timestamp: number;
}
*/

export interface WeatherMapState {
  latitude: number;
  longitude: number;
  location: string;
  error: string;
  isLoading: boolean;
}


export interface ForecastState {
  isLoading: boolean;
  filter: Filter;
  location: string;
  currentWeather: OpenWeatherMapResult;
  error: string;
} 

export interface RootState {
  weather: ForecastState;
}
