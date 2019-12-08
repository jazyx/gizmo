import { toneColor
       , translucify
       , buttonColors
       } from './utilities'

const urls = []
const noAudioDelay = 3000


/// << SEEDS
const background = "#fed"
const bgOpacity = 0.90
const disabledOpacity = 0.25
/// SEEDS >>


const splash = {
  titleFontSize: 12
, splashDisplayTime: 1000
, maxWaitTimeForAssets: 2000
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
  , text: toneColor(background, 0.6667)
  , icon: toneColor(background, 0.6667)
  }
)
colors.disabled = translucify(colors.text, disabledOpacity)


// MENU DIMENSIONS
const menu = {
  iconSize: 12
, width:    50 // menu icon transition not good below 22
}
menu.iconOffset = menu.width
                - menu.iconSize
if (menu.iconSize < 10) {
  menu.iconSize = "0" + menu.iconSize
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
, splash
, colors
, menu
, text
, urls
}


Session.set({ Jazyx })
