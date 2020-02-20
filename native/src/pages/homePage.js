import React from 'react';
import Home from '../Components/Home';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../Containers/Header';
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});
export default function HomePage() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <Home />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
