import React, {Component, memo} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {createSelector} from 'reselect';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  HeaderContent: {
    padding: 10,
    backgroundColor: '#858585',
  },
  Wrapper: {
    display: 'flex',
    maxWidth: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  FlexRow: {
    paddingTop: 10,
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
});

class Header extends Component {
  render() {
    console.log('Header render');
    return (
      <View style={styles.HeaderContent}>
        <View style={styles.Wrapper}>
          <Text>Header</Text>
          <View style={styles.FlexRow}>
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
          </View>
        </View>
      </View>
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
