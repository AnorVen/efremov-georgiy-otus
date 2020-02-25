import {applyMiddleware, compose, createStore} from 'redux';
import createRootReducer from '../Redusers';
import devToolsEnhancer from 'remote-redux-devtools';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default (preloadedState = {}) => {
  const store = createStore(
    createRootReducer(),
    preloadedState,
    devToolsEnhancer(applyMiddleware(logger, thunk)),
  );
  return store;
};
