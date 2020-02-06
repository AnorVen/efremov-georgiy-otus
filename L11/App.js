import React, {Component} from 'react';
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


import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createAppContainer} from '@react-navigation/stack';


import firebase from 'firebase';


import {store} from "./src/store/configureStore";
import {Provider, connect} from "react-redux";
import List from "./src/components/List";
import Main from "./src/pages/main";
import LoginPage from "./src/pages/login";
import Nav from "./src/components/navigation";
import Navigation from "./src/Navigation";

const firebaseConfig = {
  apiKey: "AIzaSyAUTtcjk7Q6J8pVnvK5vJpcFQ6CFIq8TzQ",
  authDomain: "guests-6d06a.firebaseapp.com",
  databaseURL: "https://guests-6d06a.firebaseio.com",
  projectId: "guests-6d06a",
  storageBucket: "guests-6d06a.appspot.com",
  messagingSenderId: "429740294393",
  appId: "1:429740294393:web:94d81d2285ee0464bb6228"
};

class App extends Component {
/*
  componentDidMount(): void {
    firebase.initializeApp(firebaseConfig);

    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().languageCode = 'ru'
    provider.addScope('profile');
    provider.addScope('https://www.googleapis.com/auth/drive');
    firebase.auth().signInWithRedirect(provider);
    //add the code below to your previous lines
    firebase.auth().getRedirectResult().then(function(authData) {
      console.log(authData);
    }).catch(function(error) {
      console.log(error);
    });

  }
*/

  render() {
    return (
        <Provider store={store}>
          <Navigation/>
        </Provider>
    );
  }
}




export default App;
