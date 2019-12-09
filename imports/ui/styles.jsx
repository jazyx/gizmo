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

  @media (min-aspect-ratio: 1/1) {
    flex-direction: row;
  }
`


export const StyledFrame = styled.div`
  position: relative;

  width: 100vw;
  height: 50vh;
  ${props => props.backgroundImage 
           ? `
             background: ${props.backgroundImage}
             no-repeat center;
             background-size: cover;

              & button {
                position: absolute;
                bottom: 0;
                right: 0;
              }
             `
           : ""
   }

  @media (min-aspect-ratio: 1/1) {
    height: 100vh;
    width: 50vw;
    flex-direction: column;
  }
`


export const StyledPhrase = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: ${text.cueFontSize}vmin;
  text-align: center;
  height: 4em;

  @media (max-aspect-ratio: 1/1) {
    margin: 0
  }

  @media (max-aspect-ratio: 1/2) {
    margin: 1em 0;
  }
`


export const StyledMeaning = styled.p`
`


export const StyledAnswersList = styled.ol`


  @media (max-aspect-ratio: 1/1) {
    column-count: 2;
    column-gap: 3em;

    & li {
      padding: 0;
      height: 10vh;
    }

    & div {
      height: 10vh;
    }
  }

  @media (max-aspect-ratio: 1/2) {
    column-count: 1;

    & li, & div {
      height: auto;
    }
    & li {
      padding: 2vmin;
    }
  }
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

  &:first-child {
    margin-top: 0;
  }

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
  position: absolute;
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