var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentWeather } from '../components/current-weather';
import { defaultCity } from '../constants/defaultCity';
import { fetchingData, fetchingDataFailure, getWeatherData, setFilter } from '../store/actions';
import { WeatherSearch } from '../components/weather-search';
import Alert from 'react-bootstrap/alert';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/col';
import Row from 'react-bootstrap/row';
import Spin from 'react-bootstrap/Spinner';
export var WeatherMain = function () {
    var dispatch = useDispatch();
    var isLoading = false; // useSelector((state: RootState) => state.weather.isLoading);
    var filter = useSelector(function (state) { return state.weather.filter; });
    var location = useSelector(function (state) { return state.weather.location; });
    var currentWeather = useSelector(function (state) { return state.weather.currentWeather; });
    var error = useSelector(function (state) { return state.weather.error; });
    var _a = React.useState(filter), filterState = _a[0], setFilterState = _a[1];
    var searchByDefaultCity = function (message) {
        dispatch(fetchingDataFailure(message));
        setTimeout(function () {
            dispatch(getWeatherData('Vancouver'));
        });
    };
    // When the location or current weather has not be set yet
    useEffect(function () {
        if (isEmpty(location) && isEmpty(currentWeather)) {
            dispatch(fetchingData());
            searchByDefaultCity(defaultCity);
        }
    }, []);
    // When user search weather by city name
    useEffect(function () {
        if (filter.searchedLocation !== filterState.searchedLocation) {
            dispatch(getWeatherData(filter.searchedLocation));
            setFilterState(__assign(__assign({}, filterState), { searchedLocation: filter.searchedLocation }));
        }
    });
    var SearchCity = function (_a) {
        return (React.createElement(WeatherSearch, { onSearch: handleSearch, isDisabled: isLoading }));
    };
    var handleSearch = function (city) {
        if (location) {
            dispatch(setFilter(__assign(__assign({}, filter), { searchedLocation: city })));
        }
    };
    var renderWeatherPage = function () {
        if (error) {
            return (React.createElement("div", null,
                React.createElement(Row, { className: 'fetching-weather-content' },
                    React.createElement(Col, { xs: 24, sm: 24, md: 18, lg: 16, xl: 16 },
                        React.createElement(Alert, { variant: 'danger', type: 'error' }, error)))));
        }
        else if (currentWeather && location) {
            return (React.createElement("div", null,
                React.createElement(Row, null,
                    React.createElement(Col, null,
                        React.createElement("div", { className: 'weather-search-outer' },
                            React.createElement(SearchCity, null)))),
                React.createElement(Row, null,
                    React.createElement(CurrentWeather, { location: location, filter: filter, currentWeather: currentWeather }))));
        }
    };
    return (React.createElement(Form, null, isLoading ? (React.createElement(Form.Row, { className: 'fetching-weather-content' },
        React.createElement(Spin, { className: 'fetching-weather-spinner', animation: 'grow' }),
        React.createElement("h2", { className: 'loading-text' }, "Loading..."))) : (renderWeatherPage())));
};
