export interface OpenWeatherMapResult {
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

export interface WeatherState {
  isLoading: boolean;
  filter: Filter;
  location: string;
  currentWeather: OpenWeatherMapResult;
  error: string;
} 

export interface Filter {
  units: 'si' | 'fr' | 'kl';
  searchedLocation: string;
}

export interface RootState {
  weather: WeatherState;
}
