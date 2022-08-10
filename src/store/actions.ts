import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getWeatherThroughAPI } from '../libraries/rest-api';
import { IFilter, IRootState, IOpenWeatherMapResult } from '../interfaces/interfaces';
import { Utils } from '../libraries/utils';

export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';

export const SET_FILTER = 'SET_FILTER';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_TIMEZONE = 'SET_TIMEZONE';

export const SET_CURRENT_WEATHER = 'SET_CURRENT_WEATHER';
export const setFilter = (filter: IFilter) => {
  return {
    type: SET_FILTER,
    filter,
  };
};

const setLocation = (location: string) => {
  return {
    type: SET_LOCATION,
    location,
  };
};

const setCurrentWeather = (currentWeather: IOpenWeatherMapResult) => {
  return {
    type: SET_CURRENT_WEATHER,
    currentWeather,
  };
};

export const fetchingData = () => {
  return {
    type: FETCHING_DATA,
  };
};

const fetchingDataSuccess = () => {
  return {
    type: FETCHING_DATA_SUCCESS,
  };
};

export const fetchingDataFailure = (error: string) => {
  return {
    type: FETCHING_DATA_FAILURE,
    error,
  };
};

/**
 * city name to get the weather data for it
 * @param {string} city
 */
export const getWeatherData = (city: string) => {
  return async (dispatch: ThunkDispatch<IRootState, any, AnyAction>, getState: any) => {
    dispatch(fetchingData());
    try {
        const unitsOfMeasurement = Utils.getUnitsOfMeasurement(getState().weather.filter.units);
        const currentWeather: IOpenWeatherMapResult = await getWeatherThroughAPI(city, unitsOfMeasurement);
        if (currentWeather && currentWeather.coord) {
          dispatch(setLocation(city));
          dispatch(setCurrentWeather(currentWeather));
          dispatch(fetchingDataSuccess()); 
        } else {
          dispatch(fetchingDataFailure('City Not Found!'));
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
    } catch (error) {
      if (error) {
        dispatch(fetchingDataFailure(error.message));
      } else {
        dispatch(fetchingDataFailure('Unknown error happened!'));
      }
    }
  };
};
