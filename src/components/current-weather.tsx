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
    <div>
      <div className="d-flex justify-content-center mt-5">
        <div className="col-md-8 shadow-lg p-2 mb-1 bg-white rounded ">
          <div className="card-header text-center  text-danger">
            <h2>{location}</h2>
          </div>
          <div className="card-body">
            <div className='current-weather-summary'>
              <div>
                {currentWeather.main.temp} {Utils.getTemperatureSymbol(currentWeather.main.temp, filter.units)}
              </div>
              <div>Feels like {currentWeather.main.feels_like} {Utils.getTemperatureSymbol(currentWeather.main.feels_like, filter.units)}</div>
            </div>
          </div>
          <div className="card-footer text-muted ">
            <div className="row rounded" style={{ backgroundColor: "rgb(194, 212, 214)" }}>
              <div className="col-sm-10 justify-content-center m-auto  ">
                <Col className='current-weather-icon'>
                  <WeatherIcon icon={weatherIconCode} size={!Utils.isMobile() ? '1.1rem' : '.9rem'} />
                </Col>
                <p> {weatherType} :  {description} </p>
                <hr />
                <p> {description} </p>
                   Wind: {Utils.getWindSpeed(currentWeather.wind.speed, filter.units)}{' '}
                  <WindIcon degree={currentWeather.wind.deg} /> 
              </div>

            </div>

          </div>

        </div>
      </div>


      <Form>
        <Form.Row className='current-weather-top'>

          <Col xs={8} sm={8} md={8} lg={3}>
            <div className='current-weather-top-item'>

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


      </Form>
    </div>
  );
};
