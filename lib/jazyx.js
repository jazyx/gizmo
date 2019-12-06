import { toneColor } from './utilities'

const background = "#fed"
const splash = {
  titleFontSize: 12
}

const menu = {
  background
, iconColor:  toneColor(background, 0.6667)
, iconSize:   12
, menuWidth:  42
, bgOpacity:  0.95
}
menu.iconOffset = menu.menuWidth
                - menu.iconSize
if (menu.iconSize < 10) {
  menu.iconSize = "0" + menu.iconSize
}


export const Jazyx = {
  background
, splash
, menu
}


Session.set({ Jazyx })
