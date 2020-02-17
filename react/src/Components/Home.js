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
    if (posts.posts) {
      for (let [key, value] of Object.entries(posts.posts)) {
        console.log(key);
        console.log(value);
        value.id = key;
        renderPost.push(value);
        console.log(333, renderPost);
      }
    }
    renderPost = renderPost.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else if (a.date > b.date) {
        return -1;
      }
      return 0;
    });
    console.log(444, renderPost);

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
