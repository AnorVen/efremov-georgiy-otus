import auth from 'firebase/auth';
import storage from 'firebase/storage';

import {
  DELETE_USER,
  EDIT_USER,
  ERROR_REQUEST_USER,
  LOAD_ALL_USERS,
  LOGIN,
  LOGOUT,
  REGISTER,
  REQUEST_USER,
} from '../Constats';

export const logout = () => ({
  type: LOGOUT,
});

export const login = ({ email, password }) => (dispatch, getState) => {
  let store = getState();
  auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  auth().onAuthStateChanged(function(user) {
    console.log(user);
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
};
export const createUser = ({ email, password }) => (dispatch, getState) => {
  let store = getState();
  auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  auth().onAuthStateChanged(function(user) {
    console.log(user);
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
};
