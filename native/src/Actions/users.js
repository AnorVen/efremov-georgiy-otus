import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const provider = new firebase.auth.GoogleAuthProvider();

import {
  ADD_TO_FRIENDS,
  DELETE_USER,
  EDIT_USER,
  ERROR_REQUEST_USER,
  LOAD_ALL_USERS,
  LOAD_FRIENDS_POSTS,
  LOGIN,
  LOGOUT,
  REGISTER,
  REQUEST_USER,
  UPDATE_USER,
  USER_ABOUT,
} from '../Constats';

import {loadAllPost} from './posts';
import {
  removeToken,
  saveEmail,
  savePassword,
  saveToken,
} from '../utils/storage';

export const requestUser = () => ({
  type: REQUEST_USER,
});
export const errorRequestUser = error => ({
  type: ERROR_REQUEST_USER,
  payload: error,
});

export const loginAction = user => ({type: LOGIN, payload: user});

export const updateUserAction = user => ({
  type: UPDATE_USER,
  payload: user,
});
export const getAllUsersAction = allUsers => ({
  type: LOAD_ALL_USERS,
  payload: allUsers,
});

export const loadUserAboutAction = about => ({
  type: USER_ABOUT,
  payload: about,
});

export const addToFriendsAction = friend => ({
  type: ADD_TO_FRIENDS,
  payload: friend,
});

export const loadFriendsPostsAction = posts => ({
  type: LOAD_FRIENDS_POSTS,
  payload: posts,
});
export const logoutAction = () => ({
  type: LOGOUT,
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
      dispatch(loadUserAbout());
      dispatch(loadAllPost());
      dispatch(fetchFriends());
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
  removeToken();
  firebase
    .auth()
    .signOut()
    .then(function() {
      dispatch(logoutAction());
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
      dispatch(errorRequestUser(error));
    });
};

export const login = ({email, password}) => (dispatch, getState) => {
  saveToken({email, password});
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
      dispatch(fetchFriends());
    } else {
      // User is signed out.
      // ...
    }
  });
};
export const createUser = ({email, password}) => (dispatch, getState) => {
  saveToken({email, password});

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
      const store = getState();
      const {uid, displayName, photoURL} = firebase.auth().currentUser;
      let allUsers = store.user.allUsersList;
      allUsers[uid] = {
        displayName,
        photoURL,
      };
      dispatch(getAllUsersAction(allUsers));
      let updates = {};
      updates['/users/' + uid] = {
        uid,
        displayName,
        photoURL,
      };

      firebase
        .database()
        .ref()
        .update(updates, function(error) {
          if (error) {
            console.error(error);
            //dispatch(errorRequestUser(error));
            // The write failed...
          } else {
            //dispatch(loadUserAboutAction(about));
            // Data saved successfully!
          }
        });
    } else {
      // User is signed out.
      // ...
    }
  });
};

export const updateUser = data => (dispatch, getState) => {
  dispatch(requestUser());
  const user = firebase.auth().currentUser;

  user
    .updateProfile(data)
    .then(function() {
      dispatch(updateUserAction(user));
      // Update successful.
    })
    .catch(function(error) {
      dispatch(errorRequestUser(error));
      // An error happened.
    });
};

export const updateEmailUsers = email => (dispatch, getState) => {
  const user = firebase.auth().currentUser;
  dispatch(requestUser());
  user
    .updateEmail(email)
    .then(function() {
      // Update successful.
      saveEmail(email);
      dispatch(reAuthenticate(user));
    })
    .catch(function(error) {
      dispatch(errorRequestUser(error));
      // An error happened.
    });
};
export const changePassword = newPassword => (dispatch, getState) => {
  const user = firebase.auth().currentUser;
  dispatch(requestUser());
  user
    .updatePassword(newPassword)
    .then(function() {
      // Update successful.
      savePassword(newPassword);
      dispatch(reAuthenticate(user));
    })
    .catch(function(error) {
      dispatch(errorRequestUser(error));
      // An error happened.
    });
};
export const reAuthenticate = user => (dispatch, getState) => {
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
  removeToken();
  user
    .delete()
    .then(function() {
      dispatch(logoutAction());
      // User deleted.
    })
    .catch(function(error) {
      dispatch(errorRequestUser(error));
      // An error happened.
    });
};

export const choseAvaHandler = (avatarImg, uid) => (dispatch, getState) => {
  const storageRef = firebase.storage().ref();
  storageRef
    .child(`avatars/${uid}`)
    .put(avatarImg, avatarImg.metadata)
    .then(function(snapshot) {
      // Let's get a download URL for the file.
      snapshot.ref
        .getDownloadURL()
        .then(function(url) {
          dispatch(updateUser({photoURL: url}));
          // [START_EXCLUDE]
        })
        .catch(error => console.log(error));
    })
    .catch(function(error) {
      // [START onfailure]
      console.error('Upload failed:', error);
      // [END onfailure]
    });
};

export const updateUserAbout = about => (dispatch, getState) => {
  const userId = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref('usersAbout/' + userId)
    .set(
      {
        about,
      },
      function(error) {
        if (error) {
          dispatch(errorRequestUser(error));
          // The write failed...
        } else {
          dispatch(loadUserAboutAction(about));
          // Data saved successfully!
        }
      },
    );
};

export const loadUserAbout = () => (dispatch, getState) => {
  const userId = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref('/usersAbout/' + userId)
    .once('value')
    .then(function(snapshot) {
      const userAbout = (snapshot.val() && snapshot.val().about) || '';
      dispatch(loadUserAboutAction(userAbout));
    });
};

export const getAllUsers = () => (dispatch, getState) => {
  firebase
    .database()
    .ref('/users')
    .once('value')
    .then(function(snapshot) {
      const allUsers = (snapshot.val() && snapshot.val()) || {};
      dispatch(getAllUsersAction(allUsers));
    });
};

export const addToFriends = friend => (dispatch, getState) => {
  const friendUid = friend.uid;
  const userId = firebase.auth().currentUser.uid;
  dispatch(
    addToFriendsAction({
      [friendUid]: friend,
    }),
  );
  firebase
    .database()
    .ref('friends/' + userId)
    .update(
      {
        [friendUid]: friend,
      },
      function(error) {
        if (error) {
          dispatch(errorRequestUser(error));
          // The write failed...
        } else {
          // Data saved successfully!
        }
      },
    );
};

export const fetchFriends = () => (dispatch, getState) => {
  const userId = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref(`/friends/${userId}`)
    .once('value')
    .then(function(snapshot) {
      const allUsers = (snapshot.val() && snapshot.val()) || {};
      dispatch(addToFriendsAction(allUsers));
      dispatch(loadFriendsPosts());
    });
};

export const loadFriendsPosts = () => (dispatch, getState) => {
  const state = getState();

  const friends = state.user.friends;
  let friendsPosts = {};
  for (let [key, val] of Object.entries(friends)) {
    firebase
      .database()
      .ref(`/user-posts/${key}`)
      .once('value')
      .then(function(snapshot) {
        const friendsPostsLoaded = (snapshot.val() && snapshot.val()) || {};
        friendsPosts = {...friendsPosts, ...friendsPostsLoaded};
        dispatch(loadFriendsPostsAction(friendsPosts));
      });
  }
};
