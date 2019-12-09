import React, { Component } from 'react';
import { StyledNavigation } from './styles'



export default class Navigation extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <StyledNavigation>
        <button
          disabled={this.props.first}       
          onClick={() => this.props.onClick("prev")}
        >
          ⮜
        </button>
        <button
          disabled={this.props.last}
          onClick={() => this.props.onClick("next")}
        >
          ⮞
        </button>
      </StyledNavigation>
    )
  }
}
