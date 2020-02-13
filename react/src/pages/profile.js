import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createUser,
  currentUser,
  login,
  loginWithGoogle,
  logout,
  updateUser,
  updateEmailUsers,
  deleteUser,
  choseAvaHandler,
} from '../Actions/users';
import styled from 'styled-components';

const PreveiwImage = styled.img`
  max-width: 150px;
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

const Ava = styled.img`
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
  };
  logoutHandler = () => {
    this.props.logout();
  };
  passwordHandler = (e) => {
    this.setState({
      newPassword: e.target.value,
    });
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
        this.setState({
          file: {
            ...this.fileInput.current.files[0],
            fileDataReader: reader.result,
          },
        });
      };
      reader.onerror = function(event) {
        console.error(
          'Файл не может быть прочитан! код ' + event.target.error.code
        );
      };
    }
  };
  choseAvaHandler = (uid) => {
    console.log(uid);
    if (this.state.file) {
      this.props.choseAvaHandler(this.state.file, uid);
    }
  };

  render() {
    const { user } = this.props.userData;
    const {
      uid = 0,
      displayName = '',
      photoURL = '',
      email = '',
      phoneNumber = '',
      metadata = {},
    } = user;
    console.log(user);
    console.log(uid);
    return (
      <div>
        {photoURL && <Ava src={photoURL} alt='' />}
        {!photoURL && (
          <>
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

            {this.state.fileDataReader && (
              <PreveiwImage src={this.state.fileDataReader} alt='' />
            )}

            <button onClick={() => this.choseAvaHandler(uid)}>
              выбрать в качестве аватара
            </button>
          </>
        )}

        <p>{displayName}</p>
        <p>{email}</p>
        <input
          type='password'
          value={this.state.newPassword}
          onChange={(pass) => this.passwordHandler(pass)}
        />
        <p>last sing in {metadata.lastSignInTime}</p>
        <p>{user.about}</p>
        <button
          onClick={() => {
            this.logoutHandler();
          }}
        >
          logout
        </button>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      userData: state.user,
    };
  },
  (dispatch) => {
    return {
      login: ({ email, password }) => dispatch(login({ email, password })),
      createUser: ({ email, password }) =>
        dispatch(createUser({ email, password })),
      logout: () => dispatch(logout()),
      currentUser: () => dispatch(currentUser()),
      deleteUser: () => dispatch(deleteUser()),
      choseAvaHandler: (avatarImg, uid) =>
        dispatch(choseAvaHandler(avatarImg, uid)),
    };
  }
)(Profile);
