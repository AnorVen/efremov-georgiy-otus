import { IS_FAVORITE, SHOW_FAVORITE } from '../Constats';

const initialState = {
  show: false,
  favorites: [],
};
export default function(state = initialState, action) {
  switch (action.type) {
    case IS_FAVORITE:
      let newState = {};
      if (state.favorites.indexOf(action.payload) !== -1) {
        newState = {
          ...state,
          favorites: state.favorites.filter((item) => item !== action.payload),
        };
        if (!newState.favorites.length) {
          newState = { ...newState, show: false };
        }
      } else {
        newState = {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      }
      return newState;
    case SHOW_FAVORITE:
      return { ...state, show: action.payload };
    default:
      return state;
  }
}
