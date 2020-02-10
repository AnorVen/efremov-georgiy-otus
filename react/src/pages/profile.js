import React from 'react';

export default ({ user }) => (
  <div>
    <img src={user.ava} alt='' />
    <p>{user.login}</p>
    <p>{user.email}</p>
    <p>{user.pass}</p>
    <p>{user.about}</p>
    <button>logout</button>
  </div>
);
