import list from '../city.tsx';
import { GET_LIST } from '../Constats';

const initialState = [];
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LIST:
      return (state = list);
    default:
      return state;
  }
}
