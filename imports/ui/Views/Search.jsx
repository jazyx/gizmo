import React, { Component } from 'react';
import { StyledPage } from '../styles'

/// <<< HARD-CODED
const index = 6
/// HARD-CODED >>>

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }


  static getIndex() {
    return index
  }


  render() {
    return (
      <StyledPage>
        SEARCH
      </StyledPage>
    );
  }
}


export default About
