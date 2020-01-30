import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  FlatList,
} from 'react-native';


class App extends React.Component {

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


  guestCounterHandler = () => {
    const guestCounter = this.state.guests.reduce((previousValue, currentValue, index, array) => {
      let tempCount = 0;
      if (currentValue.name) {
        tempCount += 1
      }
      if (currentValue.withOne) {
        tempCount += 1
      }
      return tempCount + previousValue;

    }, 0);

    this.setState({
      guestCounter: guestCounter
    });
  };

  onChangeText = (text) => {
    this.setState({
      text: text
    })
  };

  onBtnHandler = () => {
    if (!!this.state.text) {
      const newGuests = [...this.state.guests, {
        id: this.state.guests[this.state.guests.length -1].id +1,
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
  editGuest =({withOne, name, id})=> {
    const index = this.state.guests.findIndex((item)=> item.id === id)
    const newGuests = this.state.guests.splice(index, 1, {
      id,
      name,
      withOne
    })
    this.setState({
      guests:newGuests
    })
  }



  checkboxHandler = () => {
    this.setState({
      checkbox: !this.state.checkbox
    })
  };

  componentDidMount(): void {
    this.guestCounterHandler()
  };


  render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
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
    return (
      <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View>
              <Text>{this.state.guestCounter}</Text>
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
                  renderItem={({item, i}) => <Item editGuest={this.editGuest} item={item}/>}
                  keyExtractor={item => item.name}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

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

  render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {


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

export default App;
