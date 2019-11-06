import {IS_FAVORITE } from '../Constats'

const initialState = [];
export default function(state = initialState, action) {
  switch (action.type) {
    case IS_FAVORITE:
      let newState = []
      if(state.indexOf(action.payload) !== -1){
       newState = state.filter(item=>item !== action.payload)
      } else {
        newState = [...state, action.payload]
      }
      return newState;
    default:
      return state;
  }
}
