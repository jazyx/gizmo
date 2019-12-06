import { toneColor } from './utilities'

const urls = [
  "img/chickenTeeth.jpg"
, "img/coolCucumber.jpg"
, "img/hairTeeth.jpg"
, "img/headClouds.jpg"
, "img/holdhorses.jpg"
, "img/hotDog.jpg"
, "img/mustardLunch.jpg"
, "img/onion.jpg"
, "img/prawnSandwich.jpg"
, "img/tieBear.jpg"
]
const background = "#fed"
const splash = {
  titleFontSize: 12
, splashDisplayTime: 1000
, maxWaitTimeForAssets: 2000
}

const menu = {
  background
, iconColor:  toneColor(background, 0.6667)
, iconSize:   12
, menuWidth:  50 // menu icon transition not good below 22
, bgOpacity:  0.90
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
, urls
}


Session.set({ Jazyx })
