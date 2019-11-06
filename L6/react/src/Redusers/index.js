import {combineReducers} from 'redux';
import showWeatherOnCity from './showWeatherOnCity';
import cityList from './cityList';
import favorites from "./favorites";
import {connectRouter} from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
    getDetails: showWeatherOnCity,
    cityList,
    favorites,
    router: connectRouter(history),
  }
);
export default createRootReducer
