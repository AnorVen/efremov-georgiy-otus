import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const provider = new firebase.auth.GoogleAuthProvider();

import {
  DELETE_USER,
  EDIT_USER,
  ERROR_REQUEST_USER,
  LOAD_ALL_USERS,
  LOGIN,
  LOGOUT,
  REGISTER,
  REQUEST_USER,
  UPDATE_USER,
  USER_ABOUT,
} from '../Constats';

import { loadAllPost } from './posts';

export const requestUser = () => ({
  type: REQUEST_USER,
});
export const errorRequestUser = (error) => ({
  type: ERROR_REQUEST_USER,
  payload: error,
});

export const loginAction = (user) => ({ type: LOGIN, payload: user });

export const updateUserAction = (user) => ({
  type: UPDATE_USER,
  payload: user,
});
export const getAllUsersAction = (allUsers) => ({
  type: LOAD_ALL_USERS,
  payload: allUsers,
});

export const loadUserAboutAction = (about) => ({
  type: USER_ABOUT,
  payload: about,
});

export const loginWithGoogle = () => (dispatch, getState) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      dispatch(loginAction(user));
      dispatch(loadAllPost());
      // ...
    })
    .catch(function(error) {
      dispatch(errorRequestUser(error));
    });
};

export const currentUser = () => (dispatch, getState) => {
  console.log(firebase.auth().currentUser);
};
export const logout = () => (dispatch, getState) => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log(`logout, user: ${firebase.auth().currentUser}`);
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
      dispatch(errorRequestUser(error));
    });
  return dispatch({ type: LOGOUT });
};

export const login = ({ email, password }) => (dispatch, getState) => {
  window.localStorage.setItem('email', email);
  window.localStorage.setItem('password', password);
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
    if (user) {
      dispatch(loginAction(user));
      dispatch(loadUserAbout());
      dispatch(loadAllPost());
    } else {
      // User is signed out.
      // ...
    }
  });
};
export const createUser = ({ email, password }) => (dispatch, getState) => {
  console.log('creacte');
  window.localStorage.setItem('email', email);
  window.localStorage.setItem('password', password);

  dispatch(requestUser());
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      dispatch(errorRequestUser(error));
    });
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      dispatch(loginAction(user));
    } else {
      // User is signed out.
      // ...
    }
  });
};

export const updateUser = (data) => (dispatch, getState) => {
  dispatch(requestUser());
  const user = firebase.auth().currentUser;

  user
    .updateProfile(data)
    .then(function() {
      console.log(user);
      dispatch(updateUserAction(user));
      // Update successful.
    })
    .catch(function(error) {
      dispatch(errorRequestUser(error));
      // An error happened.
    });
};

export const updateEmailUsers = (email) => (dispatch, getState) => {
  const user = firebase.auth().currentUser;
  dispatch(requestUser());
  user
    .updateEmail(email)
    .then(function() {
      // Update successful.
      window.localStorage.setItem('email', email);
      console.log(user);
      dispatch(reAuthenticate(user));
    })
    .catch(function(error) {
      dispatch(errorRequestUser(error));
      // An error happened.
    });
};
export const changePassword = (newPassword) => (dispatch, getState) => {
  const user = firebase.auth().currentUser;
  dispatch(requestUser());
  user
    .updatePassword(newPassword)
    .then(function() {
      // Update successful.
      console.log(user);
      window.localStorage.setItem('password', newPassword);
      dispatch(reAuthenticate(user));
    })
    .catch(function(error) {
      dispatch(errorRequestUser(error));
      // An error happened.
    });
};
export const reAuthenticate = (user) => (dispatch, getState) => {
  var credential;
  // Prompt the user to re-provide their sign-in credentials
  user
    .reauthenticateWithCredential(credential)
    .then(function() {
      // User re-authenticated.
    })
    .catch(function(error) {
      dispatch(errorRequestUser(error));
      // An error happened.
    });
};
export const deleteUser = () => (dispatch, getState) => {
  dispatch(requestUser());
  var user = firebase.auth().currentUser;
  window.localStorage.removeItem('email');
  window.localStorage.removeItem('password');
  user
    .delete()
    .then(function() {
      dispatch(logout());
      // User deleted.
    })
    .catch(function(error) {
      dispatch(errorRequestUser(error));
      // An error happened.
    });
};

export const choseAvaHandler = (avatarImg, uid) => (dispatch, getState) => {
  console.log(avatarImg);
  console.log(uid);
  const state = getState();
  const storageRef = firebase.storage().ref();
  storageRef
    .child(`avatars/${uid}`)
    .put(avatarImg, avatarImg.metadata)
    .then(function(snapshot) {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log('File metadata:', snapshot.metadata);
      // Let's get a download URL for the file.
      snapshot.ref
        .getDownloadURL()
        .then(function(url) {
          console.log('File available at', url);
          dispatch(updateUser({ photoURL: url }));
          // [START_EXCLUDE]
        })
        .catch((error) => console.log(error));
    })
    .catch(function(error) {
      // [START onfailure]
      console.error('Upload failed:', error);
      // [END onfailure]
    });
};

export const updateUserAbout = (about) => (dispatch, getState) => {
  console.log(about);
  const database = firebase.database();
  const userId = firebase.auth().currentUser.uid;
  database.ref('usersAbout/' + userId).set(
    {
      about,
    },
    function(error) {
      if (error) {
        dispatch(errorRequestUser(error));
        // The write failed...
      } else {
        console.log(111);
        dispatch(loadUserAboutAction(about));
        // Data saved successfully!
      }
    }
  );
};

export const loadUserAbout = () => (dispatch, getState) => {
  const userId = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref('/usersAbout/' + userId)
    .once('value')
    .then(function(snapshot) {
      console.log(123);
      const userAbout = (snapshot.val() && snapshot.val().about) || '';
      console.log(userAbout);
      dispatch(loadUserAboutAction(userAbout));
    });
};

export const getAllUsers = () => (dispatch, getState) => {
  firebase
    .database()
    .ref('/allWriters')
    .once('value')
    .then(function(snapshot) {
      const allUsers = (snapshot.val() && snapshot.val()) || [];
      console.log(allUsers);
      dispatch(getAllUsersAction(allUsers));
    });
};
