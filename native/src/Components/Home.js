import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewPost from './NewPost';
import Post from './Post';
import {View, StyleSheet, FlatList} from 'react-native';

const styles = StyleSheet.create({
  wrap: {
    padding: 30,
    backgroundColor: '#b3a5ff',
  },
});
class Home extends Component {
  render() {
    const {posts} = this.props;
    let renderPost = [];
    if (posts.posts) {
      for (let [key, value] of Object.entries(posts.posts)) {
        value.id = key;
        renderPost.push(value);
      }
    }
    renderPost = renderPost.sort((a, b) => b.date - a.date);

    return (
      <View style={styles.wrap}>
        <View>
          <NewPost />
        </View>

        {!!renderPost && (
          <View>
            <FlatList
              data={renderPost}
              renderItem={({item}) => (
                <View>
                  <Post key={item.date} {...item} />
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </View>
    );
  }
}

export default connect(
  state => {
    return {
      posts: state.posts,
    };
  },
  dispatch => {
    return {};
  },
)(Home);
