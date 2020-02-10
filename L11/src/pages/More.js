import React from "react";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text} from 'react-native';
import Nav from "../components/navigation";
import {connect} from 'react-redux'

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e2e2e2',
    minHeight: '100%',
  },
});


class More extends React.Component{
  static navigationOptions = {
    headerTitle: ()=><Text>More</Text>
  }

  render() {
    return(
      <>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
      <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={styles.scrollView}>
      <Nav/>
      <Text>
        More info
      </Text>
      </ScrollView>
      </SafeAreaView>
        </>
    )
  }
}


export default connect({},{})(More)
