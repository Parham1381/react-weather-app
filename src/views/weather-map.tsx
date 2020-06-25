import * as React from 'react';
import { isEmpty, isUndefined } from 'lodash';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultCity } from '../constants/message';
import { RootState, WeatherMapState } from '../constants/types';
import { getWeatherData } from '../store/actions';
import Alert from 'react-bootstrap/alert';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/col';
import Spin from 'react-bootstrap/Spinner';

const usePrevious = (value: any) => {
  const ref = useRef<any>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const WeatherMap: React.FC<any> = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state: RootState) => state.weather.filter);
  const location = useSelector((state: RootState) => state.weather.location);

  const [searchedLocation, setSearchedLocation] = React.useState(filter.searchedLocation);
  const [weatherMapState, setWeatherMapState] = React.useState<WeatherMapState>({
    latitude: 0,
    longitude: 0,
    location: '',
    isLoading: false,
    error: '',
  });
  const prevState = usePrevious(weatherMapState);

  const renderMap = () => {
    /*
    try {
      const weatherMap = document.getElementById('windy');
      weatherMap.parentNode.removeChild(weatherMap);
    } catch (err) {
      console.log('map does not exist');
    }

    const divElement: HTMLDivElement = document.createElement('div');
    divElement.setAttribute('id', 'windy');
    divElement.setAttribute('class', 'windy');
    document.getElementById('weather-map-wrapper').appendChild(divElement);
    
    const options = {
      key: ApiKey.openWeatherMap,
      lat: weatherMapState.latitude,
      lon: weatherMapState.longitude,
    }; */
  }

  const fetchWeather = async ( city: string) => {
      try {
        dispatch(getWeatherData(city));
      } catch (error) {
        setWeatherMapState({ ...weatherMapState, error: error.message });
      }
  };

  /**
   * Only be called when error occurs
   * @param {string} message
   */
  const searchByDefaultCity = (message: string) => {
    setWeatherMapState({ ...weatherMapState, error: message });
    setTimeout(async () => {
      await fetchWeather('Vancouver');
    }, 5000);
  };

  useEffect(() => {
      const handleError = (error: any) => searchByDefaultCity(`${error.message}.${defaultCity}`);
      searchByDefaultCity(defaultCity);
  }, []);

  useEffect(() => {
    if (
      weatherMapState.latitude !== 0 &&
      weatherMapState.longitude !== 0 &&
      (weatherMapState.latitude !== prevState.latitude || weatherMapState.longitude !== prevState.longitude)
    ) {
      renderMap();
    }

    if (filter.searchedLocation !== searchedLocation) {
      setWeatherMapState({ ...weatherMapState, isLoading: true });
      fetchWeather(filter.searchedLocation);
      setSearchedLocation(filter.searchedLocation);
    }
  });

  return (
    <Form>
      {weatherMapState.isLoading ? (
        <Form.Row className='fetching-weather-content'>
          <Spin className='fetching-weather-spinner' animation='grow'/>
          <h2 className='loading-text'>Fetching location...</h2>
        </Form.Row>
      ) : !isEmpty(weatherMapState.error) ? (
          <Form.Row className='fetching-weather-content'>
            <Col xs={24} sm={24} md={18} lg={16} xl={16}>
              <Alert variant='danger' type='error'>
                {weatherMapState.error}
              </Alert>
            </Col>
          </Form.Row>
      ) : (
        <Form.Row id='weather-map-wrapper' />
      )}
    </Form>
  );
};

