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
import {
  TextInput,
  View,
  Button,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../Containers/Header';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e2e2e2',
    height: '100%',
  },
  PreveiwImage: {
    maxWidth: 150,
    height: 'auto',
    paddingTop: 20,
    paddingBottom: 20,
  },
  DragZone: {
    height: 100,
    width: '100%',
    backgroundColor: 'green',
    marginTop: 10,
    marginBottom: 10,
  },
  Ava: {
    width: 150,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

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

  logoutHandler = () => {
    this.props.logout();
  };
  passwordHandlerInput = pass => {
    this.setState({
      newPassword: pass,
    });
  };
  passwordHandler = () => {
    this.props.changePassword(this.state.newPassword);
  };
  emailHandlerInput = text => {
    this.setState({
      email: text,
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

  inputNameHandler = text => {
    this.setState({
      displayName: text,
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
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Header {...this.props} />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View>
              <Text>{displayName || 'anonim'}</Text>
              <TextInput
                style={{backgroundColor: '#fff', margin: 5}}
                value={this.state.displayName}
                onChangeText={name => this.inputNameHandler(name)}
              />
              <Button
                onPress={() => this.btnNameHandler()}
                title="set userName"
              />
            </View>
            <View>
              {photoURL && (
                <Image source={photoURL} alt="" style={styles.Ava} />
              )}
            </View>

            {(!photoURL || !!isEdit) && (
              <>
                <View>
                  <Text htmlFor="loadFile">выбирите файл для загрузки</Text>

                  {/*    <TextInput
                   style={{backgroundColor: '#fff', margin: 5,}}
                      accept="image/*"
                      type="file"
                      ref={this.fileInput}
                      onChange={() => this.fileHandler()}
                    />
                    */}
                </View>
                <View
                  style={styles.DragZone}
                  onDrop={e => this.dragHandler(e)}
                  onDragOver={e => this.dragHandler(e)}>
                  <Text>место для драг енд дропа</Text>
                </View>
                <View>
                  {!!this.state.fileDataReader && (
                    <Image
                      style={styles.PreveiwImage}
                      source={this.state.fileDataReader}
                      alt=""
                    />
                  )}

                  <Button
                    onPress={() => this.choseAvaHandler(uid)}
                    title=" выбрать в качестве аватара"
                  />
                </View>
              </>
            )}
            <View>
              {!!email && <Text>{email}</Text>}
              <TextInput
                style={{backgroundColor: '#fff', margin: 5}}
                value={this.state.email}
                onChangeText={email => this.emailHandlerInput(email)}
              />
              <Button
                onPress={() => {
                  this.emailHandler();
                }}
                title="change email"
              />
              <TextInput
                type="password"
                style={{backgroundColor: '#fff', margin: 5}}
                value={this.state.newPassword}
                onChangeText={pass => this.passwordHandlerInput(pass)}
              />
              <Button
                onPress={() => this.passwordHandler()}
                title=" change pass"
              />
              <Text>last sing in {metadata.lastSignInTime}</Text>
              {!!about && <Text>{about}</Text>}
              <TextInput
                style={{backgroundColor: '#fff', margin: 5}}
                name="about"
                id=""
                cols="30"
                rows="10"
                value={this.state.about}
                onChange={text => this.aboutInputHandler(text)}
              />
              {/* <Button onPress={() => this.aboutHandler()} title="save about"/>
              <Button onPress={() => this.editBtnHandler()}
              title="edit"/>

              <Button
                onPress={() => {
                  this.logoutHandler();
                }}
                title="logout"
              />
              <Button
                onPress={() => {
                  this.deleteUserHandler();
                }}
                title="delete User"
              />*/}
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
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
