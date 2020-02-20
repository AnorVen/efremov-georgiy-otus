import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from '../Redusers';
import devToolsEnhancer from 'remote-redux-devtools';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    devToolsEnhancer(applyMiddleware(logger, thunk, routerMiddleware(history))),
  );

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../Redusers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
}
