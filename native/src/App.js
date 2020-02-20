import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {connect} from 'react-redux';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ConnectedRouter} from 'connected-react-router';
import Header from './Containers/Header';
import {history} from './Store';
import HomePage from './pages/homePage';
import NotFound from './pages/404';
import Auth from './pages/auth';
import Profile from './pages/profile';
import Explore from './pages/explore';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import {
  createUser,
  currentUser,
  deleteUser,
  login,
  logout,
  getAllUsers,
} from './Actions/users';
import {fetchLike} from './Actions/posts';

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
      loaded: false,
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
    this.props.fetchLike();
    if (this.email && this.password) {
      this.props.login({email: this.email, password: this.password});
      setTimeout(() => {
        this.setState({loaded: true});
      }, 1000);
    } else {
      setTimeout(() => {
        this.setState({loaded: true});
        history.push('/auth');
      }, 1000);
    }
  }

  render() {
    console.log('App render');
    console.log(this.props);
    return (
      <Router history={history}>
        <Main>
          {this.state.loaded ? (
            <>
              <Header />
              <Content>
                <Switch>
                  <Route exact path="/" component={() => <HomePage />} />
                  <Route exact path="/auth" component={() => <Auth />} />
                  <Route
                    history={history}
                    exact
                    path="/profile"
                    component={() => <Profile />}
                  />
                  <Route exact path="/explore" component={() => <Explore />} />
                  <Route path="*" component={() => <NotFound />} />
                </Switch>
              </Content>
            </>
          ) : (
            <>LOADING...</>
          )}
        </Main>
      </Router>
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
)(App);
