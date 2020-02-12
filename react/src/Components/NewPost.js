import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../Actions/posts';
import styled from 'styled-components';

const PreveiwImage = styled.img`
  max-width: 300px;
  height: auto;
  display: block;
  padding: 20px 0;
`;
const DragZone = styled.div`
  height: 100px;
  width: 100%;
  background-color: green;
  margin: 10px 0;
`;
class NewPost extends Component {
  constructor() {
    super();
    this.fileInput = React.createRef();
  }
  state = {
    text: '',
    file: null,
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
  fileHandler = () => {
    if (this.fileInput.current.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(this.fileInput.current.files[0]);
      reader.onload = () => {
        this.setState({ file: reader.result });
      };
      reader.onerror = function(event) {
        console.error(
          'Файл не может быть прочитан! код ' + event.target.error.code
        );
      };
    }
  };
  dragHandler = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      let reader = new FileReader();
      reader.readAsDataURL(e.dataTransfer.files[0]);
      reader.onload = () => {
        this.setState({ file: reader.result });
      };
      reader.onerror = function(event) {
        console.error(
          'Файл не может быть прочитан! код ' + event.target.error.code
        );
      };
    }
  };
  btnHandler = () => {
    if (!!this.state.text || !!this.state.file) {
      this.props.newPost({
        text: this.state.text,
        file: this.state.file,
        date: Date.now(),
      });
      this.setState({
        text: '',
        file: '',
        length: 0,
      });
    }
  };
  render() {
    console.log(this.state);
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
        <label htmlFor='loadFile'>
          выбирите файл для загрузки
          <input
            id={'loadFile'}
            accept='image/*'
            type='file'
            ref={this.fileInput}
            onChange={() => this.fileHandler()}
          />
        </label>
        <DragZone
          onDrop={(e) => this.dragHandler(e)}
          onDragOver={(e) => this.dragHandler(e)}
        >
          место для драг енд дропа
        </DragZone>

        {this.state.file && <PreveiwImage src={this.state.file} alt='' />}

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
