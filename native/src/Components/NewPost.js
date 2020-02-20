import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addPost} from '../Actions/posts';
import styled from 'styled-components/native';
import {Text, TextInput, View, Image} from 'react-native';

const PreveiwImage = styled.Image`
  max-width: 300px;
  height: auto;
  display: block;
  padding: 20px 0;
`;
const DragZone = styled.View`
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
    fileRead: '',
    length: 0,
  };

  newPostHandler = text => {
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
        this.setState({
          file: this.fileInput.current.files[0],
          fileRead: reader.result,
        });
      };
      reader.onerror = function(event) {
        console.error(
          'Файл не может быть прочитан! код ' + event.target.error.code,
        );
      };
    }
  };
  dragHandler = e => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      let reader = new FileReader();
      reader.readAsDataURL(e.dataTransfer.files[0]);
      reader.onload = () => {
        this.setState({
          file: this.fileInput.current.files[0],
          fileRead: reader.result,
        });
      };
      reader.onerror = function(event) {
        console.error(
          'Файл не может быть прочитан! код ' + event.target.error.code,
        );
      };
    }
  };
  btnHandler = () => {
    if (!!this.state.text || !!this.state.file) {
      this.props.newPost({
        text: this.state.text || null,
        file: this.state.file || null,
        fileRead: this.state.fileRead || null,
        date: Date.now(),
      });
      this.setState({
        text: '',
        file: '',
        fileRead: '',
        length: 0,
        likes: [],
      });
    }
  };
  render() {
    return (
      <View>
        <Text>{this.state.length}</Text>
        <View>
          <TextInput
            value={this.state.text}
            name="newPost"
            id="newPost"
            onChange={text => this.newPostHandler(text)}
          />
        </View>
        <View>
          <Text htmlFor="loadFile">выбирите файл для загрузки</Text>
          <TextInput
            id={'loadFile'}
            accept="image/*"
            type="file"
            ref={this.fileInput}
            onChange={() => this.fileHandler()}
          />
        </View>
        <DragZone
          onDrop={e => this.dragHandler(e)}
          onDragOver={e => this.dragHandler(e)}>
          место для драг енд дропа
        </DragZone>

        {this.state.fileRead && (
          <PreveiwImage src={this.state.fileRead} alt="" />
        )}

        <button onClick={() => this.btnHandler()}>Add new post</button>
      </View>
    );
  }
}

export default connect(
  state => {
    return {};
  },
  dispatch => {
    return {
      newPost: post => dispatch(addPost(post)),
    };
  },
)(NewPost);
