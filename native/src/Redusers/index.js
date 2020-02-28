import {combineReducers} from 'redux';
import posts from './posts';
import user from './users';

const createRootReducer = () =>
  combineReducers({
    posts,
    user,
  });
export default createRootReducer;
