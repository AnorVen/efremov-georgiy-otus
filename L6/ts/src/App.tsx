import React, {ReactElement} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types'

import {ConnectedRouter} from 'connected-react-router'
import TargetList from './Containers/TargetList';
import Details from './Components/Details';
import Header from './Containers/Header';
import createRootReducer from './Redusers';
import Home from "./Components/Home";
import NotFound from "./Components/404";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Main = styled.div`
  background-color: #eee;
  color: #000;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

interface App{
  history: object
}

export let App: ({history}: { history: object }) => ReactElement;

App = ({history}) => {
  console.log('App render');
  return (
    <Router>
      <ConnectedRouter history={history}>
        <Main>
          <Header/>
          <Content>
            <TargetList/>
            <Switch>
              <Route exact path="/" component={()=> <Home/>}/>
              <Route path="/:title" component={()=><Details/>}/>
              <Route path="*" component={()=> <NotFound/>}/>
            </Switch>
          </Content>
        </Main>
      </ConnectedRouter>
    </Router>


  );
};

App.propTypes = {
  history: PropTypes.object,
}
