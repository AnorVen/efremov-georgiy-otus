import React, {Component} from 'react';
import * as firebase from 'firebase/app';

import * as auth from 'firebase/auth';
import * as db from 'firebase/database';
import * as storage from 'firebase/storage';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  FlatList,
} from 'react-native';

import List from "./src/components/List";
import {store} from "./src/store/configureStore";
import {Provider, connect} from "react-redux";

const firebaseConfig = {
  apiKey: "AIzaSyAUTtcjk7Q6J8pVnvK5vJpcFQ6CFIq8TzQ",
  authDomain: "guests-6d06a.firebaseapp.com",
  databaseURL: "https://guests-6d06a.firebaseio.com",
  projectId: "guests-6d06a",
  storageBucket: "guests-6d06a.appspot.com",
  messagingSenderId: "429740294393",
  appId: "1:429740294393:web:94d81d2285ee0464bb6228"
};
if (!firebase.apps.length) {
  const firebaseApp = firebase.initializeApp(firebaseConfig);
}

class App extends Component {


  render() {
    return (
      <>
        <Provider store={store}>
          <StatusBar barStyle="dark-content"/>
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>

              <List/>
            </ScrollView>
          </SafeAreaView>

        </Provider>
      </>
    );
  }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e2e2e2',
    minHeight: '100%',
  },
});

export default App;
