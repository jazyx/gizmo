import styled, { css } from 'styled-components'
import { buttonColors
       , translucify
       } from '../../lib/utilities'


const menuConstants = Session.get("Jazyx").menu
const colors = buttonColors(menuConstants.background)
colors.background = translucify( menuConstants.background
                               , menuConstants.bgOpacity
                               )
const text = Session.get("Jazyx").text


const Jazyx = Session.get("Jazyx")



export const StyledSplash = styled.div`
  font-size: ${Jazyx.splash.titleFontSize}vmin;
`


export const StyledApp = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${Jazyx.background};
`


export const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`


export const StyledFrame = styled.div`
  width: 96vmin;
  height: 54vmin;
  background: ${props => props.backgroundImage} no-repeat center;
  background-size: contain;
`


export const StyledPhrase = styled.p`
`


export const StyledMeaning = styled.p`
`


export const StyledAnswers = styled.ol`
`
  

export const StyledAnswerLi = styled.li`
  border-width: 1px;
  border-style: solid;
  ${props => props.disabled
           ? `
             color: ${text.disabled};
             border-color: ${menuConstants.background};
             `
           : `
             border-color: ${colors.restShade};
             border-radius: 1em;
             cursor: pointer;
             color: ${text.color};
             `
  }
  padding: 1em;
  margin-top: 0.5em;
  text-align: center;

  &:hover {
    ${props => props.disabled
             ? ""
             : `
               background-color: ${colors.overBg};
               border-color: ${colors.overTint};
               border-bottom-color: ${colors.overShade};
               border-right-color: ${colors.overShade};
               `
  }

  &:active {
    ${props => props.disabled
             ? ""
             : `
               background-color: ${colors.downBg};
               border-color: ${colors.downShade};
               border-bottom-color: ${colors.downTint};
               border-right-color: ${colors.downTint};
               `
  }
`



export const StyledButtonSet = styled.div`
  display: flex;
`


export const StyledButton = styled.button`
`