import { toneColor
       , translucify
       , buttonColors
       } from './utilities'

const urls = []
const image = {
  folder:   "img/"
, play:     "img/play.svg"
, pause:    "img/pause.svg"
, stop:     "img/stop.svg"
, disabled: "img/noAudio.svg"
}
const noAudioDelay = 3000


/// << SEEDS
const background = "#fed"
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
const colors = Object.assign(
  buttonHues
, {
    background
  , text: toneColor(background, 0.3333)
  , hard: toneColor(background, 0.125)
  , icon: toneColor(background, 0.6667)
  }
)
colors.disabled = translucify(colors.text, disabledOpacity)


// MENU DIMENSIONS
const dimensions = {
  iconSize:  12
, playSize:   9
, menuWidth: 50 // menu icon transition not good below 22
}
dimensions.iconOffset = dimensions.width - dimensions.iconSize
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
, image
, text
, urls
}


Session.set({ Jazyx })
// console.log(Jazyx)
