import React, { Component } from 'react';
import connect from 'react-redux';

class Login extends Component {
  render() {
    return (
      <div>
        <p>email</p>
        <input type='email' />
        <p>pass</p>
        <input type='password' />
        <button>submit</button>

        <div>
          <button>sign-in with google</button>
        </div>

        <div>
          <button>logout</button>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      user: state.user,
    };
  },
  (dispatch) => {
    return {
      login: (user) => dispatch(login(user)),
      logout: () => dispatch(logout()),
    };
  }
)(Login);
