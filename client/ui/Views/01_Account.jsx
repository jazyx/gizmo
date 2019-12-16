import React, { Component } from 'react';

import styled, { css } from 'styled-components'

import storage from '../../../lib/storage.js'
import Login          from './Account/Login'
import Register       from './Account/Register'
// import Verify         from './Account/Verify'
// import LostPassword   from './Account/LostPassword'
// import ChangePassword from './Account/ChangePassword'

import connection from '../../../lib/connection'
import l10n from '../../../lib/l10n'




const StyledAccount = styled.div`
  & form {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 90vmin;
    height: 100%;
    margin: 0 auto;
    font-size: 3.5vmin;
  }

  & label {
    display: flex;
    justify-content: space-between;
    margin: 0 0 0.5em 0;
  }

  & input {
    border-width: 2px;
    font-size: 4vmin;
  }

  & input.error, & input[type=email]:invalid {
    border: 2px solid red;
  }

  & div {
    display: flex;
    justify-content: space-between;
  }

  & div#errors, #errors div {
    display: block;
    height: 20vmin
    color: #900;   
    font-size: 2.7vmin;

    & p {
      font-weight: bold;
    }

    & span {
      display: block;
      color: #000;
      font-weight: normal;
      margin: 1em 0;
    }
  }

  & button {
    width: 32vmin;
    height: 8vmin;
    font-size: 4vmin;
  }
`


const StyledInput = styled.input.attrs({type: "text"})`

`



class AccountPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <StyledAccount>
        {this.props.children}
      </StyledAccount>
    )
  }
}



class Account extends Component {
  constructor(props) {
    super(props)

    this.components = {
      Login
    , Register
    }

    this.displays = Object.keys(this.components)

    this.users = storage.getItem("users") || []

    this.state = {
      display: connection.getAction()
    }

    this.setDisplay = this.setDisplay.bind(this)
  }


  static getOptions() {
    const action = connection.getAction()
    const display = l10n.getString(action)
    const options = { 
      name: display
    }

    if (action === "Register") {
      options.theme = "vivid"
    }

    return options
  }


  setDisplay(display) {
    if (this.displays.indexOf(display) < 0) {
      return console.log(
        "Account.setDisplay error: unknown display", display
      )
    }

    this.setState({ display })
  }


  render() {
    const Display = this.components[this.state.display]

    return (
      <AccountPage>
        <Display
          setDisplay={this.setDisplay}
        />
      </AccountPage>
    );
  }
}


export default Account
