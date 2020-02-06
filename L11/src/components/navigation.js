import {Button, View, StyleSheet} from "react-native";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
  bntLink:{
    color: '#f18207',
    borderRadius: 5
  },
  navWrapp: {
    paddingTop: 40,
    display: 'flex',
    justifyContent:'space-around',
    flexDirection: 'row'
  }
})

const Nav = ({navigation})=>{
  console.log(navigation)
  return(
  <View style={styles.navWrapp}>
    <Button
      style={styles.bntLink}
      title="Main"
      onPress={() => navigation.navigate('Main')}
    />
    <Button
      style={styles.bntLink}
      title="Login"
      onPress={() => navigation.navigate('Login')}
    />
    <Button style={styles.bntLink} title="Go back" onPress={() => navigation.goBack()} />
  </View>
)}


export default Nav
