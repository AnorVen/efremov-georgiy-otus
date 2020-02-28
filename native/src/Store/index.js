import {applyMiddleware, createStore} from 'redux';
import createRootReducer from '../Redusers';
import devToolsEnhancer from 'remote-redux-devtools';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default (preloadedState = {}) => {
  return createStore(
    createRootReducer(),
    preloadedState,
    applyMiddleware(thunk, logger),
  );
};
