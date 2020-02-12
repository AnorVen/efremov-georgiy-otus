import React, { Component } from 'react';
import { connect } from 'react-redux';
import Country from '../Components/Country';
import CityList from './CityList';
import FavoriteTogler from './FavoriteTogler';
import { getListAction } from '../Actions/posts';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 50%;
  padding: 0 30px;
  background-color: #fff89f;
`;

class TargetList extends Component {
  constructor(props) {
    super(props);
    this.props.getList();
  }
  static defaultProps = {
    cityList: [
      {
        id: 519188,
        name: 'Novinki',
        country: 'RU',
      },
    ],
  };
  static propTypes = {
    cityList: PropTypes.array,
  };

  render() {
    console.log('TargetList render');
    let arrOut = {};
    this.props.cityList.forEach(function(value) {
      if (!arrOut[value.country]) {
        arrOut[value.country] = [];
      }
      arrOut[value.country].push({
        title: value.name,
        id: value.id,
      });
    });
    arrOut = Object.entries(arrOut).sort((item, nextItem) => {
      if (item[0] > nextItem[0]) {
        return 1;
      } else {
        return -1;
      }
    });

    return (
      <Wrap>
        <FavoriteTogler />
        {arrOut.map((item, i) => (
          <div key={i}>
            <Country title={item[0]} />
            <CityList list={item} />
          </div>
        ))}
      </Wrap>
    );
  }
}

export default connect(
  (state) => {
    return {
      cityList: state.cityList,
    };
  },
  (dispatch) => {
    return {
      getList: () => dispatch(getListAction()),
    };
  }
)(TargetList);
