import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

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

export const requestUser = () => ({
  type: REQUEST_USER,
});
export const errorRequestUser = (error) => ({
  type: ERROR_REQUEST_USER,
  payload: error,
});

export const currentUser = () => (dispatch, getState) => {
  console.log(firebase.auth().currentUser);
};
export const logout = () => (dispatch, getState) => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log(1);
      console.log(firebase.auth().currentUser);
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
      dispatch(errorRequestUser(error));
    });
  return dispatch({ type: LOGOUT });
};

export const login = ({ email, password }) => (dispatch, getState) => {
  console.log(email);
  console.log(password);
  dispatch(requestUser());
  let store = getState();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      dispatch(errorRequestUser(error));
    });
  firebase.auth().onAuthStateChanged(function(user) {
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
  console.log('creacte');
  let store = getState();
  dispatch(requestUser());
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      dispatch(errorRequestUser(error));
    });
  firebase.auth().onAuthStateChanged(function(user) {
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

export const updateUser = () => (dispatch, getState) => {
  dispatch(requestUser());
  var user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: 'Jane Q. User',
      photoURL: 'https://example.com/jane-q-user/profile.jpg',
    })
    .then(function() {
      // Update successful.
    })
    .catch(function(error) {
      dispatch(errorRequestUser(error));
      // An error happened.
    });
};

export const updateEmailUsers = () => (dispatch, getState) => {
  dispatch(requestUser());
  var user = firebase.auth().currentUser;

  user
    .updateEmail('user@example.com')
    .then(function() {
      // Update successful.
    })
    .catch(function(error) {
      dispatch(errorRequestUser(error));
      // An error happened.
    });
};
export const deleteUser = () => (dispatch, getState) => {
  dispatch(requestUser());
  var user = firebase.auth().currentUser;
  user
    .delete()
    .then(function() {
      // User deleted.
    })
    .catch(function(error) {
      dispatch(errorRequestUser(error));
      // An error happened.
    });
};
