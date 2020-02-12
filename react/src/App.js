import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import Header from './Containers/Header';
import createRootReducer from './Redusers';
import { history } from './Store';
import HomePage from './pages/homePage';
import NotFound from './pages/404';
import Auth from './pages/auth';
import Profile from './pages/profile';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
  createUser,
  currentUser,
  deleteUser,
  login,
  logout,
} from './Actions/users';

const Main = styled.div`
  background-color: #eee;
  color: #000;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

class App extends Component {
  constructor() {
    super();
    this.email = window.localStorage.getItem('email');
    this.password = window.localStorage.getItem('password');
    this.state = {
      logined: false,
    };
    console.log(this.props);
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.logined) {
      console.log('app rerender');
      if (this.email && this.password) {
        props.login({
          email: this.email,
          password: this.password,
        });
      }
    }
  }

  render() {
    console.log('App render');
    console.log(this.props);
    return (
      <ConnectedRouter history={history}>
        <Main>
          <Header />
          <Content>
            <Switch>
              <Route exact path='/' component={() => <HomePage />} />
              <Route exact path='/auth' component={() => <Auth />} />
              <Route exact path='/profile' component={() => <Profile />} />
              <Route path='*' component={() => <NotFound />} />
            </Switch>
          </Content>
        </Main>
      </ConnectedRouter>
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
    };
  }
)(App);
