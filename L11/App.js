import React from 'react';
import firebase from 'firebase/app';

import * as auth from 'firebase/auth';
import * as db from 'firebase/database';
import * as storage from 'firebase/storage';

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


const firebaseConfig = {
  apiKey: "AIzaSyAUTtcjk7Q6J8pVnvK5vJpcFQ6CFIq8TzQ",
  authDomain: "guests-6d06a.firebaseapp.com",
  databaseURL: "https://guests-6d06a.firebaseio.com",
  projectId: "guests-6d06a",
  storageBucket: "guests-6d06a.appspot.com",
  messagingSenderId: "429740294393",
  appId: "1:429740294393:web:94d81d2285ee0464bb6228"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  guestCounterHandler = () => {
    const guestCounter = this.props.guests.reduce((previousValue, currentValue, index, array) => {
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




  editGuest = ({withOne, name, id}) => {
    const index = this.props.guests.findIndex((item) => item.id === id)
    console.log(index)
    const tempArr = [...this.props.guests];
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


  render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    console.log(this.state);
    const {filter} = this.state;
    let {guests} = this.props;
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

          </ScrollView>
        </SafeAreaView>
      </>
    );
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
