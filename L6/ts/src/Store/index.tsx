import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../Redusers'
import {composeWithDevTools} from 'redux-devtools-extension';
export const history = createBrowserHistory()
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        logger,
        thunk,
        routerMiddleware(history),
      ),
    ),
  )

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../Redusers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store
}
