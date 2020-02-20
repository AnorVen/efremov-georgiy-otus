import React, {Component, memo} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {createSelector} from 'reselect';
import {Text, View} from 'react-native';

const HeaderContent = styled.View`
  height: 50px;
  background-color: #858585;
`;
const Wrapper = styled.View`
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
  padding-left: 50px;
  padding-right: 50px;
  justify-content: space-between;
  align-items: flex-start;
`;
const FlexRow = styled.View`
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
          <Text>Header</Text>
          <FlexRow>
            <Text onPress={() => this.props.navigator.navigate('Main')}>
              Home
            </Text>
            <Text onPress={() => this.props.navigator.navigate('/Login')}>
              Auth
            </Text>
            <Text onPress={() => this.props.navigator.navigate('/explore')}>
              Explore
            </Text>
            <Text onPress={() => this.props.navigator.navigate('/profile')}>
              Profile
            </Text>
          </FlexRow>
        </Wrapper>
      </HeaderContent>
    );
  }
}

export default connect(
  state => {
    return {};
  },
  dispatch => {
    return {};
  },
)(memo(Header));
