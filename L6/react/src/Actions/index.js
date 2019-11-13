import {
  GET_DETAILS_REQUEST,
  GET_DATE,
  GET_CITY,
  DETAILS,
  ERROR_REQUEST,
  GET_LIST,
  TARGET_COUNTRY,
  IS_FAVORITE
} from '../Constats';
import { createSelector } from 'reselect';

const apiKey = '108aecd085c5e10a193fa4d7440ba5cb';

export const handleFavorites = (id)=>({
  type: IS_FAVORITE,
  payload: id
});

export const getListAction = () => ({
  type: GET_LIST,
});

export const getCityIdAction = (id) => ({
  type: GET_CITY,
  payload: id,
});

export const getDetailsREQUESTAction = () => ({
  type: GET_DETAILS_REQUEST,
});

export const getDateAction = (date) => ({
  type: GET_DATE,
  payload: date,
});

export const changeTargenCountry = (country) => ({
  type: TARGET_COUNTRY,
  payload: country,
});

export const itemsFetchDataSuccess = (item) => ({
  type: DETAILS,
  payload: item,
});

export const itemsHasErrored = (message) => ({
  type: ERROR_REQUEST,
  payload: message,
});

let prevDate;
let prevId;
export const itemsFetchData = () => (dispatch, getState) => {
  let store = getState();
  console.log(store);

  let id = store.getDetails.cityId;
  if (!id) {
    return false;
  }
  let date = store.getDetails.date;
  date =
    date - Date.now() > 0 ? (new Date(date - Date.now()).getDate() + 1) * 8 : 8;
  console.log(id);
  console.log(date);
  if (prevId === id && prevDate === date) {
    return;
  }
  prevId = id;
  prevDate = date;

  dispatch(getDetailsREQUESTAction());
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=${id}&cnt=${date}&lang=ru&units=metric&appid=${apiKey}`
  )
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then((response) => {
      return response.json();
    })
    .then((items) => {
      dispatch(itemsFetchDataSuccess(items));
    })
    .catch((e) => dispatch(itemsHasErrored(e)));
};
