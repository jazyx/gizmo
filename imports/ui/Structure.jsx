///////////////////////////////////
//    DO NOT MODIFY THIS FILE    //
// IT IS GENERATED AUTOMATICALLY //
//    BY server/structures.js    //
///////////////////////////////////


import About from './Views/About'
import Phrases from './Views/Phrases'
import Search from './Views/Search'


class Structure{
  constructor() {
    this.components = {
      About
    , Phrases
    , Search
    }

    const byIndex = (a, b) => (
      this.components[a].getIndex() - this.components[b].getIndex()
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