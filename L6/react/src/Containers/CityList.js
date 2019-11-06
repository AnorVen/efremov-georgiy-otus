import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {itemsFetchData, getCityIdAction, handleFavorites} from '../Actions';
import PropTypes from 'prop-types';
import {createSelector} from 'reselect';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Btn = styled.button`
`


const List = styled.ul`
  visibility: ${(p) => (p.show ? 'visible' : 'hidden')};
  opacity: ${(p) => (p.show ? 1 : 0)};
  height: ${(p) => (p.show ? 'auto' : 0)};
  ${(p) => p.css || null}
`;

const Item = styled.li`
display: flex;
justify-content:space-between;
margin: 10px;
`

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
  handleFavorit = (id) => {
    this.props.handleFavorites(id)
  }

  render() {
    console.log('CityList render');
    const {list} = this.props;
    return (
      <List show={this.props.targetCountry === list[0]}>
        {list[1].map((item, i) => (
          <Item key={i} >
            <Link to={`/${item.title}`} onClick={() => this.checkCity(item.id)}>
              {console.log(`CityList render ${item.title}`)}
              {item.title}
            </Link>
            <Btn onClick={() => this.handleFavorit(item.id)}>
              { this.props.favoritesList.indexOf(item.id) !== -1
                ? 'remove from favorites' : 'add to favorit'}
            </Btn>
          </Item>
        ))}
      </List>
    );
  }
}

const selectTargetCountry = createSelector(
  (state) => state.getDetails.targetCountry,
  (targetCountry) => targetCountry
);
const selectFavorites = createSelector(
  (state) => state.favorites,
  (favoritesList) => favoritesList
);

export default connect(
  (state) => {
    return {
      targetCountry: selectTargetCountry(state),
      favoritesList : selectFavorites(state)
    };
  },
  (dispatch) => {
    return {
      handleFavorites: (id) => {
        dispatch(handleFavorites(id))
      },
      getDetails: () => {
        dispatch(itemsFetchData());
      },
      getCityId: (id) => {
        dispatch(getCityIdAction(id));
      },
    };
  }
)(CityList);
