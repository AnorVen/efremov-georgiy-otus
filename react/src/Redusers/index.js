import { combineReducers } from 'redux';
import posts from './posts';
import user from './users';
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history) =>
  combineReducers({
    posts,
    user,
    router: connectRouter(history),
  });
export default createRootReducer;
