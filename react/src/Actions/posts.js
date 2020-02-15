import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

import { ADD_POST } from '../Constats';

import {} from './users';
import { getAllUsersAction } from './users';

export const addPostAction = (post) => ({
  type: ADD_POST,
  payload: post,
});

export const addPost = (post) => (dispatch, getState) => {
  console.log(post);
  const store = getState();
  let allUsers = store.user.allUsersList;
  const database = firebase.database();
  const { uid, displayName } = firebase.auth().currentUser;
  console.log(allUsers);
  allUsers = new Set(allUsers);

  let newAllWriters = allUsers.add(uid);
  newAllWriters = Array.from(newAllWriters);
  database.ref('/allWriters/').set(
    {
      ...newAllWriters,
    },
    function(error) {
      if (error) {
        console.error(222, error);
        //dispatch(errorRequestUser(error));
        // The write failed...
      } else {
        dispatch(getAllUsersAction(newAllWriters));
        //dispatch(loadUserAboutAction(about));
        // Data saved successfully!
      }
    }
  );
  var newPostKey = firebase
    .database()
    .ref()
    .child('posts')
    .push().key;
  dispatch(addPostAction(post));
  post.uid = uid;
  post.name = displayName;
  var updates = {};
  updates['/posts/' + newPostKey] = post;
  updates['/user-posts/' + uid + '/' + newPostKey] = post;

  firebase
    .database()
    .ref()
    .update(updates, function(error) {
      if (error) {
        console.error(222, error);
        //dispatch(errorRequestUser(error));
        // The write failed...
      } else {
        dispatch(getAllUsersAction(newAllWriters));
        //dispatch(loadUserAboutAction(about));
        // Data saved successfully!
      }
    });
};
