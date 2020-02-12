import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createUser,
  currentUser,
  login,
  loginWithGoogle,
  logout,
  updateUser,
  updateEmailUsers,
  deleteUser,
} from '../Actions/users';
class Profile extends Component {
  state = {
    newPassword: '',
  };
  logoutHandler = () => {
    this.props.logout();
  };
  passwordHandler = (e) => {
    this.setState({
      newPassword: e.target.value,
    });
  };
  render() {
    console.log(this.props);
    const { user } = this.props.userData;
    const { uid, displayName, photoURL, email, phoneNumber, metadata } = user;
    return (
      <div>
        <img src={photoURL} alt='' />
        <p>{displayName}</p>
        <p>{email}</p>
        <input
          type='password'
          value={this.state.newPassword}
          onChange={(pass) => this.passwordHandler(pass)}
        />
        <p>last sing in {metadata.lastSignInTime}</p>
        <p>{user.about}</p>
        <button
          onClick={() => {
            this.logoutHandler();
          }}
        >
          logout
        </button>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      userData: state.user,
    };
  },
  (dispatch) => {
    return {
      login: ({ email, password }) => dispatch(login({ email, password })),
      createUser: ({ email, password }) =>
        dispatch(createUser({ email, password })),
      logout: () => dispatch(logout()),
      currentUser: () => dispatch(currentUser()),
      deleteUser: () => dispatch(deleteUser()),
    };
  }
)(Profile);
