///////////////////////////////////
//    DO NOT MODIFY THIS FILE    //
// IT IS GENERATED AUTOMATICALLY //
//    BY server/structures.js    //
///////////////////////////////////


import Game from './Views/01_Game'
import Search from './Views/02-Search'
import About from './Views/03_About'

const itemIndex = {"Game":1,"Search":2,"About":3}

class Structure{
  constructor() {
    this.components = {
      Game
    , Search
    , About
    }

    const byIndex = (a, b) => (
      itemIndex[a] - itemIndex[b]
    )
    this.pages = Object
                 .keys(this.components)
                 .sort(byIndex)
                 .map( key => {
                   const name = [key]
                   if (this.components[key].getDisplayName) {
                     name.push(this.components[key].getDisplayName())
                   }

                   return name
                 })
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