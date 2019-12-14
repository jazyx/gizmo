// /home/blackslate/Repos/Gizmo/App/imports/ui/Views/Game.jsx

import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Phrases from '../../../../imports/api/phrases';
import { StyledPage
       , StyledFrame
       , StyledPhrase
       , StyledMeaning
       , StyledButtonSet
       , StyledButton
       } from '../../Styles/styles'

const Jazyx = Session.get("Jazyx")



class Recall extends Component {
  constructor(props) {
    super(props) // { phrases: [ {...}, ... ] } <<< starts empty
    this.imageFolder = Jazyx.image.folder
    this.state = {
      index: -1
    }

    this.setRandomIndex = this.setRandomIndex.bind(this)
  }


  componentDidMount() {
    this.setRandomIndex()
  }


  setRandomIndex() {
    const phraseCount = this.props.phrases.length

    if (phraseCount < 10) {
      return setTimeout(this.setRandomIndex, 10)
    }

    const index = Math.floor(Math.random() * phraseCount)

    this.setState({ index })
  }


  showPhrase(index) {
    const last = this.props.phrases.length - 1

    switch (index) {
      case "next":
        index = (this.state.index + 1) % last
      break
      case "prev":
        index = (this.state.index)
              ? this.state.index - 1
              : last
      break
      default:
        if (isNaN(index)) {
          index = this.state.index
        } else {
          index = Math.max(0, Math.min(index, last))
        }
      break
    }
    
    this.setState({ index })
  }


  render() {
    if (this.state.index < 0) {
      return ""
    }

    const phraseData = this.props.phrases[this.state.index] || {}

    return (
      <StyledPage>
        <StyledFrame
          backgroundImage={`url(${this.imageFolder + phraseData.src})`}
        />
        <StyledPhrase>
          {phraseData.phrase}
        </StyledPhrase>
        <StyledMeaning>
          ({phraseData.meaning})
        </StyledMeaning>
        <StyledButtonSet>
          <StyledButton
            onClick={() => this.showPhrase("prev")}
          >
            Back
          </StyledButton> <StyledButton
            onClick={() => this.showPhrase("next")}
          >
            Next
          </StyledButton>
        </StyledButtonSet>
      </StyledPage>
    );
  }
}


export default RecallContainer = withTracker(() => {
  Meteor.subscribe('phrases')

  return {
    phrases: Phrases.find().fetch(),
  };
})(Recall);