import React, {Component} from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import NewPost from './NewPost';
import Post from './Post';
import {View} from 'react-native';

const Wrap = styled.View`
  width: 50%;
  padding: 0 30px;
  background-color: #b3a5ff;
`;

class Home extends Component {
  render() {
    const {posts} = this.props;
    let renderPost = [];
    if (posts.posts) {
      for (let [key, value] of Object.entries(posts.posts)) {
        value.id = key;
        renderPost.push(value);
      }
    }
    renderPost = renderPost.sort((a, b) => b.date - a.date);

    return (
      <Wrap>
        <NewPost />
        {renderPost &&
          renderPost.map((item, i) => {
            return <Post key={item.date} {...item} />;
          })}
      </Wrap>
    );
  }
}

export default connect(
  state => {
    return {
      posts: state.posts,
    };
  },
  dispatch => {
    return {};
  },
)(Home);
