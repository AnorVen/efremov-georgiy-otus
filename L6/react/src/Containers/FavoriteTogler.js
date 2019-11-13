import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";

const Wrap = styled.div`
    background-color: #33ffa3;
    display: flex;
    justify-content: center;
    padding: 30px;
`


class FavoriteTogler extends Component {
  render() {
    return (
      <Wrap>
        показать избанное <input type="checkbox" onClick={this.props.toggleFavorites}/>
      </Wrap>
    );
  }
}

const mapDispatchToProps = (store) => {
  return {
    toggleFavorites: () => (console.log(111))
  }
}

const mapStateToProps = (store) => {
  return {
    favorite: store.
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteTogler);
