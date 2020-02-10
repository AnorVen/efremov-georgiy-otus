import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

import {
  ADD_GUEST,
  EDIT_GUEST,
  REMOVE_GUEST,
  FETCHING_GUESTS,
  LOGIN,
  LOGOUT,
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_GOOGLE, SIGNING_IN_PROGRESS

} from "../constatns";

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
export const signingInProgress = () => ({
  type: SIGNING_IN_PROGRESS
})
export const loginWithEmailAction = (data) => ({
  type: LOGIN_WITH_EMAIL,
  payload: data
})
export const loginWithGoogleAction = () => ({
  type: LOGIN_WITH_GOOGLE
})

export const login = () => ({
  type: LOGIN
})

export const logout = () => ({
  type: LOGOUT
})


export const loginWithEmail = ({email, pass}) => (dispatch, getState) => {
  console.log(email, pass)
  let store = getState();
  console.log(store);
  dispatch(signingInProgress());

  const login = new Promise((resolve, reject) => {
    console.log('login')
    try {
      return auth().signInWithEmailAndPassword(email, pass);
    } catch (e) {
      console.log(e)
      return register()
    }
  })
  login.then(data=>console.log(data))
  const register = new Promise((resolve, reject) => {
    console.log('reg')
    try {
      return auth().createUserWithEmailAndPassword(email, pass);
    } catch (e) {
      console.error(e);
    }
  })
  register.then((data) => {
      console.log(data);
      login()
    }
  );

};

export const loginWithGoogle = () => (dispatch, getState) => {
  let store = getState();
  console.log(store);
  dispatch(signingInProgress());

}
