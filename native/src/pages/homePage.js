import React, {Component} from 'react';
import Home from '../Components/Home';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../Containers/Header';
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e2e2e2',
    height: '100%',
  },
});
class HomePage extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Header {...this.props} />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Home />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default HomePage;
