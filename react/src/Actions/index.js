import {
  GET_DETAILS_REQUEST,
  GET_DATE,
  GET_CITY,
  DETAILS,
  ERROR_REQUEST,
  GET_LIST,
  TARGET_COUNTRY,
  IS_FAVORITE,
  SHOW_FAVORITE,
  ADD_POST,
} from '../Constats';

const apiKey = '108aecd085c5e10a193fa4d7440ba5cb';

export const showFavorites = (bool) => ({
  type: SHOW_FAVORITE,
  payload: bool,
});

export const handleFavorites = (id) => ({
  type: IS_FAVORITE,
  payload: id,
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
  const url = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&cnt=${date}&lang=ru&units=metric&appid=${apiKey}`;
  dispatch(getDetailsREQUESTAction());
  let storage = JSON.parse(localStorage.getItem(`${id}_${date}`));
  if (storage) {
    console.log('storage', storage);
    dispatch(itemsFetchDataSuccess(storage.result));
    return;
  }

  fetch(url)
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
      let lS = JSON.stringify({
        id,
        date,
        result: items,
      });
      localStorage.setItem(`${id}_${date}`, lS);
      dispatch(itemsFetchDataSuccess(items));
    })
    .catch((e) => dispatch(itemsHasErrored(e)));
};

export const addPost = (post) => ({
  type: ADD_POST,
  payload: post,
});
