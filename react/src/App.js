import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import Header from './Containers/Header';
import createRootReducer from './Redusers';
import { history } from './Store';
import HomePage from './pages/index';
import NotFound from './pages/404';
import Auth from './pages/auth';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Main = styled.div`
  background-color: #eee;
  color: #000;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

const App = () => {
  console.log('App render');

  return (
    <Router>
      <ConnectedRouter history={history}>
        <Main>
          <Header />
          <Content>
            <Switch>
              <Route exact path='/' component={() => <HomePage />} />
              <Route exact path='/auth' component={() => <Auth />} />
              <Route path='*' component={() => <NotFound />} />
            </Switch>
          </Content>
        </Main>
      </ConnectedRouter>
    </Router>
  );
};

App.propTypes = {
  history: PropTypes.object,
};

export default App;
