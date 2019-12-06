import React, { Component } from 'react';
import { StyledPage } from '../styles'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }


  static getDisplayName() {
    return "Find what you seek..."
  }


  render() {
    return (
      <StyledPage>
        SEARCH
      </StyledPage>
    );
  }
}


export default Search
