import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, FlatList, StyleSheet, Text, TextInput, View, Keyboard} from "react-native";
import {addGuest} from "../actions";
import Item from "./Item";

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


class List extends Component {
  state = {
    text: '',
    filter: 'all',
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

  keyboardDidHide= () =>{
    if (!!this.state.text) {
      this.props.addGuest ({
        id: this.props.guests.length ? this.props.guests[this.props.guests.length -1].id + 1 : 0,
        name: this.state.text,
        withOne: false
      })
      this.setState({text: ''})
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



  render() {
    let {guests} = this.props
    let {filter} = this.state;
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
    return (
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
            renderItem={({item}) => <Item item={item}
            />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = store => {
  console.log(store)
  return {
    guests: store.guests,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addGuest: guest => dispatch(addGuest(guest)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
