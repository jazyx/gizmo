///////////////////////////////////
//    DO NOT MODIFY THIS FILE    //
// IT IS GENERATED AUTOMATICALLY //
//    BY server/structures.js    //
///////////////////////////////////


import Phrases from './Views/01_Phrases'
import Search from './Views/02_Search'
import About from './Views/03_About'

const itemIndex = {"Phrases":1,"Search":2,"About":3}

class Structure{
  constructor() {
    this.components = {
      Phrases
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