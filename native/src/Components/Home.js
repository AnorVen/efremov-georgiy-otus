import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewPost from './NewPost';
import Post from './Post';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrap: {
    width: '50%',
    padding: '0 30px',
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

        {renderPost && (
          <View>
            {' '}
            {renderPost.map((item, i) => {
              return (
                <View>
                  <Post key={item.date} {...item} />{' '}
                </View>
              );
            })}
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
