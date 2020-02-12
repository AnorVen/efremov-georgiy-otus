import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { showFavorites } from '../Actions/posts';

const Wrap = styled.div`
  background-color: #33ffa3;
  display: flex;
  justify-content: center;
  padding: 30px;
`;

const FavoriteTogler = ({ favorite, toggleFavorites }) => {
  const [checked, changeCheck] = useState(favorite.show);

  useEffect(() => {
    toggleFavorites(checked);
  }, [checked]);
  return favorite.favorites.length ? (
    <Wrap>
      показать избанное{' '}
      <input
        type='checkbox'
        checked={checked}
        onChange={() => changeCheck(!checked)}
      />
    </Wrap>
  ) : (
    <></>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFavorites: (bool) => dispatch(showFavorites(bool)),
  };
};

const mapStateToProps = (store) => {
  return {
    favorite: store.favorites,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteTogler);
