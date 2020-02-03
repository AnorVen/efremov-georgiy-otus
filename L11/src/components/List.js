import React, {Component} from 'react';
import {connect} from 'react-reduxt';
import {Button, FlatList, StyleSheet, Text, TextInput, View} from "react-native";


class List extends Component{
  state = {
    text: '',
    checkbox: false,
    filter: 'all',
  };

  onChangeText = (text) => {
    this.setState({
      text: text
    })
  };


  onBtnHandler = () => {
  if (!!this.state.text) {
    const newGuests = [...this.props.guests, {
      id: this.props.guests[this.props.guests.length - 1].id + 1,
      name: this.state.text,
      withOne: this.state.checkbox
    }]
    console.log(newGuests)

    this.setState({
      text: '',
      checkbox: false,
      guests: newGuests
    }, () => this.guestCounterHandler())
  }
};


  onBtnFilterHandler = (text) => {
   this.setState({
      filter: text
    })
  }

  checkboxHandler = () => {
    this.setState({
      checkbox: !this.state.checkbox
    })
  };


  render() {
    return (
      <View>
        <Text>{this.props.guestCounter}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => this.onChangeText(text)}
          value={this.state.text}
        />
        <Button title={
          this.state.checkbox
            ? 'Убрать пару'
            : 'Добавить пару'} onPress={() => this.checkboxHandler()}/>
        <Button
          title="Добавить"
          onPress={() => this.onBtnHandler()}
          disabled={!this.state.text}
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
            renderItem={({item, i}) => <Item item={item}/>}
            keyExtractor={item => item.name}
          />
        </View>
      </View>
    );
  }
}


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

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
  scrollView: {
    backgroundColor: '#e2e2e2',
    minHeight: 100,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#1f1f1f',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#1f1f1f',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});



export default connect({},{})(List)
