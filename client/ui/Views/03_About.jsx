import React, { Component } from 'react';
import { StyledPage } from '../Styles/styles'

import l10n from '../../../lib/l10n'


class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }


  static getOptions() {
    return {
      name: l10n.getString("about")
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
