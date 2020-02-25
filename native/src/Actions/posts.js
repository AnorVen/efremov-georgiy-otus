import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/storage';
import '@react-native-firebase/database';

import {ADD_POST, DELETE_POST, LIKE_POST, LOADING_POSTS} from '../Constats';

import {} from './users';

export const addPostAction = post => ({
  type: ADD_POST,
  payload: post,
});
export const loadAllPostsActiion = posts => ({
  type: LOADING_POSTS,
  payload: posts,
});

export const loadAllPost = () => (dispatch, getState) => {
  const {uid} = firebase.auth().currentUser;
  const starCountRef = firebase.database().ref(`user-posts/${uid}`);
  starCountRef.on('value', function(snapshot) {
    console.log(snapshot.val());
    dispatch(loadAllPostsActiion(snapshot.val()));
    //updateStarCount(postElement, snapshot.val());
  });
};

export const addPost = post => (dispatch, getState) => {
  const {uid, displayName} = firebase.auth().currentUser;

  const newPostKey = firebase
    .database()
    .ref()
    .child('posts')
    .push().key;

  dispatch(addPostAction({newPostKey: post}));
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
                  //dispatch(loadUserAboutAction(about));
                  // Data saved successfully!
                }
              });
          })
          .catch(error => console.log(error));
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
          console.error(error);
          //dispatch(errorRequestUser(error));
          // The write failed...
        } else {
          //dispatch(loadUserAboutAction(about));
          // Data saved successfully!
        }
      });
  }
};

export const deletePostAction = id => ({type: DELETE_POST, payload: id});
export const deletePost = id => (dispatch, getState) => {
  dispatch(deletePostAction(id));
  const {uid, displayName} = firebase.auth().currentUser;
  firebase
    .database()
    .ref('/posts/' + id)
    .remove();
  firebase
    .database()
    .ref('/user-posts/' + uid + '/' + id)
    .remove();
};

export const likeAction = like => ({type: LIKE_POST, payload: like});

export const fetchLike = () => (dispatch, getState) => {
  firebase
    .database()
    .ref('/likes/')
    .on('value', function(snapshot) {
      console.log(snapshot.val());
      dispatch(likeAction(snapshot.val()));
      //updateStarCount(postElement, snapshot.val());
    });
};
export const likeAdd = like => (dispatch, getState) => {
  dispatch(likeAction(like));
  let {uid, displayName = 'anonimLike'} = firebase.auth().currentUser;
  const {id} = like;
  if (!displayName) {
    displayName = 'anonimLike';
  }
  const likeToBD = {[uid]: displayName};
  const updates = {};
  updates['/likes/' + id] = likeToBD;
  firebase
    .database()
    .ref()
    .update(updates, function(error) {
      if (error) {
        console.error(error);
        //dispatch(errorRequestUser(error));
        // The write failed...
      } else {
        console.log(11213, likeToBD);
        //dispatch(loadUserAboutAction(about));
        // Data saved successfully!
      }
    });
};
export const likeDelete = like => (dispatch, getState) => {
  dispatch(likeAction(like));
  const {uid} = firebase.auth().currentUser;
  const {id} = like;
  firebase
    .database()
    .ref(`/likes/${id}/${uid}`)
    .remove();
};
