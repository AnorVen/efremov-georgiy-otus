import React, {Component} from 'react'
import List from "../components/List";
import Nav from "../components/navigation";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text} from "react-native";


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e2e2e2',
    minHeight: '100%',
  },
});


class Main extends Component {
  static navigationOptions = {
    headerTitle: () => <Text>Main</Text>
  }

  render() {
    return <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Nav navigation={this.props.navigation}/>
            <List/>
          </ScrollView>
        </SafeAreaView>
      </>
  }
}

export default Main
