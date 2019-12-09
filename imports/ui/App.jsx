// Initialize Session.get("Jazyx") before anything else starts
import { preload } from '../../lib/preload'

import React, { Component } from 'react';
import Menu from './Menu.jsx';
import Structure from './Structure.jsx';
import { StyledApp } from './styles'

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
        this.setState({ view: "Game", menuEnabled: true })
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
        />
      </StyledApp>
    )
  }
}


export default App;
