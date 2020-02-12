import { combineReducers } from 'redux';
import posts from './posts';
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history) =>
  combineReducers({
    posts,
    router: connectRouter(history),
  });
export default createRootReducer;
