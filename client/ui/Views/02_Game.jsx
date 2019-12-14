// /home/blackslate/Repos/Gizmo/App/imports/ui/Views/Game.jsx

import React, { Component } from 'react';

import Revelation  from './Game/Revelation'
import Recognition from './Game/Recognition'
import Recall      from './Game/Recall'
import Revision    from './Game/Revision'
import GoldList    from './Game/GoldList'



export default class Game extends Component {
  constructor(props) {
    super(props) // { phrases: [ {...}, ... ] }
    this.components = {
      Revelation
    , Recognition
    , Recall
    , Revision
    , GoldList
    }

    this.views = Object.keys(this.components)

    this.state = {
      game: "Recognition" // "Revelation" //
    }
  }


  setView(game) {
    if (this.views.indexOf(game) < 0) {
      return
    }

    this.setState({ game })
  }


  render() {
    const Component = this.components[this.state.game]
    return <Component />
  }
}


// Static method
Game.getOptions = () => {
  return { name: "Фразеологизмы" }
}