import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e2e2e2',
    height: '100%',
  },
});

export default () => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View id="message">
          <Text>404</Text>
          <Text>Page Not Found</Text>
          <Text>
            The specified file was not found on this website. Please check the
            URL for mistakes and try again.
          </Text>
          <Button
            onPress={this.props.navigation.navigate('Root')}
            title={'Main Page'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
);
