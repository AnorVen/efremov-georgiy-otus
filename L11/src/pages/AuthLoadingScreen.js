import React from 'react';
import {
  ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet,
  View,
} from 'react-native';
import {loadToken} from '../utils/storage';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e2e2e2',
    minHeight: '100%',
  },
});
class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this._bootstrapAsync();
    }, 1000);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await loadToken();
    console.log(userToken);
    this.props.navigation.navigate(userToken ? 'Root' : 'Login');
  };

  render() {
    return (<>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
      <View style={{ flex: 1, alignItems: 'center', height: '100%', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
}
export default AuthLoadingScreen
