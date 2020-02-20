import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Provider} from 'react-redux';
import Navigation from './src/Navigation';
import * as firebase from 'firebase/app';
import configureStore from './src/Store';

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

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
