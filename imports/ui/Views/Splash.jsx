import React, { Component } from 'react';
import { StyledPage
       , StyledSplash
       } from '../styles'


class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }


  render() {
    return (
      <StyledPage>
        <StyledSplash>
          Фразеологизмы
        </StyledSplash>
      </StyledPage>
    );
  }
}


export default Search
