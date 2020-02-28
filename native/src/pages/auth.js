import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login, logout, createUser} from '../Actions/users';
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
    console.log(11);
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
  /*  loginWithGoogle = () => {
    this.props.loginWithGoogle();
  };*/

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
              <Header navigation={this.props.navigation} />
              <View>
                <Text>вы вошли с аккаута: {user.email}</Text>
                {user.displayName && <Text>Well come {user.displayName}</Text>}
                <View>
                  <Button
                    disabled={loading}
                    onPress={() => this.props.logout()}
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
                style={{backgroundColor: '#fff', margin: 5}}
                value={this.state.email}
                onChange={email => this.emailHandler(email)}
                type="email"
              />
              <Text>pass</Text>
              <TextInput
                style={{backgroundColor: '#fff', margin: 5}}
                value={this.state.password}
                onChange={pass => this.passHandler(pass)}
                type="password"
              />
              <Button
                disabled={loading}
                onPress={() => this.loginHandler()}
                title={'submit'}
              />
              <Button
                disabled={loading}
                onPress={() => this.createUser()}
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
      //loginWithGoogle: () => dispatch(loginWithGoogle()),
    };
  },
)(Login);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e2e2e2',
    height: '100%',
  },
});
