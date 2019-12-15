import storage from './storage.js'
import { strings } from '../imports/data/l10n.js'
import { removeFrom } from './utilities.js'



class L10N {
  constructor() {
    this.codes = Object.keys(strings)
    this.code = strings.code
    this.fallback = "en"
    removeFrom(this.codes, "code")

    this.setLanguage(storage.getItem("code"))
  }


  setLanguage(code) {
    if (this.codes.indexOf(code) < 0) {
      return "Error: unknown langage — " + code
    }

    this.code = code
    storage.setItem("code", code)

    return code
  }


  getString(key, childStrings) {
    key = key.toLowerCase()
    let string = strings[this.code][key]

    if (!string) {
      string = strings[this.fallback][key]
    }
    if (!string) {
      return key // Ignore childStrings if key is unknown
    }

    if (typeof childStrings === "object") {
      string = this.replaceAll(string, childStrings)
    }

    return string
  }


  replaceAll(string, childStrings) {
    const keys = Object.keys(childStrings)
    keys.forEach( key => {
      string = string.replace(new RegExp(key, "g"), childStrings[key])
    })

    return string
  }


  getLanguageChoiceData() {
    const data = []

    this.codes.forEach( code => {
      data.push({
        code
      , endonym: strings[code][code]
      , icon:    strings[code]["_icon_"]
      })
    })

    return data
  }
}


export default l10n = new L10N()