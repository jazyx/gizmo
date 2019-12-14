import { toneColor
       , translucify
       , buttonColors
       } from './utilities'

const urls = []
const image = {
  folder:   "img/"
, play:     "buttons/play.svg"
, pause:    "buttons/pause.svg"
, disabled: "buttons/noAudio.svg"
, prev:     "buttons/prev.svg"
, next:     "buttons/next.svg"
}
const noAudioDelay = 3000


/// << SEEDS
const background = "#fed"
const vivid      = buttonColors("#f90")
const bgOpacity = 0.90
const disabledOpacity = 0.25
/// SEEDS >>


const splash = {
  titleFontSize: 12
, splashDisplayTime: 1000
, maxWaitTimeForAssets: 1000
}

// COLORS
const buttonHues  = buttonColors(background)
buttonHues.menuBG = translucify( background
                               , bgOpacity
                               )
// console.log("buttonHues:", JSON.parse(JSON.stringify(buttonHues)))
const colors = Object.assign(
  buttonHues
, {
    text: toneColor(background, 0.3333)
  , icon: toneColor(background, 0.6667)
  // , background
  // , hard: toneColor(background, 0.125)
  }
)
colors.disabled = translucify(colors.text, disabledOpacity)

// console.log("colors:", JSON.parse(JSON.stringify(colors)))

// MENU DIMENSIONS
const dimensions = {
  iconSize:  12
, playSize:   9
, menuWidth: 50 // menu icon transition not good below 22
}
dimensions.iconOffset = dimensions.menuWidth - dimensions.iconSize
if (dimensions.iconSize < 10) {
  dimensions.iconSize = "0" + dimensions.iconSize
}


// FONT
const text = {
  cueFontSize: 4
, cueFontWeight: "bold"
, menuFontSize: 5
, responseFontSize: 3.6
}


export const Jazyx = {
  noAudioDelay
, disabledOpacity
, dimensions
, splash
, colors
, vivid
, image
, text
, urls
}


Session.set({ Jazyx })
// console.log(Jazyx)
