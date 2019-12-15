// Initialize Session.get("Jazyx") before anything else starts
import { preload } from '../../lib/preload'
// Prepare the connection object so that the Accounts menu item will
// know what name to display
import connection from '../../lib/connection'

import React, { Component } from 'react';
import Structure from './Structure.jsx';
import Menu from './Components/Menu.jsx';
import { StyledApp } from './Styles/styles'

const Jazyx = Session.get("Jazyx")



class App extends Component {
  constructor(props) {
    super(props)
    this.state = { view: "Splash", menuEnabled: false }  /// HARD-CODED ///
    this.setView = this.setView.bind(this)

    this.hideSplashTime = +new Date() + Jazyx.splash.splashDisplayTime
    preload(Jazyx.splash.maxWaitTimeForAssets).then(
      result => result
    , error => console.log("Error", error)
    ).then(
      () => this.hideSplash()
    )
  }


  hideSplash() {
    const remaining = Math.max(0, this.hideSplashTime - +new Date())

    setTimeout(
      () => {
        this.setState({ view: "Account", menuEnabled: true })
      }
    , remaining
    )
  }


  setView(view) {
    if (Structure.viewExists(view)) {
      this.setState({ view })
    }
  }


  render() {
    const View = Structure.getComponent(this.state.view)

    return (
      <StyledApp>
        <View />

        <Menu
          onClick={this.setView}
          enabled={this.state.menuEnabled}
          menuItems={Structure.getPages()}
          selected={this.state.view}
        />
      </StyledApp>
    )
  }
}


export default App;
