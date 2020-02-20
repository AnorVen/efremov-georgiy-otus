import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  login,
  logout,
  currentUser,
  createUser,
  loginWithGoogle,
} from '../Actions/users';

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
  currentUser = () => {
    this.props.currentUser();
  };
  loginWithGoogle = () => {
    this.props.loginWithGoogle();
  };

  render() {
    const {user, loading, error} = this.props.userData;
    if (user.email) {
      return (
        <div>
          вы вошли с аккаута: {user.email}
          {user.displayName && <p>Well come {user.displayName}</p>}
          <div>
            <button disabled={loading} onClick={() => this.props.logout()}>
              logout
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        {error.code && (
          <div>
            ERROR: {error.code}: {error.message}
          </div>
        )}
        <p>email</p>
        <input
          value={this.state.email}
          onChange={email => this.emailHandler(email)}
          type="email"
        />
        <p>pass</p>
        <input
          value={this.state.password}
          onChange={pass => this.passHandler(pass)}
          type="password"
        />
        <button disabled={loading} onClick={() => this.loginHandler()}>
          submit
        </button>
        <button disabled={loading} onClick={() => this.createUser()}>
          create
        </button>

        <div>
          <button disabled={loading} onClick={() => this.loginWithGoogle()}>
            sign-in with google
          </button>
        </div>

        <div>
          <button disabled={loading} onClick={() => this.currentUser()}>
            user
          </button>
        </div>
      </div>
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
      currentUser: () => dispatch(currentUser()),
      loginWithGoogle: () => dispatch(loginWithGoogle()),
    };
  },
)(Login);
