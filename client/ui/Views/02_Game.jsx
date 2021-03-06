import React, { Component } from 'react';

import Revelation  from './Game/Revelation'
import Recognition from './Game/Recognition'
import Recall      from './Game/Recall'
import Revision    from './Game/Revision'
import GoldList    from './Game/GoldList'

import l10n from '../../../lib/l10n'



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


  static getOptions() {
    return {
      name: l10n.getString("idioms")
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