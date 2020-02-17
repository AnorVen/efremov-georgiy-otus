import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers, addToFriends, loadFriendsPosts } from '../Actions/users';
import Post from '../Components/Post';
class Explore extends Component {
  componentDidMount() {}

  addToFriendsHandler = (friend) => {
    this.props.addToFriends(friend);
  };
  render() {
    const { friends = {}, allUsersList = {} } = this.props.userData;
    let allUsersListArr = [];
    let friendsArr = [];
    if (Object.keys(allUsersList).length) {
      for (let [key, val] of Object.entries(allUsersList)) {
        val.uid = key;
        if (key !== this.props.userData.user.uid) {
          allUsersListArr.push(val);
        }
      }
    }
    if (Object.keys(friends).length) {
      for (let [key, val] of Object.entries(friends)) {
        val.uid = key;
        friendsArr.push(val);
      }
    }
    console.log(allUsersList);
    if (friendsArr.length) {
      return (
        <div>
          {friendsArr.map((item) => (
            <Post {...item} />
          ))}
        </div>
      );
    }
    return (
      <div>
        friends list
        <div>
          {allUsersListArr.map((item) => (
            <div key={item.uid}>
              <p>{item.displayName}</p>
              <img width={150} src={item.photoURL} alt='' />
              <br />
              <button onClick={() => this.addToFriendsHandler(item)}>
                add to friends
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      userData: state.user,
    };
  },
  (dispatch) => {
    return {
      loadFriendsPosts: () => dispatch(loadFriendsPosts()),
      addToFriends: (friend) => dispatch(addToFriends(friend)),
    };
  }
)(Explore);
