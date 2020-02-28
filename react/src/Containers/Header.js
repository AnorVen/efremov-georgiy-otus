import React, { Component, memo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';

const HeaderContent = styled.div`
  height: 50px;
  background-color: #858585;
`;
const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
  padding-left: 50px;
  padding-right: 50px;
  justify-content: space-between;
  align-items: flex-start;
`;
const FlexRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 50%;
`;

class Header extends Component {
  render() {
    console.log('Header render');
    return (
      <HeaderContent>
        <Wrapper>
          <p>Header</p>
          <FlexRow>
            <Link to={'/'}>Home</Link>
            <Link to={'/auth'}>Auth</Link>
            <Link to={'/explore'}>Explore</Link>
            <Link to={'/profile'}>Profile</Link>
          </FlexRow>
        </Wrapper>
      </HeaderContent>
    );
  }
}

export default connect(
  (state) => {
    return {};
  },
  (dispatch) => {
    return {};
  }
)(memo(Header));
