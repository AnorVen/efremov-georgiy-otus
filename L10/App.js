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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {

  state = {
    text: '',
    guests: [{
      name: 'Vasya',
      withOne: false
    },
      {
        name: 'Petiya',
        withOne: true
      }]
  }
  onChangeText = (text) => {
    this.setState({
      text: text
    })
  }
  onBtnHandler = () => {
    if (!!this.state.text) {
      const newGuests = this.state.guests.push({
        name: this.state.text,
        withOne: false
      })
      this.setState({
        text: '',
        guests: newGuests
      })
    }
  }


  render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => this.onChangeText(text)}
                value={this.state.text}
              />
              <Button
                title="Press me"
                onPress={() => this.onBtnHandler()}
              />
              <View>
                <FlatList
                  data={this.state.guests}
                  renderItem={({item}) => <Item item={item}/>
                  }
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
  render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    console.log(this.props)
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{this.props.item.name}</Text>
        {this.props.item.withOne&&<Text style={styles.title}>+1</Text>}
      </View>
    )
  }
};
const styles = StyleSheet.create({
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
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
