import React, {Component} from 'react'
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text} from 'react-native'
import Nav from "../components/navigation";
import {connect} from 'react-redux';
import Login from '../components/login'
import {logout} from "../actions";
import {loadToken} from "../utils/storage";

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e2c327',
    minHeight: '100%',
  },
});


class LoginPage extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Nav navigation={this.props.navigation}/>
            <Text style={{fontSize: 16, color: 'red', textAlign: 'center', paddingTop: 50}}
                  numberOfLines={1}>
              LOGIN PAGE
            </Text>
            <Login {...this.props}/>
          </ScrollView>
        </SafeAreaView>
      </>

    )
  }
}

export default LoginPage;
