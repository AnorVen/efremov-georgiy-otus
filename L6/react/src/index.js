import { AppContainer } from 'react-hot-loader'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './Store'
import {Provider} from "react-redux";
import { syncHistoryWithStore } from 'react-router-redux'
import { createHistory } from 'history';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory()
const location = history.location;

const store = configureStore()
const render = () => {
  ReactDOM.render(
        <Provider store={store}>
            <App history={history} />
        </Provider>,
    document.getElementById('root')
  )
}

render()

syncHistoryWithStore(
  createHistory(),
  store,
);

if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render()
  })
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
