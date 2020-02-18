import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers, addToFriends, loadFriendsPosts } from '../Actions/users';
import Post from '../Components/Post';
import styled from 'styled-components';

const FriendsBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;
const FriendsItem = styled.div`
  width: 150px;
  padding-bottom: 30px;
  padding-left: 10px;
  padding-right: 10px;
`;
const FriendsPostsList = styled.div`
  width: 300px;
  padding-bottom: 30px;
  border-bottom: 1px solid red;
`;
class Explore extends Component {
  componentDidMount() {}

  addToFriendsHandler = (friend) => {
    this.props.addToFriends(friend);
  };
  render() {
    const {
      friends = {},
      allUsersList = {},
      friendsPosts = {},
    } = this.props.userData;
    let allUsersListArr = [];
    let friendsArr = [];
    let friendsPostsArr = [];
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
    if (Object.keys(friendsPosts).length) {
      for (let [key, val] of Object.entries(friendsPosts)) {
        val.uid = key;
        friendsPostsArr.push(val);
      }
    }
    const renderFriends = () => {
      if (friendsArr.length) {
        return (
          <FriendsBlock>
            {friendsArr.map((item) => (
              <FriendsItem key={item.uid}>
                <p>{item.displayName || 'anonim'}</p>
                <img width={150} src={item.photoURL || ''} alt='' />
              </FriendsItem>
            ))}

            {/* {friendsArr.map((item) => (
            <Post {...item} />
          ))}*/}
            <FriendsPostsList>
              {friendsPostsArr.map((item) => (
                <Post {...item} />
              ))}
            </FriendsPostsList>
          </FriendsBlock>
        );
      }
    };

    return (
      <div>
        friends list
        <FriendsBlock>
          {allUsersListArr.map((item) => (
            <FriendsItem key={item.uid}>
              <p>{item.displayName}</p>
              <img width={150} src={item.photoURL} alt='' />
              <br />
              <button onClick={() => this.addToFriendsHandler(item)}>
                add to friends
              </button>
            </FriendsItem>
          ))}
        </FriendsBlock>
        <p>my friends</p>
        {renderFriends()}
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
