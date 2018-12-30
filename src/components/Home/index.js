import React, { Component } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';

const addFireEmoji = () => {
  return <span role="img" aria-label="fire">🔥</span>
}

class HomePage extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div style={{ margin: 'auto', width: '60%' }}>
            <h1>Home Page</h1>
            <UserArea user={authUser} />
            <p>The Home Page is accessible by every signed in user.</p>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

class UserArea extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <h2>Welcome {this.props.user.username} !!{addFireEmoji()}{addFireEmoji()}</h2>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);