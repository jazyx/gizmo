import React, { Component } from 'react';
import { StyledPage } from '../../Styles/styles'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }


  render() {
    return (
      <StyledPage>
        Log in
      </StyledPage>
    );
  }
}


export default Login
