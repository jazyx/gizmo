import styled, { css } from 'styled-components'

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


export const StyledButtonSet = styled.div`
  display: flex;
`


export const StyledButton = styled.button`
`