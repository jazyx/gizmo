///////////////////////////////////
//    DO NOT MODIFY THIS FILE    //
// IT IS GENERATED AUTOMATICALLY //
//    BY server/structures.js    //
///////////////////////////////////


import About from './Views/About'
import Game from './Views/Game'
import Search from './Views/Search'


class Structure{
  constructor() {
    this.components = {
      About
    , Game
    , Search
    }

    const byIndex = (a, b) => (
      this.components[a].getIndex() - this.components[b].getIndex()
    )
    this.pages = Object.keys(this.components).sort(byIndex)
  }


  getPages() {
    return this.pages
  }


  viewExists(name) {
    return !!this.components[name]
  }


  getComponent(name) {
    return this.components[name]
  }
}

export default new Structure()