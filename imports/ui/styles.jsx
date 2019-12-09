import styled, { css } from 'styled-components'

const Jazyx  = Session.get("Jazyx")
const colors = Jazyx.colors
const splash = Jazyx.splash
const image  = Jazyx.image
const dimensions = Jazyx.dimensions
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
  position: relative;
  width: 96vmin;
  height: 54vmin;
  background: ${props => props.backgroundImage} no-repeat center;
  background-size: contain;

  & button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
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
  & div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  position: relative;
  font-size: ${text.responseFontSize}vmin;
  border-width: 1px;
  border-style: solid;
  border-radius: 10vmin;
  ${props => props.disabled
           ? `
             color: ${colors.disabled};
             border-color: ${colors.background};
             `
           : `
             border-color: ${colors.restShade};
             cursor: pointer;
             color: ${colors.text};
             `
  }
  padding: 2vmin;
  margin-top: 2vmin;

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
  }

  &:active, &.correct {
    ${props => props.disabled
             ? ""
             : `
               background-color: ${colors.downBg};
               border-color: ${colors.downShade};
               border-bottom-color: ${colors.downTint};
               border-right-color: ${colors.downTint};
               `
    }
    }

  & p {
    margin: 0 1em;
    text-align: center;
    width: calc(100% - 17vmin);
  }
`


export const StyledAudioButton = styled.button`
  width: ${props => props.size}vmin;
  height: ${props => props.size}vmin;
  background:url('${props => image[props.icon]}')
               no-repeat center;

  border-width: 1px;
  border-style: solid;
  border-radius: ${props => props.radius}vmin;
  border-color: ${colors.restShade};

  ${props => props.icon === "disabled"
           ? `opacity: ${Jazyx.disabledOpacity}; pointer-events:none;`
           : "cursor: pointer;"
   }
`


export const StyledButtonSet = styled.div`
  display: flex;
`


export const StyledButton = styled.button`
`



export const StyledNavigation = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;

  height: 10vmin;
  width: 100%;
  bottom: 0;

  & button {
    width: 10vmin;
    background-color: transparent;
    font-size: 8vmin;
  }
`


export const StyledReplayButton = styled.button`
  width: 100%;
  height: 12vmin;
  font-size: 8vmin;
`