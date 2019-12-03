const background = "#fed"

const menu = {
  background
, iconColor:  "#975"
, iconSize:   12
, menuWidth:  42
, bgOpacity:  0.95
}
menu.iconOffset = menu.menuWidth
                - menu.iconSize


export const Jazyx = {
  background
, menu
}


Session.set({ Jazyx })