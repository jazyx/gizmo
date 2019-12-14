import React, { Component } from 'react';

import Login          from './Account/Login'
// import Register       from './Account/Register'
// import Verify         from './Account/Verify'
// import LostPassword   from './Account/LostPassword'
// import ChangePassword from './Account/ChangePassword'



class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: "Login"
    }

    this.components = {
      Login
    }
  }


  static getOptions() {
    return { 
      name: "Log in"
    , theme: "vivid"
    }
  }


  render() {
    const Display = this.components[this.state.display]

    return (
      <Display />
    );
  }
}


export default Account
