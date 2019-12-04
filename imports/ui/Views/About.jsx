import React, { Component } from 'react';
import { StyledPage } from '../styles'

/// <<< HARD-CODED
const index = 2
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
        About
      </StyledPage>
    );
  }
}


export default About
