import { combineReducers } from 'redux';
import showWeatherOnCity from './showWeatherOnCity';
import cityList from './cityList';

export default combineReducers({ getDetails: showWeatherOnCity, cityList });
