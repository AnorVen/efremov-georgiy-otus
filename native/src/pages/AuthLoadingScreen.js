import React, {Component} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {loadToken} from '../utils/storage';
import {connect} from 'react-redux';
import {getAllUsers, login} from '../Actions/users';
import {fetchLike} from '../Actions/posts';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e2e2e2',
    minHeight: '100%',
  },
});
class AuthLoadingScreen extends Component {
  componentDidMount() {
    console.log(1);
    setTimeout(() => {
      this._bootstrapAsync();
    }, 300);
  }

  _bootstrapAsync = async () => {
    console.log(2);

    const userToken = await loadToken();
    console.log(userToken);
    if (!!userToken.email) {
      await this.props.login(login);
    }
    this.props.getAllUsers();
    this.props.fetchLike();
    this.props.navigation.navigate(userToken.email ? 'Main' : 'Login');
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
export default connect(
  state => {
    return {
      userData: state.user,
    };
  },
  dispatch => {
    return {
      login: ({email, password}) => dispatch(login({email, password})),
      getAllUsers: () => dispatch(getAllUsers()),
      fetchLike: () => dispatch(fetchLike()),
    };
  },
)(AuthLoadingScreen);
