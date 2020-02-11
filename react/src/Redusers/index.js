import { combineReducers } from 'redux';
import showWeatherOnCity from './showWeatherOnCity';
import cityList from './cityList';
import favorites from './favorites';
import posts from './posts';
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history) =>
  combineReducers({
    posts,
    router: connectRouter(history),
  });
export default createRootReducer;
