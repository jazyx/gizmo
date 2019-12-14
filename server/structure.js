/**
 * Run when the server launches and at any time where there is a
 * change in any file that the server can see.
 * 
 * Action: recreates the file at...
 * 
 *   client/ui/Structure.jsx
 *   
 * ... to reflect the current files at the root of the folder
 * 
 *   client/ui/Views/
 */

var fs = require('fs');
var path = require('path');

export const createStructure = () => {
  let pathArray = path.resolve("./").split("/")
  while (pathArray.pop() !== ".meteor") {}    
  const ui = path.join(pathArray.join("/"), "client/ui/")

  const output = path.join(ui, "Structure.jsx")
  const views = path.join(ui, "Views/")
  const files = fs.readdirSync(views)

  const regex = /((\d+)[_\s-]?)?([^\s]+)/

  const imports    = []
  const components = []
  const itemIndex  = {}

  const addImport = (fileName) => {
    const ext = path.extname(fileName)
    const name = path.basename(fileName, ext)
    const match = regex.exec(name)
    if (!match) {
      return
    }

    const index = parseInt(match[2], 10) || 0
    const item = match[3][0].toUpperCase() + match[3].substring(1)
    itemIndex[item] = index

    const line = `import ${item} from './Views/${name}'`
    imports.push (line)
    components.push(item)
  }


  files.forEach( fileName => { // XX_viewName

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

const itemIndex = ${JSON.stringify(itemIndex)}

const forNonZeroIndex = ( item => (
  itemIndex[item]
))

class Structure{
  constructor() {
    this.components = {
      ${components.join("\n    , ")}
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

export default new Structure()`

  fs.writeFileSync(output, script)
}