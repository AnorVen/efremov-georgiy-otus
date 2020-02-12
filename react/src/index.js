import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './Store';
import { Provider } from 'react-redux';

import * as firebase from 'firebase/app';
import auth from 'firebase/auth';
import firestore from 'firebase/firestore';
import { BrowserRouter as Router } from 'react-router-dom';

var firebaseConfig = {
  apiKey: 'AIzaSyAAgxUsM52QJnJIaLquYVR529CIoYZfbJk',
  authDomain: 'mytwitter-2f3e8.firebaseapp.com',
  databaseURL: 'https://mytwitter-2f3e8.firebaseio.com',
  projectId: 'mytwitter-2f3e8',
  storageBucket: 'mytwitter-2f3e8.appspot.com',
  messagingSenderId: '332928195450',
  appId: '1:332928195450:web:3bd01d7065b89e7235d4c3',
  measurementId: 'G-K2BDGSR309',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const store = configureStore();
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render();
  });
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
