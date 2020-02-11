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
    return (
      <Wrap>
        <NewPost />
        {posts &&
          posts.posts.map((item, i) => {
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
