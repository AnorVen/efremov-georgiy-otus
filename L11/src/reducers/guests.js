import {
  ADD_GUEST,
  EDIT_GUEST,
  FETCH_DONE, FETCH_ERROR,
  FETCHING_GUESTS,
  GUESTS_COUNTER,
  REMOVE_GUEST
} from "../actions/constatns";

export const initialState = {
  guests: [
    {
      id: 0,
      name: 'Vasya',
      withOne: false
    },
    {
      id: 1,
      name: 'Petiya',
      withOne: true
    }],
  guestCounter: 3,
}

export const guestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GUESTS_COUNTER:
      const guestCounter = state.guests.reduce((previousValue, currentValue, index, array) => {
        let tempCount = 0;
        if (currentValue.name) {
          tempCount += 1
        }
        if (currentValue.withOne) {
          tempCount += 1
        }
        return tempCount + previousValue;
      }, 0);
      return {...state, guestCounter};

    case EDIT_GUEST:
      const index = this.props.guests.findIndex((item) => item.id === action.payload.id);
      const tempArr = [...this.state.guests];
      tempArr[index] = {
        id: action.payload.id,
        name : action.payload.name,
        withOne: action.payload.withOne
      };
      return {state, guests: tempArr};

    case ADD_GUEST:
      const newGuests = [...state.guests];
      newGuests.push(action.payload);
      return {...state, guests: newGuests};

    case REMOVE_GUEST:
      const indexRemove = this.props.guests.findIndex((item) => item.id === action.payload.id);
      const tempArrRem = [...this.state.guests];
      return {...state, guests: tempArrRem.splice(indexRemove, 1)};

    default:
      return state
  }
}
