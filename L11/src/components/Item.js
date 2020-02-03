import React from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {connect} from 'react-redux'
import {editGuest, removeGuest} from "../actions/guestsActions";

class Item extends React.Component {
  state = {
    edit: false,
    name: this.props.item.name,
    withOne: this.props.item.withOne
  }

  editHandler = () => {
    const {withOne, name} = this.state;
    this.props.editGuest({withOne, name, id: this.props.item.id})
    this.setState({
      edit: false
    })
  }

  render(){
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
                       }}/>
            <Button style={styles.title}
                    onPress={() => {
                      this.setState({
                        withOne: !this.state.withOne
                      })
                    }}
                    title={this.state.withOne
                      ? 'с парой'
                      : 'без пары'}/>
            <Button style={styles.title}
                    onPress={() => this.editHandler()} title={'Применить'}/>
          </View>)
          : (<View style={styles.item}
                   onLongPress={() => {
                     this.setState({edit: true})
                   }}>
            <Text style={styles.title}
                  onLongPress={() => {
                    this.setState({edit: true})
                  }}>{this.state.name}</Text>
            <Text style={styles.title}
                  onLongPress={() => {
                    this.setState({edit: true})
                  }}
            >{
              this.state.withOne
                ? 'с парой'
                : 'без пары'}
            </Text>
          </View>)
        }
      </>
    )
  }
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
  },
});

const mapStateToProps = store => {
}
const mapDispatchToProps = dispatch => {
  return {
    editGuest: guest => (guest.name
      ? dispatch(editGuest(guest))
      : dispatch(removeGuest(guest)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
