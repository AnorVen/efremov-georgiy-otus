import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Navigation from './src/Navigation';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/storage';
import '@react-native-firebase/database';
import configureStore from './src/Store';

const firebaseConfig = {
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
export const fire = !firebase.apps
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const store = configureStore();

const App = () => (
  <>
    <Provider store={store}>
      <Navigation />
    </Provider>
  </>
);

export default App;
