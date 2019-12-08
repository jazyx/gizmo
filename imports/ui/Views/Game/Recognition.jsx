// /home/blackslate/Repos/Gizmo/App/imports/ui/Views/Game.jsx

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Phrases from '../../../api/phrases';
import { StyledPage
       , StyledFrame
       , StyledPhrase
       , StyledAnswers
       , StyledAnswerLi
       } from '../../styles'


const noAudioDelay = Session.get("Jazyx").noAudioDelay


class Recognition extends Component {
  constructor(props) {
    super(props) // { phrases: [ {...}, ... ] } <<< starts empty
    this.imageFolder = 'img/'
    this.state = {
      index: -1
    , insert: -1
    , disabled: []
    }
    this.cloze = "…………………"
    this.placeholder = this.imageFolder + "question000.jpg"
    this.setRandomIndex = this.setRandomIndex.bind(this)
    this.showPhrase = this.showPhrase.bind(this)
  }


  componentDidMount() {
    this.setRandomIndex()
  }


  setRandomIndex() {
    const phraseCount = this.props.phrases.length

    if (phraseCount < 5) {
      return setTimeout(this.setRandomIndex, 10)
    }

    const index = Math.floor(Math.random() * phraseCount)

    this.showPhrase(index)
  }


  showPhrase(index) {
    const last = this.props.phrases.length - 1

    switch (index) {
      case undefined:
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
    
    const phraseData = this.props.phrases[index]
    const text = phraseData.cue.replace(/_+/, this.cloze)

    const distractors = phraseData.distractors
    const insert = Math.floor(Math.random() * distractors.length)
    const disabled = distractors.reduce((map, distractor) => {     
        map[distractor] = false
        return map
      }
    , {}
    )

    this.setState({ index, insert, disabled, text, correct: false })
  }


  checkAnswer(event, isCorrect, answerString) {
    if (isCorrect) {
      this.showCorrect()

    } else {
      const disabled = this.state.disabled
      disabled[answerString] = true
      this.setState({ disabled })
    }
  }


  showCorrect() {
    // Create correct answer...
    const phraseData = this.props.phrases[this.state.index]
    let text = phraseData.cue.replace(/_+/, phraseData.answer)
    // ... and ensure that sentences begin with a Capital
    const regex = /(?:^|[.!?]['"]?\s+["']?)([a-zа-ё])/g
    let match
      , index
    while (match = regex.exec(text)) {
      index = match.index - 1 + match[0].length
      text = text.substring(0, index)
           + match[1].toUpperCase()
           + text.substring(index + 1)
    }

    this.setState({ text, correct: true })
    this.playAudio()
  }


  playAudio() {
    setTimeout(this.showPhrase, noAudioDelay)
  }


  getAnswers(phraseData) {
    const answers = phraseData.distractors.map((answer, index) => {
      const disabled = this.state.disabled[answer]

      return (
        <StyledAnswerLi
          key={index}
          disabled={disabled}
          onClick={(event) => this.checkAnswer(event, false, answer)}
        >
          {answer}
        </StyledAnswerLi>
      )
    })

    const answer = (
      <StyledAnswerLi
       key={"right"}
       onClick={(event) => this.checkAnswer(event, true)}
      >
        {phraseData.answer}
      </StyledAnswerLi>
    )

    answers.splice(this.state.insert, 0, answer)

    return answers
  }


  render() {
    if (this.state.index < 0) {
      return ""
    }

    const phraseData = this.props.phrases[this.state.index] || {}
    const answers = this.getAnswers(phraseData)
    const image = this.state.correct
                ? this.imageFolder + phraseData.image
                : this.placeholder

    return (
      <StyledPage>
        <StyledFrame
          backgroundImage={`url(${image})`}
        />
        <StyledPhrase>
          {this.state.text}
        </StyledPhrase>
        <StyledAnswers>
          {answers}
        </StyledAnswers>
      </StyledPage>
    );
  }
}


export default RecognitionContainer = withTracker(() => {
  return {
    phrases: Phrases.find({ type: "recognition" }).fetch(),
  };
})(Recognition);