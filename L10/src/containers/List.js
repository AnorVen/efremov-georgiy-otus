import Item from './Item'
import {Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View,Keyboard} from "react-native";
import React, {Component} from 'react'

const styles = StyleSheet.create({
  btnGroup: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    flexDirection: 'row'
  },
  bntSort: {
    margin: 10,
    backgroundColor: 'yellow',
    display: 'flex',
    padding: 10,
    color: '#2b47fe'
  },
});

class List extends Component{

  state = {
    text: '',
    checkbox: false,
    edit: false,
    guestCounter: 0,
    filtredList: [],
    filter: 'all',
    guests: [
      {
        id: 0,
        name: 'Vasya',
        withOne: false
      },
      {
        id: 1,
        name: 'Petiya',
        withOne: true
      }]
  };


  guestCounterHandler = (guests) => guests.reduce((previousValue, currentValue, index, array) => {
      let tempCount = 0;
      if (currentValue.name) {
        tempCount += 1
      }
      if (currentValue.withOne) {
        tempCount += 1
      }
      return tempCount + previousValue;

    }, 0);

  onChangeText = (text) => {
    this.setState({
      text: text
    })
  };

  onBtnFilterHandler = (text) => {
    this.setState({
      filter: text
    })
  }

  editGuest =({withOne, name, id})=> {
    console.log(withOne, name, id)
    const index = this.state.guests.findIndex((item)=> item.id === id)
    const tempArr = [...this.state.guests];
    tempArr[index] =
      {
        id,
        name,
        withOne
      }

    this.setState({
      guests: tempArr
    })
  }
  deleteGuest = (id)=>{
    console.log(id)
    const index = this.state.guests.findIndex((item)=> item.id === id)
    console.log(index)
    let tempArr = [...this.state.guests];
    tempArr.splice(index, 1)
    console.log(tempArr)
    this.setState({
      guests: tempArr
    })

  }


  keyboardDidHide= () =>{
    if (!!this.state.text) {
      const newGuest = {
        id: this.state.guests.length ? this.state.guests[this.state.guests.length -1].id +1 : 0,
        name: this.state.text,
        withOne: this.state.checkbox
      }
      const newGuests = [...this.state.guests,newGuest]
      this.setState({
        text: '',
        checkbox: false,
        guests: newGuests
      })
    }
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

  render(){
    console.log(this.state);
    let {guests, filter} = this.state;
    switch (filter) {
      case "withOne":
        guests = guests.filter((items) => items.withOne === true)
        break;
      case "withoutOne":
        guests = guests.filter((items) => items.withOne === false)
        break;
      default:
        break
    }
    return(
      <View>
        <Text>{this.guestCounterHandler(guests)}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => this.onChangeText(text)}
          value={this.state.text}
          onSubmitEditing={Keyboard.dismiss}

        />
        <View style={styles.btnGroup}>
          <Button
            style={styles.bntSort}
            title="Все"
            onPress={() => this.onBtnFilterHandler('all')}
            disabled={filter === 'all'}
          />
          <Button
            style={styles.bntSort}
            title="С парой"
            onPress={() => this.onBtnFilterHandler('withOne')}
            disabled={filter === 'withOne'}
          />
          <Button
            style={styles.bntSort}
            title="Без прары"
            onPress={() => this.onBtnFilterHandler('withoutOne')}
            disabled={filter === 'withoutOne'}
          />

        </View>
        <View>
          <FlatList
            data={guests}
            renderItem={({item}) => <Item editGuest={this.editGuest}
                                          item={item}
                                          deleteGuest={this.deleteGuest}
            />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    )
  }
}
export default List
