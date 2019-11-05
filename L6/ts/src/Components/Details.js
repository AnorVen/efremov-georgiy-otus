import React, { Component, Fragment, memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createSelector } from 'reselect';
const Wrap = styled.div`
  width: 50%;
  padding: 0 30px;
  background-color: #b3a5ff;
`;

const Details = ({ isLoad, result, error }) => {
  console.log('Details render');
  console.log(result);
  const rend = () => {
    if (isLoad) {
      return <p> Загрузка...</p>;
    }
    if (error) {
      return <p>{error}</p>;
    }
    if (!result.list) {
      return <p>выберите город</p>;
    } else {
      let tempData = result.list.slice(-8);
      return (
        <Fragment>
          <p> {result.city && result.city.name}</p>
          <table>
            <tbody>
              {tempData &&
                tempData.map((item) => (
                  <tr key={item.dt}>
                    <td>{item.dt_txt}</td>
                    <td>{item.main.temp} *C</td>
                    <td>{item.weather[0].description}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Fragment>
      );
    }
  };
  return <Wrap>{rend()}</Wrap>;
};

Details.defaultProps = {
  isLoad: false,
  result: {
    city: {
      name: '',
    },
    list: [
      {
        dt: Date.now(),
        dt_txt: new Date(Date.now()),
        main: { temp: 0 },
        weather: [{ description: '' }],
      },
      {
        dt: Date.now(),
        dt_txt: new Date(Date.now()),
        main: { temp: 0 },
        weather: [{ description: '' }],
      },
      {
        dt: Date.now(),
        dt_txt: new Date(Date.now()),
        main: { temp: 0 },
        weather: [{ description: '' }],
      },
      {
        dt: Date.now(),
        dt_txt: new Date(Date.now()),
        main: { temp: 0 },
        weather: [{ description: '' }],
      },
      {
        dt: Date.now(),
        dt_txt: new Date(Date.now()),
        main: { temp: 0 },
        weather: [{ description: '' }],
      },
      {
        dt: Date.now(),
        dt_txt: new Date(Date.now()),
        main: { temp: 0 },
        weather: [{ description: '' }],
      },
      {
        dt: Date.now(),
        dt_txt: new Date(Date.now()),
        main: { temp: 0 },
        weather: [{ description: '' }],
      },
      {
        dt: Date.now(),
        dt_txt: new Date(Date.now()),
        main: { temp: 0 },
        weather: [{ description: '' }],
      },
    ],
  },
  error: '',
};
Details.propTypes = {
  isLoad: PropTypes.bool,
  error: PropTypes.string,
  result: PropTypes.shape({
    city: PropTypes.shape({
      name: PropTypes.string,
    }),
    list: PropTypes.array,
  }),
};

const resultSelect = createSelector(
  (state) => state.getDetails.result,
  (result) => result
);
const errorSelect = createSelector(
  (state) => state.getDetails.error,
  (error) => error
);
const isLoadSelect = createSelector(
  (state) => state.getDetails.loading,
  (isLoad) => isLoad
);
export default connect((state) => {
  return {
    isLoad: isLoadSelect(state),
    result: resultSelect(state),
    error: errorSelect(state),
  };
})(memo(Details));
