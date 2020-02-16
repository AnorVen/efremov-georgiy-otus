import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NewPost from './NewPost';
import Post from './Post';

const Wrap = styled.div`
  width: 50%;
  padding: 0 30px;
  background-color: #b3a5ff;
`;

class Home extends Component {
  render() {
    const { posts } = this.props;
    console.log(this.props);
    let renderPost = [];
    for (let [key, value] of Object.entries(posts.post)) {
      value.id = key;
      renderPost.push(value);
    }
    console.log(renderPost);

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
  (state) => {
    return {
      posts: state.posts,
    };
  },
  (dispatch) => {
    return {};
  }
)(Home);
