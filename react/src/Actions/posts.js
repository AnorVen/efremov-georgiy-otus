import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

import { ADD_POST, LOADING_POSTS } from '../Constats';

import {} from './users';
import { getAllUsersAction } from './users';
import { updateUser } from './users';

export const addPostAction = (post) => ({
  type: ADD_POST,
  payload: post,
});
export const loadAllPostsActiion = (posts) => ({
  type: LOADING_POSTS,
  payload: posts,
});

export const loadAllPost = () => (dispatch, getState) => {
  const { uid } = firebase.auth().currentUser;
  const starCountRef = firebase.database().ref(`user-posts/${uid}`);
  starCountRef.on('value', function(snapshot) {
    console.log(snapshot.val());
    dispatch(loadAllPostsActiion(snapshot.val()));
    //updateStarCount(postElement, snapshot.val());
  });
};

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
  const newPostKey = firebase
    .database()
    .ref()
    .child('posts')
    .push().key;

  dispatch(addPostAction({ newPostKey: post }));
  post.uid = uid;
  post.name = displayName;
  let updates = {};
  if (post.file) {
    console.log(post.file);
    const storageRef = firebase.storage().ref();
    storageRef
      .child(`imgs/${post.date}_${post.file.name}`)
      .put(post.file, post.file.metadata)
      .then(function(snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log('File metadata:', snapshot.metadata);
        // Let's get a download URL for the file.
        snapshot.ref
          .getDownloadURL()
          .then(function(url) {
            console.log('File available at', url);
            post.fileUrl = url;
            post.fileRead = null;
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
          })
          .catch((error) => console.log(error));
      })
      .catch(function(error) {
        // [START onfailure]
        console.error('Upload failed:', error);
        // [END onfailure]
      });
  } else {
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
  }
};
