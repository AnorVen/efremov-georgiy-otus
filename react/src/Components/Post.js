import React from 'react';
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
const Post = (props) => {
  console.log(props);
  return (
    <Wrapper>
      <p>
        {props.date &&
          `${new Date(props.date).toLocaleDateString()} ${new Date(
            props.date
          ).getHours()}:${new Date(props.date).getMinutes()}`}
      </p>
      {props.file && <PostImage src={props.file} alt='' />}
      <p>{props.text && props.text}</p>
    </Wrapper>
  );
};

export default Post;
