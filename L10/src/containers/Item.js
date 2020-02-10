import {Button, Keyboard, StyleSheet, Text, TextInput, View} from "react-native";
import React from 'react'
import CheckBox from 'react-native-check-box'

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
})


class Item extends React.Component {
  state = {
    edit: false,
    name: this.props.item.name,
    withOne: this.props.item.withOne
  }

  editGuest = () => {
    const {withOne, name} = this.state;
    this.setState({
      edit: false
    }, ()=>this.props.editGuest({withOne, name, id: this.props.item.id}))
  }
  deleteGuest = ()=>{
    this.props.deleteGuest(this.props.item.id)
  }


  checkBoxHandler = ()=>{
    const {withOne} = this.state;
    this.setState({
      withOne: !withOne
    }, ()=>this.props.editGuest({
      withOne: this.state.withOne,
      name: this.state.name,
      id: this.props.item.id
    }))
  }

  keyboardDidHide= () =>{
    console.log(this.state.name)
    if (!!this.state.name) {
      this.editGuest()
    } else {
      this.deleteGuest()
    }
  }


  deleteGuest = ()=>{
    this.props.deleteGuest(this.props.item.id)
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  };
  componentWillUnmount(): void {
    this.keyboardDidHideListener.remove();
  }

  render() {
    return (
      <>
        {this.state.edit
          ? (<View>
            <TextInput style={styles.title}
                       value={this.state.name}
                       onChangeText={(text) => {
                         this.setState({
                           name: text
                         })
                       }}
                       onSubmitEditing={Keyboard.dismiss}
            />
            <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={()=>{
                this.setState({
                  withOne:!this.state.withOne
                })
              }}
              isChecked={this.state.withOne}
              leftText={"With One"}
            />
          </View>)
          : (<View style={styles.item}
                   onLongPress={() => {
                     this.setState({edit: true})
                   }}>
            <Text style={styles.title}
                  onLongPress={() => {
                    this.setState({edit: true})
                  }}>{this.state.name}</Text>
            <CheckBox
              style={{flex: 1, padding: 10}}
              onClick={()=>this.checkBoxHandler()}
              isChecked={this.state.withOne}
              leftText={"With One"}
            />
            <Button style={styles.title}
                    onPress={() => this.deleteGuest()} title={'Delete'}/>
          </View>)
        }
      </>
    )
  }
};
export default Item
