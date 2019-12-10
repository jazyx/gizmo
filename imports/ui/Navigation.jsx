import React, { Component } from 'react';
import { StyledNavigation
       , StyledNavigationButton
       } from './styles'

const Jazyx = Session.get("Jazyx")



export default class Navigation extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <StyledNavigation>
        <StyledNavigationButton
          disabled={this.props.first}       
          onClick={() => this.props.onClick("prev")}
          background={Jazyx.image.prev}
        />
        <StyledNavigationButton
          disabled={this.props.last}
          onClick={() => this.props.onClick("next")}
          background={Jazyx.image.next}
        />
      </StyledNavigation>
    )
  }
}
