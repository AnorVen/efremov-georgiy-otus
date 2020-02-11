import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../Actions';
class NewPost extends Component {
  state = {
    text: '',
    imgLink: '',
    length: 0,
  };

  newPostHandler = (text) => {
    console.log(text.target.value.length);
    if (text.target.value && text.target.value.length <= 145) {
      this.setState({
        text: text.target.value,
        length: text.target.value.length,
      });
    }
  };
  fileHandler = (e) => {
    console.log(e.target);
    console.log(e.target.value);
  };
  btnHandler = () => {
    this.props.newPost({
      text: this.state.text,
      img: this.state.imgLink,
      date: Date.now(),
    });
    this.setState({
      text: '',
      imgLink: '',
      length: 0,
    });
  };
  render() {
    return (
      <div>
        {this.state.length}
        <div>
          <textarea
            value={this.state.text}
            name='newPost'
            id='newPost'
            cols='30'
            rows='5'
            onChange={(text) => this.newPostHandler(text)}
          />
        </div>
        <label
          htmlFor='loadFile'
          accept='image/*'
          onChange={(e) => this.fileHandler(e)}
        >
          выбирите файл для загрузки
          <input id={'loadFile'} type='file' />
        </label>

        <button onClick={() => this.btnHandler()}>Load new post</button>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {};
  },
  (dispatch) => {
    return {
      newPost: (post) => dispatch(addPost(post)),
    };
  }
)(NewPost);
