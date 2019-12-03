import { Meteor } from 'meteor/meteor'

var fs = require('fs');
var path = require('path');

export const createStructure = () => {
  let pathArray = path.resolve("./").split("/")
  while (pathArray.pop() !== ".meteor") {}
  const ui = path.join(pathArray.join("/"), "imports/ui/")
  const output = path.join(ui, "Structure.jsx")
  const views = path.join(ui, "Views/")
  const dirs = fs.readdirSync(views)
  const tree = {}

  const imports = []
  const components = []

  const addImport = (parent, file) => {
    const ext = path.extname(file)
    const name = path.basename(file, ext)
    const item = name[0].toUpperCase() + name.substring(1)
    const line = `import ${item} from './Views/${parent}/${name}'`
    imports.push (line)
    components.push(item)
  }

  dirs.forEach( dirName => {
    const parent = path.join(views, dirName)
    if (fs.lstatSync(parent).isDirectory()) {
      const files = fs.readdirSync(parent)
                      .filter( file => (
                         fs.lstatSync(path.join(parent, file)).isFile()
                       ))
      if (files.length) {
        files.forEach( file => addImport(dirName, file))
      }
    }
  })

  const script = `
//    DO NOT MODIFY THIS FILE    //
// IT IS GENERATED AUTOMATICALLY //


`
+ imports.join("\n")
+ `


class Structure{
  constructor() {
    this.components = {
      ${components.join("\n    , ")}
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

export default new Structure()`

  fs.writeFileSync(output, script)
}

// const imports = []
// const components = []
  
// imports.push(`import ${Component} from './Views/${parent}/${child}'\n`)



// `class Structure{
//   constructor() {
//     this.components = {
//       ${components.join("\n    , ")}
//     }

//     const byIndex = (a, b) => (
//       this.components[a].getIndex() - this.components[b].getIndex()
//     )
//     this.pages = Object.keys(this.components).sort(byIndex)
//   }


//   getPages() {
//     return this.pages
//   }


//   viewExists(name) {
//     return !!this.components[name]
//   }


//   getComponent(name) {
//     return this.components[name]
//   }
// }

// export default new Structure()`