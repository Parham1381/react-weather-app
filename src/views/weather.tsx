import * as React from 'react';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentWeather } from '../components/current-weather';
import { defaultCity } from '../constants/defaultCity';
import { Filter, RootState } from '../constants/types';
import { fetchingData, fetchingDataFailure, getWeatherData, setFilter } from '../store/actions';
import { WeatherSearch } from '../components/weather-search';
import Alert from 'react-bootstrap/alert';
import Col from 'react-bootstrap/col';
import Row from 'react-bootstrap/row';
import Spin from 'react-bootstrap/Spinner';

export const WeatherComponent: React.FC<any> = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state: RootState) => state.weather.isLoading);
  const filter = useSelector((state: RootState) => state.weather.filter);
  const location = useSelector((state: RootState) => state.weather.location);
  const currentWeather = useSelector((state: RootState) => state.weather.currentWeather);
  const error = useSelector((state: RootState) => state.weather.error);

  const [filterState, setFilterState] = React.useState<Filter>(filter);

  const searchByDefaultCity = (message: string) => {
    dispatch(fetchingDataFailure(message));
    setTimeout(() => {
      dispatch(getWeatherData('Vancouver'));
    });
  };

  // When the location or current weather has not be set yet
  useEffect(() => {
    if (isEmpty(location) && isEmpty(currentWeather)) {
      dispatch(fetchingData());
      searchByDefaultCity(defaultCity);
    }
  }, []); 

  // When user search weather by city name
  useEffect(() => {
    if (filter.searchedLocation !== filterState.searchedLocation) {
      dispatch(getWeatherData( filter.searchedLocation));
      setFilterState({ ...filterState, searchedLocation: filter.searchedLocation });
    }
  });

  const SearchCity = ({}) => {
    return (
        <WeatherSearch onSearch={handleSearch} isDisabled={isLoading} />
    );
  };

  const handleSearch = (city: string) => {
    if (location) {
      dispatch(setFilter({ ...filter, searchedLocation: city }));
    }
  };

  const renderWeatherPage = () => {
    if (error) {
      return (
        <div>
          <Row className='fetching-weather-content'>
            <Col>
              <Alert variant='danger' type='error'>
                {error}
              </Alert>
            </Col>
          </Row>
        </div>
      );
    } else if (location && currentWeather) {
      return (
        <div>
          <Row>
            <Col>
              <div className='weather-search-outer'>
                <div className="w-50 mx-auto p-2 wrapper container" > 
                  <SearchCity />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <CurrentWeather location={location} filter={filter} currentWeather={currentWeather} />
          </Row>
        </div>
      );
    }; 
  };
  return (
    <div>
      {isLoading ? (
        <Row className='fetching-weather-content'>
          <Spin className='fetching-weather-spinner' animation='grow'/>
          <h2 className='loading-text'>Loading...</h2>
        </Row>
      ) : (
        renderWeatherPage()
      )}
    </div>
  );
};
