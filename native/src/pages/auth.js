import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login, logout, createUser, loginWithGoogle} from '../Actions/users';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../Containers/Header';

class Login extends Component {
  state = {
    email: '63@qwe.ru',
    password: '123123',
  };
  loginHandler = () => {
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
    this.setState({
      email: '',
      password: '',
    });
  };
  createUser = () => {
    this.props.createUser({
      email: this.state.email,
      password: this.state.password,
    });
    this.setState({
      email: '',
      password: '',
    });
  };
  emailHandler = e => {
    this.setState({
      email: e.target.value,
    });
  };
  passHandler = e => {
    this.setState({
      password: e.target.value,
    });
  };
  loginWithGoogle = () => {
    this.props.loginWithGoogle();
  };

  render() {
    const {user, loading, error} = this.props.userData;
    if (user.email) {
      return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <Header navigator={this.props.navigator} />
              <View>
                вы вошли с аккаута: {user.email}
                {user.displayName && <p>Well come {user.displayName}</p>}
                <View>
                  <Button
                    disabled={loading}
                    onClick={() => this.props.logout()}
                    title={'logout'}
                  />
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
      );
    }
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View>
              {error.code && (
                <Text>
                  ERROR: {error.code}: {error.message}
                </Text>
              )}
              <Text>email</Text>
              <TextInput
                value={this.state.email}
                onChange={email => this.emailHandler(email)}
                type="email"
              />
              <Text>pass</Text>
              <TextInput
                value={this.state.password}
                onChange={pass => this.passHandler(pass)}
                type="password"
              />
              <Button
                disabled={loading}
                onClick={() => this.loginHandler()}
                title={'submit'}
              />
              <Button
                disabled={loading}
                onClick={() => this.createUser()}
                title={'create'}
              />
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
      createUser: ({email, password}) =>
        dispatch(createUser({email, password})),
      logout: () => dispatch(logout()),
      loginWithGoogle: () => dispatch(loginWithGoogle()),
    };
  },
)(Login);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});
