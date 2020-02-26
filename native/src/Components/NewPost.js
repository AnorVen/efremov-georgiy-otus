import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addPost} from '../Actions/posts';
import {Text, TextInput, View, Button, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  preveiwImage: {
    maxWidth: 300,
    height: 'auto',
    padding: '20px 0',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  newPost: {
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
  },
});

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
    console.log(text);
    if (text && text.length <= 145) {
      this.setState({
        text: text,
        length: text.length,
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
    console.log(this.state.text);
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
        <View>
          <Text>{this.state.length}</Text>
        </View>
        <View>
          <TextInput
            value={this.state.text}
            style={styles.newPost}
            onChangeText={text => this.newPostHandler(text)}
            maxLength={145}
            multiline
            numberOfLines={4}
          />
        </View>
        <View>
          <Text>выбирите файл для загрузки</Text>
          <TextInput
            accept="image/*"
            type="file"
            ref={this.fileInput}
            onChange={() => this.fileHandler()}
          />
        </View>
        {!!this.state.fileRead && (
          <View>
            <Image
              style={styles.preveiwImage}
              source={this.state.fileRead}
              alt=""
            />
          </View>
        )}

        <View>
          <Button onPress={() => this.btnHandler()} title="Add new post" />
        </View>
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
