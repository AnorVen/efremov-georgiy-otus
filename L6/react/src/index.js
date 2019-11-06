import { AppContainer } from 'react-hot-loader'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './Store'
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";

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
