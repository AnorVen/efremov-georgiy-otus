import {
  ADD_GUEST,
  EDIT_GUEST,
  FETCH_DONE, FETCH_ERROR,
  FETCHING_GUESTS,
  GUESTS_COUNTER, LOGIN, LOGOUT,
  REMOVE_GUEST
} from "./constatns";

export const guestCounterHandler = () => ({
  type: GUESTS_COUNTER,
});

export const editGuest = (guest) => ({
  type: EDIT_GUEST,
  payload: guest
})

export const addGuest = (guest) => ({
  type: ADD_GUEST,
  payload: guest
})
export const removeGuest = (guest) => ({
  type: REMOVE_GUEST,
  payload: guest
})

export const fetchGuests = () => ({
  type: FETCHING_GUESTS
})

export const fetchDone = () => ({
  type: FETCH_DONE
})
export const fetchError = () => ({
  type: FETCH_ERROR
})
export const login = () => ({
  type: LOGIN
})
export const logout = () => ({
  type: LOGOUT
})
