/**
 * Run when the server launches and at any time where there is a
 * change in file that the server can see.
 * 
 * Action: recreates the file at...
 * 
 *   imports/ui/Structure.jsx
 *   
 * ... to reflect the current files at the root of the folder
 * 
 *   imports/ui/Views/
 */

var fs = require('fs');
var path = require('path');

export const createStructure = () => {
  let pathArray = path.resolve("./").split("/")
  while (pathArray.pop() !== ".meteor") {}
  const ui = path.join(pathArray.join("/"), "imports/ui/")
  const output = path.join(ui, "Structure.jsx")
  const views = path.join(ui, "Views/")
  const files = fs.readdirSync(views)
  const tree = {}

  const imports = []
  const components = []

  const addImport = (fileName) => {
    const ext = path.extname(fileName)
    const name = path.basename(fileName, ext)
    const item = name[0].toUpperCase() + name.substring(1)
    const line = `import ${item} from './Views/${name}'`
    imports.push (line)
    components.push(item)
  }


  files.forEach( fileName => {
    const filePath = path.join(views, fileName)
    if (fs.lstatSync(filePath).isFile()) {
      addImport(fileName)
    }
  })

  const script = `///////////////////////////////////
//    DO NOT MODIFY THIS FILE    //
// IT IS GENERATED AUTOMATICALLY //
//    BY server/structures.js    //
///////////////////////////////////


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

export default new Structure()`

  fs.writeFileSync(output, script)
}