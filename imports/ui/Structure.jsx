
//    DO NOT MODIFY THIS FILE    //
// IT IS GENERATED AUTOMATICALLY //


import About from './Views/About/about'
import Show from './Views/Game/show'
import Find from './Views/Search/find'
import Search from './Views/Search/search'


class Structure{
  constructor() {
    this.components = {
      About
    , Show
    , Find
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