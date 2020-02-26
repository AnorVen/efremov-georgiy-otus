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
    const getAllUsers = async () => {
      await this.props.getAllUsers();
      await this.props.fetchLike();
    };
    getAllUsers().then();
    const userToken = async () => {
      const login = await loadToken();
      await console.log(login.email);
      if (!!login.email) {
        await this.props.login(login);
      }
      return !!login.email;
    };
    userToken().then(res => {
      console.log(this.props.navigation);
      console.log(userToken());
      setTimeout(() => {
        this.props.navigation.navigate(res ? 'Root' : 'Login');
      }, 1000);
    });
  }

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
