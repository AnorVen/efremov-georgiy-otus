import React from 'react';
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

import List from "./src/containers/List";

class App extends React.Component {
  render(){
    return (
      <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
           <List/>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};




const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e2e2e2',
    minHeight: '100%',
  },
  body: {
    backgroundColor: '#fff',
  },

});

export default App;
