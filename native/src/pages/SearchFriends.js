import React from 'react';
import {
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
          <Text>Why am I seeing this?</Text>
          <Text>
            This page was generated by the Firebase Command-Line Interface. To
            modify it, edit the <code>404.html</code> file in your project's
            configured <code>public</code> directory.
          </Text>
          <Text to={'/'}>Main Page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
);
