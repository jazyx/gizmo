import React, { Component } from 'react';
import styled, { css } from 'styled-components'

const Jazyx  = Session.get("Jazyx")
const colors = Jazyx.colors
const dimensions = Jazyx.dimensions
const text   = Jazyx.text



const StyledMenu = styled.div`
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: ${props => props.state.showMenu && props.state.visible
                 ? 0
                 : -dimensions.menuWidth}vmin;
  ${props => props.state.showMenu && props.state.visible
          ? "box-shadow: 0 0 3vmin 0 rgba(0,0,0,0.75);"
          : ""
  }
  height: 100vh;
  width: ${dimensions.menuWidth}vmin;
  padding: 2vmin;
  padding-top: ${dimensions.iconSize}vmin
  background-color: ${colors.menuBG};
  transition: left .${dimensions.menuWidth}s linear;
`


const StyledSVG = styled.svg`
  position: fixed;
  top: 0;
  left:    ${props => props.open
                    ? dimensions.iconOffset
                    : 0
            }vmin;
            }
  width:   ${dimensions.iconSize}vmin;
  height:  ${dimensions.iconSize}vmin;
  fill:    ${colors.icon};
  opacity: ${props => props.open
                    ? 1
                    : 0.25
            }
  transition: left .${dimensions.iconOffset}s linear
            , opacity .${dimensions.iconOffset}s;
  transition-property: left, opacity;
  transition-delay: ${props => props.open
                             ? `.${dimensions.iconSize}s, 0s;`
                             : `0s, .${dimensions.iconOffset}s;`
                     }
  ${props => props.disabled
          ? `pointer-events: none;cursor: default;`
          : `cursor: pointer;`
   }
  ${props => props.visible
          ? ""
          : "opacity:0;"
  }
  &:hover {
    opacity: ${props => props.open
                      ? 1
                      : 0.75
              };
  }
`


const getSVG = ({ disabled, visible, showMenu }, onClick ) => {
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
`


const StyledLI = styled.li`
  background-color: ${props => props.colors.restBg};
  border: 1px solid ${props => props.colors.restShade};
  border-radius: 1em;
  padding: 1em;
  margin-top: 0.5em;
  text-align: center;
  cursor: pointer;
  font-size: ${text.menuFontSize}vmin;

  &:hover {
    background-color: ${props => props.colors.overBg};
    border-color: ${props => props.colors.overTint};
    border-bottom-color: ${props => props.colors.overShade};
    border-right-color: ${props => props.colors.overShade};
  }

  &:active, &.selected {
    background-color: ${props => props.colors.downBg};
    border-color: ${props => props.colors.downShade};
    border-bottom-color: ${props => props.colors.downTint};
    border-right-color: ${props => props.colors.downTint};
  }

  &.selected {
    cursor: default;
  }
`


export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.pane = React.createRef()
    this.state = {
      visible: false
    , disabled: true
    , firstTime: true
    }

    this.toggleMenu = this.toggleMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }


  setEnabled(state) {
    if (state) {
      this.setState({ visible: true, disabled: false })
    }
  }


  toggleMenu(open) {
    if (this.state.disabled) {
      return
    }

    const showMenu = typeof open === "boolean"
                   ? open
                   : !this.state.showMenu
    this.setState({ showMenu })

    if (showMenu) {
      this.prepareToCloseWithAClickElsewhere()
    }
  }


  prepareToCloseWithAClickElsewhere() {
    const listener = this.closeMenu
    document.body.addEventListener("touchstart", listener, true)
    document.body.addEventListener("mousedown", listener, true)
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


  prepareMenuItems() {
    const action = (view) => {
      this.props.onClick(view)
      this.toggleMenu()
    }

    const items = this.props.menuItems.map( options => {
      const key = options.key
      const colors = options.theme
                   ? Jazyx[options.theme]
                   : Jazyx.colors
      const className = (this.props.selected === key)
                      ? "selected"
                      : ""
      const name = options.name || key

      return (
        <StyledLI
          key={key}
          onClick={() => action(key)}
          colors={colors}
          className={className}
        >
          {name}
        </StyledLI>
      )
    })

    return items
  }


  render() {
    if (this.props.enabled === this.state.disabled) {
      const delay = dimensions.iconOffset * 10 // px => ms
      setTimeout(() => this.setEnabled(this.props.enabled), 0)
      setTimeout(() => this.toggleMenu(this.props.enabled), delay)
    }

    const content = this.prepareMenuItems()
    const menuSVG = getSVG(this.state, this.toggleMenu)

    return (
      <StyledMenu
        state={this.state}
        ref={this.pane}
      >
        {menuSVG}
        <StyledList>
          {content}
        </StyledList>
      </StyledMenu>
    );
  }
}
