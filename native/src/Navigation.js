import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import Main from './pages/homePage';
import LoginPage from './pages/auth';
import AuthLoadingScreen from './pages/AuthLoadingScreen';
import Profile from './pages/profile';
import Explore from './pages/explore';
import ErrorPage from './pages/404';
import SearchFriends from './pages/SearchFriends';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

/*const AuthenticatedStack = createStackNavigator({
  Main: {
    screen: Main,
  },
  Explore: {
    screen: Explore,
  },
  Profile: {
    screen: Profile,
  },
});*/

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Login: {
      screen: LoginPage,
    },
    Root: {
      screen: LoginPage, //AuthenticatedStack,
    },
  },
  {initialRouteName: 'AuthLoading'},
);

export default createAppContainer(AppNavigator);
