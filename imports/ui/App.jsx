// Set the Jazyx Session "global" before any other files are loaded
import { Jazyx } from '../../lib/jazyx' // Its value is ignored here

import React, { Component } from 'react';
import { Session } from 'meteor/session'
import Menu from './Menu.jsx';
import Structure from './Structure.jsx';
import { StyledApp } from './styles'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { view: "About" }

    this.setView = this.setView.bind(this)
  }


  setView(view) {
    if (Structure.viewExists(view)) {
      this.setState({ view })
    }
  }


  render() {
    const View = Structure.getComponent(this.state.view)
    console.log(Structure.getPages())

    return (
      <StyledApp>
        <Menu
          onClick={this.setView}
          menuItems={Structure.getPages()}
        />
        <View />
      </StyledApp>
    )
  }
}


export default App;
