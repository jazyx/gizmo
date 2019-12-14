///////////////////////////////////
//    DO NOT MODIFY THIS FILE    //
// IT IS GENERATED AUTOMATICALLY //
//    BY server/structures.js    //
///////////////////////////////////


import Account from './Views/01_Account'
import Game from './Views/02_Game'
import About from './Views/03_About'
import Splash from './Views/Splash'

const itemIndex = {"Account":1,"Game":2,"About":3,"Splash":0}

const forNonZeroIndex = ( item => (
  itemIndex[item]
))

class Structure{
  constructor() {
    this.components = {
      Account
    , Game
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
                   const options = { key }
                   if (this.components[key].getOptions) {
                     Object.assign(options, this.components[key].getOptions())
                   }

                   return options
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