import React, { Component } from 'react';
import styled from 'styled-components';

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
`;

class Post extends Component {
  render() {
    const {
      date = null,
      fileUrl = null,
      fileRead = null,
      text = null,
      likes = {},
    } = this.props;
    const newLikes = [];
    if (Object.keys(likes).length) {
      for (let [uid, name] of likes) {
        newLikes.push(name);
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
        {!fileUrl && fileRead && <PostImage src={fileRead} alt='' />}
        {fileUrl && <PostImage src={fileUrl} alt='' />}
        <p>{text && text}</p>
        <p>likes: {newLikes.length}</p>
        {!!newLikes.length && (
          <ul>
            {newLikes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </Wrapper>
    );
  }
}

export default Post;
