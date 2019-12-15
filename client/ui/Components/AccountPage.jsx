import React, { Component } from 'react';
import { StyledAccount } from '../Styles/styles'


export default class AccountPage extends Component {
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