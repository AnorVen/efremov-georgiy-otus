import React from "react";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";
import Nav from "./components/navigation";
import List from "./components/List";
import Main from "./pages/main";
import LoginPage from "./pages/login";
import AuthLoadingScreen from './pages/AuthLoadingScreen'
import More from "./pages/More";
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';



const AuthenticatedStack = createStackNavigator({
  Main: {
    screen: Main,
  },
  More:{
    screen: More,
  }
});

const AppNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Login: {
    screen: LoginPage,
  },
  Root: {
    screen: AuthenticatedStack,
  },
}, { initialRouteName: 'AuthLoading' });

export default createAppContainer(AppNavigator)
