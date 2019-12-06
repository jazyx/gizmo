import React, { Component } from 'react';
import { StyledPage } from '../styles'

/// <<< HARD-CODED
const index = 6
/// HARD-CODED >>>

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }


  static getIndex() {
    return index
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
