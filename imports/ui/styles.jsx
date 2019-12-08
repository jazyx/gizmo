import styled, { css } from 'styled-components'

const Jazyx  = Session.get("Jazyx")
const colors = Jazyx.colors
const splash = Jazyx.splash
const menu   = Jazyx.menu
const text   = Jazyx.text



export const StyledSplash = styled.div`
  font-size: ${splash.titleFontSize}vmin;
`


export const StyledApp = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${colors.background};
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
  font-size: ${text.cueFontSize}vmin;
  text-align: center;
  height: 2.5em;
`


export const StyledMeaning = styled.p`
`


export const StyledAnswers = styled.ol`
`


export const StyledAnswerLi = styled.li`
  font-size: ${text.responseFontSize}vmin;
  border-width: 1px;
  border-style: solid;
  ${props => props.disabled
           ? `
             color: ${colors.disabled};
             border-color: ${colors.background};
             `
           : `
             border-color: ${colors.restShade};
             border-radius: 1em;
             cursor: pointer;
             color: ${colors.text};
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