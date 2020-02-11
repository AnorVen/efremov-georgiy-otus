import React from 'react';

const Post = (props) => {
  console.log(props);
  return (
    <div>
      <p>{props.data && props.data}</p>
      <img src={props.img && props.img} alt='' />
      <p>{props.text && props.text}</p>
    </div>
  );
};

export default Post;
