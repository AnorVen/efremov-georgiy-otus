import React, { Component } from 'react';
import { connect } from 'react-redux';
class Explore extends Component {
  render() {
    const { friends = [], allUsers = [] } = this.props;
    return (
      <div>
        friends list
        {friends.length ? friends : allUsers}
      </div>
    );
  }
}

export default connect()(Explore);
