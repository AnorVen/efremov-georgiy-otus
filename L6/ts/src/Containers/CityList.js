import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { itemsFetchData, getCityIdAction } from '../Actions';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

const List = styled.ul`
  visibility: ${(p) => (p.show ? 'visible' : 'hidden')};
  opacity: ${(p) => (p.show ? 1 : 0)};
  height: ${(p) => (p.show ? 'auto' : 0)};
  ${(p) => p.css || null}
`;

class CityList extends Component {
  checkCity = (id) => {
    this.props.getCityId(id);
    this.props.getDetails();
  };

  static defaultProps = {
    cityId: 0,
    list: [[], []],
  };
  static propTypes = {
    cityId: PropTypes.number,
    list: PropTypes.array,
  };

  render() {
    console.log('CityList render');
    const { list } = this.props;
    return (
      <List show={this.props.targetCountry === list[0]}>
        {list[1].map((item, i) => (
          <li key={i} onClick={() => this.checkCity(item.id)}>
            {console.log(`CityList render ${item.title}`)}
            {item.title}
          </li>
        ))}
      </List>
    );
  }
}

const select = createSelector(
  (state) => state.getDetails.targetCountry,
  (targetCountry) => targetCountry
);

export default connect(
  (state) => {
    return {
      targetCountry: select(state),
    };
  },
  (dispatch) => {
    return {
      getDetails: () => {
        dispatch(itemsFetchData());
      },
      getCityId: (id) => {
        dispatch(getCityIdAction(id));
      },
    };
  }
)(CityList);
