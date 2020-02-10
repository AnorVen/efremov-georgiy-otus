import {
  ADD_GUEST,
  EDIT_GUEST,
  FETCH_DONE, FETCH_ERROR,
  FETCHING_GUESTS,
  GUESTS_COUNTER,
  REMOVE_GUEST
} from "../constatns";

export const initialState = [
    {
      id: 0,
      name: 'Vasya',
      withOne: false
    },
    {
      id: 1,
      name: 'Petiya',
      withOne: true
    }];


export const guestReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_GUEST:
      const index = state.findIndex((item) => item.id === action.payload.id);
      const tempArr = [...state];
      tempArr[index] = {
        id: action.payload.id,
        name : action.payload.name,
        withOne: action.payload.withOne
      };
      return  [...tempArr];

    case ADD_GUEST:
      const newGuests = [...state];
      console.log(newGuests)
      newGuests.push(action.payload);
      console.log(newGuests)
      return [...newGuests];

    case REMOVE_GUEST:
      const indexRemove = state.findIndex((item) => item.id === action.payload);
      console.log(indexRemove)
      const tempArrRem = [...state];
      tempArrRem.splice(indexRemove, 1);
      console.log(tempArrRem)
      return [...tempArrRem];

    default:
      return state
  }
}
