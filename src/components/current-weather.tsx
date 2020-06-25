import * as React from 'react';
import { Filter, OpenWeatherMapResult } from '../constants/types';
import { Utils } from '../utils';
import { WeatherIcon } from './icon/weather-icon';
import { WindIcon } from './icon/wind-icon';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/col';

interface CurrentWeatherProps {
  filter: Filter;
  location: string;
  currentWeather: OpenWeatherMapResult;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  filter,
  location,
  currentWeather,
}: CurrentWeatherProps) => {
  const weatherType = (currentWeather.weather && currentWeather.weather.length > 0) ? currentWeather.weather[0].main : '';
  const description = (currentWeather.weather && currentWeather.weather.length > 0) ? currentWeather.weather[0].description : '';
  const weatherIconCode = (currentWeather.weather && currentWeather.weather.length > 0) ? currentWeather.weather[0].icon : '';
  return (
    <Form>
      <Form.Row className='current-weather-top'>
        <Col xs={8} sm={6} md={6} lg={4}>
          <div className='current-weather-top-item'>
            {weatherType}
          </div>
        </Col>
        <Col xs={8} sm={8} md={8} lg={3}>
          <div className='current-weather-top-item'>
            {description}
          </div>
        </Col>
        <Col xs={8} sm={6} md={6} lg={3}>
          <div className='current-weather-top-item'>
            Wind: {Utils.getWindSpeed(currentWeather.wind.speed, filter.units)}{' '}
            <WindIcon degree={currentWeather.wind.deg} />
          </div>
        </Col>
        <Col xs={8} sm={6} md={6} lg={3}>
          <div className='current-weather-top-item'>
            Humidity: {Math.round(currentWeather.main.humidity)} <i className='wi wi-humidity' />
          </div>
        </Col>
        <Col xs={8} sm={6} md={6} lg={4}>
          <div className='current-weather-top-item'>
            Pressure: {Utils.getPressure(currentWeather.main.pressure, filter.units)}
          </div>
        </Col>
        <Col xs={6} sm={8} md={8} lg={3}>
          <div className='current-weather-top-item'>
            Visibility: {Utils.getDistance(currentWeather.visibility, filter.units)}
          </div>
        </Col>
      </Form.Row>
      <Form.Row className='current-weather-location'>
        {location}
      </Form.Row>
      <Form.Row >
        <Col xs={3} sm={3} md={2} lg={2} xl={1} className='current-weather-icon'>
          <WeatherIcon icon={weatherIconCode} size={!Utils.isMobile() ? '4rem' : '3rem'} />
        </Col>
        <Col xs={12} sm={8} md={6} lg={4} xl={4}>
          <div className='current-weather-summary'>
            <div>
              {currentWeather.main.temp} {Utils.getTemperatureSymbol(currentWeather.main.temp, filter.units)}
            </div>
            <div>Feels like {currentWeather.main.feels_like} {Utils.getTemperatureSymbol(currentWeather.main.feels_like, filter.units)}</div>
          </div>
        </Col>
      </Form.Row>
    </Form>
  );
};
