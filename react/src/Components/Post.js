import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deletePost, likeHandler } from '../Actions/posts';
const PostImage = styled.img`
  max-width: 300px;
  height: auto;
  display: block;
  padding: 20px 0;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  max-width: 100%;
  padding-bottom: 20px;
`;
const Name = styled.p`
  background-color: yellow;
`;

class Post extends Component {
  deletePostHandler = () => {
    this.props.deletePost(this.props.id);
  };
  likesHandler = () => {
    this.props.likeHandler({
      id: this.props.id,
    });
  };
  render() {
    const {
      name = null,
      id = null,
      uid = null,
      date = null,
      fileUrl = null,
      fileRead = null,
      text = null,
      likes = {},
      userData = {},
    } = this.props;
    const newLikes = [];
    if (Object.keys(likes).length) {
      for (let [uid, name] of Object.entries(likes)) {
        newLikes.push({ name, uid });
      }
    }

    return (
      <Wrapper>
        <p>
          {date &&
            `${new Date(date).toLocaleDateString()} ${new Date(
              date
            ).getHours()}:${new Date(date).getMinutes()}`}
        </p>
        {name && <Name>{name}</Name>}
        {!fileUrl && fileRead && <PostImage src={fileRead} alt='' />}
        {fileUrl && <PostImage src={fileUrl} alt='' />}
        <p>{text && text}</p>
        <p>likes: {newLikes.length}</p>
        <button onClick={() => this.likesHandler()}>+</button>
        {!!newLikes.length && (
          <ul>
            {newLikes.map((item) => (
              <li key={item}>{item.name}</li>
            ))}
          </ul>
        )}
        {userData.user.uid === uid && (
          <button onClick={() => this.deletePostHandler()}>delete post</button>
        )}
      </Wrapper>
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
      deletePost: (post) => dispatch(deletePost(post)),
      likeHandler: (like) => dispatch(likeHandler(like)),
    };
  }
)(Post);
