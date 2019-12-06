import React, { Component } from 'react';
import { StyledPage } from '../styles'


class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
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
