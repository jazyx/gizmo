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
    font-size: 3.3vmin;
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
    justify-content: flex-end;
  }

  & div#errors, #errors div {
    display: block;
    height: 20vmin

    & p {
      font-weight: bold;
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

    this.users = storage.getItem("users") || []


    this.state = {
      display: connection.getAction()
    }
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


  render() {
    const Display = this.components[this.state.display]

    return (
      <AccountPage>
        <Display />
      </AccountPage>
    );
  }
}


export default Account
