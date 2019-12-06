// /home/blackslate/Repos/Gizmo/App/imports/ui/Views/Game.jsx

import React, { Component } from 'react';
import Revelation from './Game/Revelation'



export default class Game extends Component {
  constructor(props) {
    super(props) // { phrases: [ {...}, ... ] }
    this.components = {
      Revelation
    }
    this.state = {
      game: "Revelation"
    }
  }


  static getDisplayName () {
    return "Фразеологизмы"
  }


  render() {
    const Component = this.components[this.state.game]
    return <Component />
  }
}