import React, {Component} from 'react';
import {connect} from 'react-redux';
import {history} from '../Store';
import {
  createUser,
  currentUser,
  login,
  logout,
  updateUser,
  updateEmailUsers,
  deleteUser,
  choseAvaHandler,
  changePassword,
  updateUserAbout,
} from '../Actions/users';
import styled from 'styled-components/native';
import {TextInput, View, Button, Text} from 'react-native';

const PreveiwImage = styled.Image`
  max-width: 150px;
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

const Ava = styled.Image`
  width: 150px;
  display: block;
  padding: 0 20px;
`;

class Profile extends Component {
  constructor() {
    super();
    this.fileInput = React.createRef();
  }

  state = {
    newPassword: '',
    file: '',
    fileDataReader: '',
    isEdit: false,
    email: '',
    displayName: '',
    phoneNumber: '',
    about: '',
  };
  componentDidMount() {
    history.push('/auth');
  }

  logoutHandler = () => {
    this.props.logout();
  };
  passwordHandlerInput = e => {
    this.setState({
      newPassword: e.target.value,
    });
  };
  passwordHandler = () => {
    this.props.changePassword(this.state.newPassword);
  };
  emailHandlerInput = e => {
    this.setState({
      email: e.target.value,
    });
  };
  emailHandler = () => {
    this.props.updateEmailUsers(this.state.email);
  };

  fileHandler = () => {
    if (this.fileInput.current.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(this.fileInput.current.files[0]);
      reader.onload = () => {
        this.setState({
          file: this.fileInput.current.files[0],
          fileDataReader: reader.result,
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
          file: {
            ...this.fileInput.current.files[0],
            fileDataReader: reader.result,
          },
        });
      };
      reader.onerror = function(event) {
        console.error(
          'Файл не может быть прочитан! код ' + event.target.error.code,
        );
      };
    }
  };
  choseAvaHandler = uid => {
    if (this.state.file) {
      this.props.choseAvaHandler(this.state.file, uid);
    }
  };

  deleteUserHandler = () => {
    this.props.deleteUser();
  };

  inputNameHandler = e => {
    this.setState({
      displayName: e.target.value,
    });
  };
  btnNameHandler = () => {
    this.props.updateUser({displayName: this.state.displayName});
  };
  aboutInputHandler = e => {
    this.setState({
      about: e.target.value,
    });
  };
  aboutHandler = () => {
    this.props.updateUserAbout(this.state.about);
  };
  editBtnHandler = () => {
    this.setState({isEdit: true});
  };

  render() {
    const {isEdit} = this.state;
    const {user, about, error, loading} = this.props.userData;
    const {
      uid = 0,
      displayName = '',
      photoURL = '',
      email = '',
      phoneNumber = '',
      metadata = {},
    } = user;

    return (
      <View>
        {displayName && <p>{displayName}</p>}
        <TextInput
          type="text"
          value={this.state.displayName}
          onChange={name => this.inputNameHandler(name)}
        />
        <Button onClick={() => this.btnNameHandler()}>set userName</Button>

        {photoURL && <Ava src={photoURL} alt="" />}
        {(!photoURL || isEdit) && (
          <>
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

            {this.state.fileDataReader && (
              <PreveiwImage src={this.state.fileDataReader} alt="" />
            )}

            <Button onClick={() => this.choseAvaHandler(uid)}>
              выбрать в качестве аватара
            </Button>
          </>
        )}
        {email && <Text>{email}</Text>}
        <TextInput
          type="email"
          value={this.state.email}
          onChange={email => this.emailHandlerInput(email)}
        />
        <Button
          onClick={() => {
            this.emailHandler();
          }}>
          change email
        </Button>
        <br />
        <TextInput
          type="password"
          value={this.state.newPassword}
          onChange={pass => this.passwordHandlerInput(pass)}
        />
        <Button onClick={() => this.passwordHandler()}>change pass</Button>
        <Text>last sing in {metadata.lastSignInTime}</Text>
        {about && <p>{about}</p>}
        <TextInput
          name="about"
          id=""
          cols="30"
          rows="10"
          value={this.state.about}
          onChange={text => this.aboutInputHandler(text)}
        />

        <Button onClick={() => this.aboutHandler()}>save about</Button>
        {/*<button onClick={() => this.editBtnHandler()}>edit</button>*/}
        <Button
          onClick={() => {
            this.logoutHandler();
          }}>
          logout
        </Button>
        <Button
          onClick={() => {
            this.deleteUserHandler();
          }}>
          delete User
        </Button>
      </View>
    );
  }
}

export default connect(
  state => {
    return {
      userData: state.user,
    };
  },
  dispatch => {
    return {
      login: ({email, password}) => dispatch(login({email, password})),
      createUser: ({email, password}) =>
        dispatch(createUser({email, password})),
      logout: () => dispatch(logout()),
      currentUser: () => dispatch(currentUser()),
      deleteUser: () => dispatch(deleteUser()),
      choseAvaHandler: (avatarImg, uid) =>
        dispatch(choseAvaHandler(avatarImg, uid)),
      changePassword: newPassword => dispatch(changePassword(newPassword)),
      updateEmailUsers: email => dispatch(updateEmailUsers(email)),
      updateUser: data => dispatch(updateUser(data)),
      updateUserAbout: text => dispatch(updateUserAbout(text)),
    };
  },
)(Profile);
