import React, { Component } from 'react';
import styled, { css } from 'styled-components'
import { menuItems } from './MenuItems'
import { buttonColors
       , translucify
       } from '../utilities/utilities'
import { Session } from 'meteor/session'



const menuConstants = Session.get("Jazyx").menu
const colors = buttonColors(menuConstants.background)
colors.background = translucify( menuConstants.background
                               , menuConstants.bgOpacity
                               )


const StyledMenu = styled.div`
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: ${props => props.state.showMenu && props.state.visible
                 ? 0
                 : -menuConstants.menuWidth}vmin;
  ${props => props.state.showMenu && props.state.visible
          ? "box-shadow: 0 0 3vmin 0 rgba(0,0,0,0.75);"
          : ""
  }
  height: 100vh;
  width: ${menuConstants.menuWidth}vmin;
  padding: 2vmin;
  padding-top: ${menuConstants.iconSize}vmin
  background-color: ${colors.background };
  transition: left .${menuConstants.menuWidth}s linear;
`


const StyledSVG = styled.svg`
  position: fixed;
  top: 0;
  left:    ${props => props.open
                    ? menuConstants.iconOffset
                    : 0
            }vmin;
  display: ${props => props.visible
                    ? "block"
                    : "none"
            }
  width:   ${menuConstants.iconSize}vmin;
  height:  ${menuConstants.iconSize}vmin;
  fill:    ${menuConstants.iconColor};
  opacity: ${props => props.open
                    ? 1
                    : (props.over ? 0.75 : 0.25)
            }
  transition: left .${menuConstants.iconOffset}s linear
            , opacity .${menuConstants.iconOffset}s;
  transition-property: left, opacity;
  transition-delay: ${props => props.open
                             ? `.${menuConstants.iconSize}s, 0s;`
                             : `0s, .${menuConstants.iconOffset}s;`
                     }
   ${props => props.disabled
           ? `pointer-events: none;cursor: default;`
           : `cursor: pointer;`
    }
`

const getSVG = ({ showMenu, disabled, visible }, onClick ) => {
  return (
    <StyledSVG
      id="openMenu"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      open={showMenu}
      onClick={onClick}
      disabled={disabled}
      visible={visible}
    >
    
      <g className="menu">
        <path d="
          M5,20
          L5,80
          H95
          L95,20
          z" opacity="0" />
        <path d="
          M15,10
          H85
          a 10 10 180 0 1 0 20
          H15
          a 10 10 180 0 1 0 -20
          z" />
        <path d="
          M15,40
          H85
          a 10 10 180 0 1 0 20
          H15
          a 10 10 180 0 1 0 -20
          z" />
        <path d="
          M15,70
          H85
          a 10 10 180 0 1 0 20
          H15
          a 10 10 180 0 1 0 -20
          z" />
      </g>
    </StyledSVG>
  )
}


const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;

  & li {
    border: 1px solid ${colors.restShade};
    border-radius: 1em;
    padding: 1em;
    margin-top: 0.5em;
  }

  & li:hover {
    background-color: ${colors.overBg};
    border-color: ${colors.overTint};
    border-bottom-color: ${colors.overShade};
    border-right-color: ${colors.overShade};
    border-radius: 1em;
    padding: 1em;
  }

  & li:active {
    background-color: ${colors.downBg};
    border-color: ${colors.downShade};
    border-bottom-color: ${colors.downTint};
    border-right-color: ${colors.downTint};
    border-radius: 1em;
    padding: 1em;
  }
`



export default class Menu extends Component {
  constructor(props) {
    super(props)  
    this.pane = React.createRef()
    this.state = {
      showMenu: false
    , visible: true
    , disabled: false
    }

    this.toggleMenu = this.toggleMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)

    setTimeout(this.toggleMenu, 0)
  }


  toggleMenu() {
    if (this.state.disabled) {
      return
    }

    const showMenu = !this.state.showMenu
    this.setState({ showMenu })

    if (showMenu) {
      const listener = this.closeMenu
      document.body.addEventListener("touchstart", listener, true)
      document.body.addEventListener("mousedown", listener, true)
    }
  }


  closeMenu(event) {
    // Check if the click was inside the slide-out menu. If not,
    // close the menu

    if (event.type === "touchstart") {
      // Prevent the mouseup from firing right behind
      this.timeout = setTimeout(() => this.timeout = 0, 300)
    } else if (this.timeout) {
      return
    }

    const pane = this.pane.current
    if (pane&& !pane.contains(event.target)) {
      this.setState({ showMenu: false })

      const listener = this.closeMenu
      document.body.removeEventListener("touchstart", listener, true)
      document.body.removeEventListener("mousedown", listener, true)
    }
  }


  render() {
    const content = <li>TODO: Menu items go here</li>

    const menuSVG = getSVG(this.state, this.toggleMenu)

    return (
      <StyledMenu
          state={this.state}
          ref={this.pane}
        >
        {menuSVG}
        <StyledList>
          {menuItems}
        </StyledList>
      </StyledMenu>
    );
  }
}
