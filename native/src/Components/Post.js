import React, {Component} from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import {deletePost, likeAdd, likeDelete} from '../Actions/posts';
import {Image, View, Text, FlatList, Button} from 'react-native';

const PostImage = styled.Image`
  max-width: 300px;
  height: auto;
  display: block;
  padding: 20px 0;
`;
const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  max-width: 100%;
  padding-bottom: 20px;
`;
const Name = styled.Text`
  background-color: yellow;
`;

class Post extends Component {
  state = {
    likeFlag: false,
  };
  deletePostHandler = () => {
    this.props.deletePost(this.props.id);
  };
  likesAddHandler = () => {
    this.setState({
      likeFlag: true,
    });
    this.props.likeAdd({
      id: this.props.id,
    });
  };
  likeDeleteHandler = () => {
    this.setState({
      likeFlag: false,
    });
    this.props.likeDelete({
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
      userData = {},
      posts,
    } = this.props;
    const {likes = {}} = posts;

    const newLikes = [];
    if (Object.keys(likes).length) {
      for (let [key, value] of Object.entries(likes)) {
        if (key === id) {
          newLikes.push({
            id: key,
            uid: Object.keys(value)[0],
            name: Object.values(value)[0],
          });
          if (
            Object.keys(value)[0] === userData.user.uid &&
            !this.state.likeFlag
          ) {
            this.setState({
              likeFlag: true,
            });
          }
        }
      }
    }
    console.log(newLikes);
    return (
      <Wrapper>
        <Text>
          {date &&
            `${new Date(date).toLocaleDateString()} ${new Date(
              date,
            ).getHours()}:${new Date(date).getMinutes()}`}
        </Text>
        {name && <Name>{name}</Name>}
        {!fileUrl && fileRead && <PostImage src={fileRead} alt="" />}
        {fileUrl && <PostImage src={fileUrl} alt="" />}
        <Text>{text && text}</Text>
        <Text>likes: {newLikes.length}</Text>
        {this.state.likeFlag ? (
          <Button onPress={() => this.likeDeleteHandler()} title="-" />
        ) : (
          <Button onPress={() => this.likesAddHandler()} title="+" />
        )}

        {!!newLikes.length && (
          <FlatList
            data={newLikes}
            renderItem={({item}) => <Text key={item}>{item.name}</Text>}
            keyExtractor={item => item.id}
          />
        )}
        {userData.user.uid === uid && (
          <Button
            onPress={() => this.deletePostHandler()}
            title="delete post"
          />
        )}
      </Wrapper>
    );
  }
}

export default connect(
  state => {
    return {
      userData: state.user,
      posts: state.posts,
    };
  },
  dispatch => {
    return {
      deletePost: post => dispatch(deletePost(post)),
      likeAdd: like => dispatch(likeAdd(like)),
      likeDelete: like => dispatch(likeDelete(like)),
    };
  },
)(Post);
