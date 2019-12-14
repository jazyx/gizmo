///////////////////////////////////
//    DO NOT MODIFY THIS FILE    //
// IT IS GENERATED AUTOMATICALLY //
//    BY server/structures.js    //
///////////////////////////////////


import Game from './Views/01_Game'
import Search from './Views/02-Search'
import About from './Views/03_About'
import Splash from './Views/Splash'

const itemIndex = {"Game":1,"Search":2,"About":3,"Splash":0}

const forNonZeroIndex = ( item => (
  itemIndex[item]
))

class Structure{
  constructor() {
    this.components = {
      Game
    , Search
    , About
    , Splash
    }

    const byIndex = (a, b) => (
      itemIndex[a] - itemIndex[b]
    )
    this.pages = Object
                 .keys(this.components)
                 .filter(forNonZeroIndex)
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