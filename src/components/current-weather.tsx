import * as React from 'react';
import { IFilter, IOpenWeatherMapResult } from '../interfaces/interfaces';
import { Utils } from '../libraries/utils';
import { WeatherIcon } from './weather-icon';

interface CurrentWeatherProps {
  filter: IFilter;
  location: string;
  currentWeather: IOpenWeatherMapResult;
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
        <div className="col-sm-6 shadow-lg p-2 mb-1 bg-white rounded ">
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
                <div className="d-flex justify-content-center m-auto" >
                  <WeatherIcon icon={weatherIconCode} size={!Utils.isMobile() ? '1.1rem' : '.9rem'} />

                </div>
                <div className="d-flex justify-content-center">
                  <p> {weatherType} :  {description} ||  {description} </p>
                </div>

                <div className="d-flex justify-content-center">
                  <p>
                    Wind: {Utils.getWindSpeed(currentWeather.wind.speed, filter.units)}{' '}
                ||
                Humidity: {Math.round(currentWeather.main.humidity)} <i className='wi wi-humidity' />
                  </p>
                </div>
                <div className="d-flex justify-content-center">
                  <p>
                    Pressure: {Utils.getPressure(currentWeather.main.pressure, filter.units)}
               ||
               Visibility: {Utils.getDistance(currentWeather.visibility, filter.units)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
